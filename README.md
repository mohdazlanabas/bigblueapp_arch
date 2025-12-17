# Big Blue SuperApp Architecture Deck

Single-page technical and commercial proposal site for the Big Blue SuperApp initiative. The page presents system architecture, delivery roadmap, and commercial highlights with interactive navigation, animated sections, and Chart.js visualizations.

## What’s here
- `index.html` – Main proposal content and section layout.
- `styles.css` – Visual design, layout, and animation styles.
- `main.js` – Navigation toggle, smooth scrolling, accordion handling, timestamps, and Chart.js setup/data.
- `overlap.jpeg` – Background/illustrative asset used by the layout.

## Run locally
1) From this folder, open `index.html` in your browser; or  
2) Serve it locally (helps avoid CORS issues with some browsers) with `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Tech stack
- Static HTML + CSS + vanilla JS, no build step required.
- External assets: Google Fonts (Playfair Display, Montserrat, Source Sans Pro, Fira Code) and Chart.js from CDN.

## Editing guide
- Update content/sections directly in `index.html`.
- Adjust colors, spacing, or animations in `styles.css`.
- Modify chart labels/data or behavior inside `main.js` (look for the `init*Chart` helpers).
- Replace `overlap.jpeg` if you need different imagery; keep the filename or update its references in CSS.

## Notes
- The page is marked confidential; keep distribution controlled if that’s required for your use case.
- No deployment pipeline is provided; host the static assets on any web server or CDN as needed.
