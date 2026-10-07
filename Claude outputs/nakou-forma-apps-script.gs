/**
 * Φόρμα επικοινωνίας expertease.eu/nakou — Google Apps Script (Εφαρμογή ιστού)
 *
 * Τι κάνει:
 *   - στέλνει το μήνυμα στο γραφείο (gnakou.law@gmail.com), με λογότυπο
 *   - στέλνει αντίγραφο-επιβεβαίωση στον πελάτη που συμπλήρωσε τη φόρμα (στη γλώσσα της σελίδας)
 *
 * Εγκατάσταση (ή ενημέρωση του υπάρχοντος έργου):
 *   1. script.google.com → Νέο έργο «expertease-forma» (ή άνοιξε το υπάρχον) → σβήσε ό,τι έχει και επικόλλησε αυτό.
 *   2. Αποθήκευση. Επίλεξε τη συνάρτηση «dokimi» → Εκτέλεση → δώσε τις άδειες
 *      (αποστολή email ΚΑΙ «σύνδεση σε εξωτερική υπηρεσία», για το λογότυπο).
 *      Πρέπει να έρθει δοκιμαστικό email με λογότυπο στο gnakou.law@gmail.com.
 *   3. ΝΕΟ ΕΡΓΟ: Ανάπτυξη → Νέα ανάπτυξη → «Εφαρμογή ιστού», Εκτέλεση ως: Εγώ, Πρόσβαση: Οποιοσδήποτε.
 *      ΥΠΑΡΧΟΝ ΕΡΓΟ: Ανάπτυξη → Διαχείριση αναπτύξεων → μολύβι → Έκδοση: «Νέα έκδοση» → Ανάπτυξη
 *      (έτσι μένει η ίδια διεύθυνση /exec).
 */

var EXPECTED_KEY  = 'k_cXWASfZ8hcqzNoN4pJyfGMGE';
var ALLOWED_TO    = ['gnakou.law@gmail.com'];
var PARALIPTIS    = 'gnakou.law@gmail.com';                      // για τη δοκιμή
var LOGO_URL      = 'https://expertease.eu/nakou/email-logo.png';
var MAX_FIELD_LEN = 5000;

var BIZ = {
  name:  { el: 'Γεωργία Νάκου', en: 'Georgia Nakou' },
  tagline: { el: 'Δικηγόρος', en: 'Attorney at Law' },   // κενό = χωρίς υπότιτλο
  showName: true,                                    // true = επωνυμία κάτω από το λογότυπο
  phone: '+30 697 473 1607',
  email: 'gnakou.law@gmail.com',
  site:  'https://expertease.eu/nakou'
};

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    if (p._hp)                          return json({ result: 'success' });   // ρομπότ: σιωπηλή αποδοχή
    if (p._key !== EXPECTED_KEY)        return json({ error: 'bad key' });
    if (ALLOWED_TO.indexOf(p._to) < 0)  return json({ error: 'bad recipient' });

    var d = {
      name: clip(p.name), email: clip(p.email), phone: clip(p.phone),
      subject: clip(p.subject), message: clip(p.message),
      lang: String(p._lang || 'el').slice(0, 2) === 'en' ? 'en' : 'el'
    };
    if (!d.name || !d.email)                               return json({ error: 'missing fields' });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email))     return json({ error: 'bad email' });

    var logo = logoBlob_();
    var inline = logo ? { logo: logo } : {};

    // 1. Προς το γραφείο
    MailApp.sendEmail({
      to:       p._to,
      replyTo:  d.email,
      name:     'Φόρμα ' + 'expertease.eu/nakou',
      subject:  'Μήνυμα από expertease.eu/nakou — ' + d.name,
      htmlBody: officeHtml_(d, !!logo),
      body:     officeText_(d),
      inlineImages: inline
    });

    // 2. Αντίγραφο στον πελάτη (όριο: ένα ανά 10 λεπτά για την ίδια διεύθυνση)
    var cache = CacheService.getScriptCache(), ck = 'copy_' + d.email.toLowerCase();
    if (!cache.get(ck)) {
      cache.put(ck, '1', 600);
      var en = d.lang === 'en';
      MailApp.sendEmail({
        to:       d.email,
        replyTo:  BIZ.email,
        name:     BIZ.name[d.lang],
        subject:  en ? 'We received your message — ' + BIZ.name.en : 'Λάβαμε το μήνυμά σας — ' + BIZ.name.el,
        htmlBody: clientHtml_(d, !!logo),
        body:     clientText_(d),
        inlineImages: inline
      });
    }

    return json({ result: 'success' });
  } catch (err) {
    return json({ error: String(err) });
  }
}

function doGet() { return json({ result: 'ok' }); }

function dokimi() {
  var d = { name: 'Δοκιμή', email: PARALIPTIS, phone: '', subject: 'Δοκιμή', message: 'Δοκιμαστικό μήνυμα της φόρμας.', lang: 'el' };
  var logo = logoBlob_();
  MailApp.sendEmail({ to: PARALIPTIS, subject: 'Δοκιμή φόρμας expertease.eu/nakou', htmlBody: officeHtml_(d, !!logo),
                      body: officeText_(d), inlineImages: logo ? { logo: logo } : {} });
}

