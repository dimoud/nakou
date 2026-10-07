#!/usr/bin/env python3
"""Μετά το prerender.py: βγάζει ό,τι ανήκει στο (μελλοντικό) πακέτο SEO —
JSON-LD, sitemap.xml, robots.txt. Χρήση: python3 _xoris_seo.py   (μέσα στον φάκελο)"""
import re, pathlib
here = pathlib.Path(__file__).resolve().parent
for p in [here / 'index.html', here / 'en' / 'index.html']:
    if p.exists():
        h = p.read_text(encoding='utf-8')
        h = re.sub(r'\s*<script type="application/ld\+json">.*?</script>', '', h, flags=re.S)
        p.write_text(h, encoding='utf-8')
for f in ('sitemap.xml', 'robots.txt'):
    (here / f).unlink(missing_ok=True)
print('Χωρίς JSON-LD / sitemap / robots.')
