# Nomoclub Music — website

Statische, tweetalige (NL/EN) site voor **nomoclub.com**. Geen build-stap, geen framework — gewoon HTML/CSS/JS. Klaar voor gratis hosting op Cloudflare Pages.

## Bestanden
- `index.html` — landingspagina (hero, voor wie, hoe het werkt, prijzen, reviews, FAQ, contact)
- `privacy.html` — privacyverklaring (sjabloon)
- `terms.html` — algemene voorwaarden (sjabloon)
- `styles.css` — alle styling (sunset-merkkleuren)
- `lang.js` — NL/EN-taalwissel (onthoudt keuze in de browser)

## Lokaal bekijken
Dubbelklik `index.html`, of draai een mini-server:
```
cd nomoclub-site
python3 -m http.server 8000
```
Open dan http://localhost:8000

## Online zetten via GitHub + Cloudflare Pages (gratis)

**1. Naar GitHub**
- Hernoem je repo van `nomoclub-legal` naar `nomoclub` (GitHub → repo → Settings → Repository name).
- Zet de inhoud van deze map (`index.html`, `privacy.html`, `terms.html`, `styles.css`, `lang.js`) in de root van de repo en push.

**2. Cloudflare Pages koppelen**
- Ga naar dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
- Kies de repo `nomoclub`.
- Build-instellingen: **Framework preset = None**, **Build command = leeg laten**, **Output directory = `/`** (root). Klik **Save and Deploy**.
- Na ~1 minuut staat de site op een `*.pages.dev`-adres.

**3. Domein nomoclub.com koppelen**
- In het Pages-project → **Custom domains** → **Set up a custom domain** → typ `nomoclub.com`.
- Cloudflare regelt SSL automatisch. Voeg ook `www.nomoclub.com` toe als je wilt (redirect naar de hoofddomein).
- Staat je domein nog niet bij Cloudflare? Voeg `nomoclub.com` eerst toe als site in Cloudflare en wijs de nameservers bij je domeinregistrar naar de twee Cloudflare-nameservers.

## Aanpassen
- **Prijzen / teksten:** sta in `index.html` (zoek op `€69` / `€89`).
- **Contactknoppen:** Messenger `https://m.me/nomoclubmusic` en Instagram `https://www.instagram.com/nomoclubmusic` (in `index.html`).
- **WhatsApp-knop toevoegen** zodra Meta je account heeft goedgekeurd: voeg in de `#contact`-sectie een extra knop toe, bijv.
  `<a class="btn" href="https://wa.me/31638298731">WhatsApp</a>`.
- **Kleuren:** bovenin `styles.css` onder `:root`.

## Let op
De juridische pagina's zijn **sjablonen ter informatie, geen juridisch advies**. Laat ze controleren en pas ze aan op je eigen situatie voordat je live gaat.