// ── πρότυπα ──────────────────────────────────────────────────────────────
function frame_(inner, hasLogo, lang) {
  var title = '<div style="font:700 18px Arial,sans-serif;letter-spacing:1px;color:#0f1929;text-align:center;margin-top:10px">' + esc_(upper_(BIZ.name[lang])) + '</div>' +
              (BIZ.tagline[lang] ? '<div style="font:12px Arial,sans-serif;color:#9A7330;text-align:center;margin-top:2px">' + esc_(BIZ.tagline[lang]) + '</div>' : '');
  var head = hasLogo
    ? '<img src="cid:logo" alt="' + esc_(BIZ.name[lang]) + '" width="80" style="display:block;width:80px;max-width:100%;height:auto;margin:0 auto">' + (BIZ.showName ? title : '')
    : title;
  return '<div style="background:#f4f6f9;padding:24px 12px">' +
    '<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#1c2a3a">' +
    '<div style="padding:24px 24px 12px">' + head + '</div>' +
    '<div style="padding:8px 24px 24px;font-size:15px;line-height:1.6">' + inner + '</div>' +
    '<div style="padding:14px 24px;background:#14100B;color:#c9d3df;font-size:12px;line-height:1.6;text-align:center">' +
      esc_(BIZ.name[lang]) + '<br>' + esc_(BIZ.phone) + ' · <a href="mailto:' + BIZ.email + '" style="color:#c9d3df">' + BIZ.email + '</a> · ' +
      '<a href="' + BIZ.site + '" style="color:#c9d3df">' + BIZ.site.replace('https://', '') + '</a>' +
    '</div></div></div>';
}

function rows_(d, en) {
  var L = en ? ['Name', 'Email', 'Phone', 'Subject'] : ['Όνομα', 'Email', 'Τηλέφωνο', 'Αντικείμενο'];
  var v = [d.name, d.email, d.phone || '—', d.subject || '—'];
  var h = '<table style="width:100%;border-collapse:collapse;font-size:14px;margin:12px 0">';
  for (var i = 0; i < L.length; i++) {
    h += '<tr><td style="padding:6px 8px;color:#6b7d92;width:110px;border-bottom:1px solid #eef1f5">' + L[i] + '</td>' +
         '<td style="padding:6px 8px;border-bottom:1px solid #eef1f5">' + esc_(v[i]) + '</td></tr>';
  }
  return h + '</table>' +
    '<div style="padding:12px 14px;background:#f4f6f9;border-left:3px solid #9A7330;white-space:pre-wrap">' + esc_(d.message || '—') + '</div>';
}

function officeHtml_(d, hasLogo) {
  var when = new Date().toLocaleString('el-GR', { timeZone: 'Europe/Athens' });
  return frame_('<p style="margin:0 0 4px"><strong>Νέο μήνυμα από τη φόρμα του ιστότοπου</strong></p>' +
                '<p style="margin:0;color:#6b7d92;font-size:13px">' + when + ' · γλώσσα σελίδας: ' + d.lang.toUpperCase() + '</p>' +
                rows_(d, false) +
                '<p style="font-size:13px;color:#6b7d92;margin:14px 0 0">Πατήστε «Απάντηση» για να απαντήσετε απευθείας στον πελάτη.</p>', hasLogo, 'el');
}

function clientHtml_(d, hasLogo) {
  var en = d.lang === 'en';
  var intro = en
    ? '<p>Dear ' + esc_(d.name) + ',</p><p>Thank you for contacting us. We have received your message and will reply as soon as possible. A copy of what you sent is below.</p>'
    : '<p>Αγαπητέ/ή ' + esc_(d.name) + ',</p><p>Σας ευχαριστούμε που επικοινωνήσατε μαζί μας. Λάβαμε το μήνυμά σας και θα σας απαντήσουμε το συντομότερο. Παρακάτω είναι αντίγραφο όσων μας στείλατε.</p>';
  var outro = en
    ? '<p style="font-size:13px;color:#6b7d92;margin:14px 0 0">If something is urgent, call us on ' + esc_(BIZ.phone) + '.</p>'
    : '<p style="font-size:13px;color:#6b7d92;margin:14px 0 0">Αν είναι επείγον, καλέστε μας στο ' + esc_(BIZ.phone) + '.</p>';
  return frame_(intro + rows_(d, en) + outro, hasLogo, d.lang);
}

function officeText_(d) {
  return ['Όνομα: ' + d.name, 'Email: ' + d.email, 'Τηλέφωνο: ' + d.phone, 'Αντικείμενο: ' + d.subject, '', d.message].join('\n');
}

function clientText_(d) {
  var en = d.lang === 'en';
  return (en ? 'Thank you for contacting us. We received your message:\n\n' : 'Σας ευχαριστούμε. Λάβαμε το μήνυμά σας:\n\n') +
         d.message + '\n\n' + BIZ.name[d.lang] + ' · ' + BIZ.phone + ' · ' + BIZ.site;
}

// ── βοηθητικά ────────────────────────────────────────────────────────────
function logoBlob_() {
  try {
    var cache = CacheService.getScriptCache(), b64 = cache.get('logo_b64');
    if (b64) return Utilities.newBlob(Utilities.base64Decode(b64), 'image/png', 'logo.png');
    var blob = UrlFetchApp.fetch(LOGO_URL, { muteHttpExceptions: true });
    if (blob.getResponseCode() !== 200) return null;
    blob = blob.getBlob().setName('logo.png');
    cache.put('logo_b64', Utilities.base64Encode(blob.getBytes()), 21600);
    return blob;
  } catch (e) { return null; }
}

function upper_(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

function clip(v) { return String(v || '').trim().slice(0, MAX_FIELD_LEN); }

function esc_(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
