# Prism Mobile — Marketing Lead Site

Static marketing site for **PRISM MOBILE LLC** (prismmobileusa.com).

Fire season: Ogden, UT (Great Basin) VIPR positioning. Off-season: LA / Southern California private rentals.

## Preview locally

From this folder (`/workspace/prism-site/`):

```bash
# Option A — Python (no install)
python3 -m http.server 8080

# Option B — Node (if available)
npx --yes serve -l 8080 .
```

Then open **http://localhost:8080/** in a browser.

You can also open `index.html` directly as a file; images and CSS will load.  
Mailto form behavior is more reliable via a local server or after Formspree is wired.

## Site structure

```
prism-site/
├── index.html          # Single-page marketing site
├── css/styles.css
├── js/main.js
├── assets/
│   ├── exterior-dusk.jpg      # Hero
│   └── interior-sinks.jpeg    # Services feature
├── photos/             # Original source photos
└── README.md
```

### Sections

1. **Hero** — exterior trailer photo + VIPR-ready / dual-geography CTA  
2. **Services** — handwash capabilities (interior sinks photo)  
3. **Who we serve** — fire/VIPR · catering partnerships · SoCal construction/film/events  
4. **Why Prism** — positioning & at-a-glance panel  
5. **Service area** — Fire season: Ogden UT; Off-season: LA / SoCal private rentals  
6. **Quote / contact form** — mailto both Prism emails  
7. **Footer** — LLC, La Habra address, emails  

## Geography

| Role | Location |
|------|----------|
| **Fire-season staging** | Ogden, Utah (Great Basin) — at least one handwash trailer |
| **VIPR host geography** | Northern Utah / Great Basin (UT-NUC area) — positioning only; no DPL claim |
| **LLC principal / mailing** | 300 East La Habra Blvd, La Habra, CA 90631 |
| **Private / off-season** | LA / Southern California rentals (construction, film, events) |

## Contact form

**Default (works offline):** form uses `mailto:` to both:

- mitch@prismmobileusa.com  
- benjamin@prismmobileusa.com  

Need types include: VIPR / federal contracting, catering partnership / subcontract, fire/emergency, construction, film/events, other.

JS builds a readable message body from the fields (name, company, phone, email, need type, dates, location, message).

### Optional: Formspree

1. Create a form at [https://formspree.io](https://formspree.io) and add both Prism emails as recipients.  
2. In `index.html`, find the `#quote-form` element and change:

```html
<form
  class="quote-form"
  id="quote-form"
  method="POST"
  action="https://formspree.io/f/YOUR_FORM_ID"
>
```

3. Remove `enctype="text/plain"` (not needed for Formspree).  
4. Keep the hidden `_subject` field (Formspree respects it).  

No other JS changes are required — `main.js` detects Formspree and lets the browser POST normally.

## Pointing prismmobileusa.com here later

This is a plain static site (HTML/CSS/JS + images). Deploy the contents of this folder (or at least `index.html`, `css/`, `js/`, `assets/`) to any static host:

| Host | Notes |
|------|--------|
| **Netlify / Vercel / Cloudflare Pages** | Drag-and-drop or connect a Git repo; set publish directory to this folder root. |
| **AWS S3 + CloudFront** | Upload files; enable static website hosting; attach the domain. |
| **Any Apache/Nginx VPS** | Copy files into the web root for the domain. |

Then in DNS for **prismmobileusa.com**:

1. Add an **A** / **AAAA** or **CNAME** record per your host’s instructions.  
2. Enable HTTPS (most hosts do this automatically via Let’s Encrypt).  
3. Optionally redirect `www` → apex (or vice versa).

No build step is required unless you later wrap this in Vite or another bundler.

## Brand / compliance notes

- Soft VIPR language only: preparing / positioning for Forest Service VIPR I-BPA trailer-mounted handwashing (Type 1, 12+ sinks).  
- Do **not** claim VIPR approved, awards, UEI/CAGE invention, DPL rank, or rates.  
- Catering partnership / subcontract inquiries are welcome.  
- No invented rates or fleet counts.

## Business details

- **Entity:** PRISM MOBILE LLC  
- **Address (principal / mailing):** 300 East La Habra Blvd, La Habra, CA 90631  
- **Fire staging:** Ogden, UT (Great Basin)  
- **Domain:** prismmobileusa.com  
- **Emails:** mitch@prismmobileusa.com · benjamin@prismmobileusa.com  
