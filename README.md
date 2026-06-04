# Nomoclub Music — website

Statische, tweetalige site voor **nomoclub.com**. Engels is de hoofdtaal (standaard), Nederlands via de EN/NL-knop. Geen build-stap, geen framework — gewoon HTML/CSS/JS. Klaar voor gratis hosting op Cloudflare Pages.

## Bestanden
- `index.html` — landingspagina (hero met creative, voor wie, hoe het werkt, prijzen, reviews, FAQ, contact) + volledige SEO-metadata
- `privacy.html` — privacyverklaring (sjabloon)
- `terms.html` — algemene voorwaarden (sjabloon)
- `styles.css` — alle styling (sunset-merkkleuren)
- `lang.js` — EN/NL-taalwissel + valuta-schakelaar (onthoudt keuze in de browser)
- `hero-en.jpg` / `hero-nl.jpg` — hero-afbeeldingen per taal
- `og.jpg` — social-share-afbeelding (1200×630)
- `logo.png` — Nomoclub-logo (rond, transparant) — ook gebruikt als favicon

## Secties
Hero (met logo + creative) · Voor wie · Hoe het werkt (4 stappen) · **Voorbeelden** (knoppen naar Spotify + Instagram) · Prijzen (valuta-schakelaar) · Reviews · FAQ · Contact (Messenger/Facebook/Instagram) · Footer (logo + social-iconen Spotify/Instagram/Facebook/Messenger + juridische links).

## Links
Spotify: `open.spotify.com/artist/33cTnnfGS34lJlcMzE3M1s` · Facebook: `facebook.com/nomoclubmusic` · Instagram: `instagram.com/nomoclubmusic` · Messenger: `m.me/nomoclubmusic`. WhatsApp-knop kan erbij zodra Meta je account goedkeurt.

## SEO
- Engels als `lang` en standaardtaal; `<title>`, meta description, keywords, canonical, robots.
- Open Graph + Twitter Card met `og.jpg` (1200×630).
- JSON-LD structured data: Organization, WebSite en Product met de twee prijsopties.
- Afbeeldingen geoptimaliseerd (±200 KB) met `width`/`height` en `alt` voor snelle, indexeerbare pagina's.

> Let op: de OG/canonical-URL's wijzen naar `https://nomoclub.com/`. Zodra je domein live staat kloppen ze; daarvoor werken ze nog niet voor social previews.

## Prijzen per land
In de Engelse weergave staat een valuta-schakelaar (€ EUR / £ GBP / $ USD). Standaard GBP. Nederlands toont altijd euro's. Tarieven: Privé €69 / £59 / $79 · Compleet €89 / £79 / $99 · spoed +€50 / +£45 / +$55. Aanpassen via de `data-eur` / `data-gbp` / `data-usd` attributen in `index.html`.

## Lokaal bekijken
Dubbelklik `index.html`, of draai een mini-server:
```
cd nomoclub-site
python3 -m http.server 8000
```
Open dan http://localhost:8000

## Online via Cloudflare Pages (gratis)
1. **GitHub** — staat al in `github.com/robbertbrantz-blip/nomoclub-music` (alle bestanden in de root).
2. **Cloudflare Pages** — dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git → repo `nomoclub-music`. Build-instellingen: Framework preset = **None**, Build command = leeg, Output directory = `/`. Save and Deploy.
3. **Domein** — in het Pages-project → Custom domains → `nomoclub.com` (en eventueel `www`). Cloudflare regelt SSL automatisch. Staat het domein nog niet bij Cloudflare, voeg het eerst toe en wijs de nameservers daarheen.

## Aanpassen
- **Teksten/prijzen:** `index.html`.
- **Contactknoppen:** Messenger `https://m.me/nomoclubmusic` en Instagram `https://www.instagram.com/nomoclubmusic`.
- **WhatsApp-knop** (zodra Meta je account goedkeurt): voeg in de `#contact`-sectie toe: `<a class="btn" href="https://wa.me/31638298731">WhatsApp</a>`.
- **Kleuren:** bovenin `styles.css` onder `:root`.

## Let op
De juridische pagina's zijn **sjablonen ter informatie, geen juridisch advies**. Laat ze controleren en pas ze aan voordat je live gaat.
