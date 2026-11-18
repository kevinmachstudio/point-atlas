# Point Atlas

A U.S. travel rewards cheatsheet with award program guides, card comparisons, destination examples, a cents-per-point calculator, a booking calendar, and browser-local saved comparisons.

Serve locally with `python3 -m http.server 8000 --directory dist` and visit `http://localhost:8000`. No build or dependencies are required.

- `dist/data.js` holds the guide copy, sample award inputs, and sources.
- GitHub Pages publishes `dist/` from `main` using GitHub Actions.
- Netlify publishes `dist/` per `netlify.toml`. For a CLI deploy to the linked project, use `netlify deploy --prod --no-build --dir=dist`.

Figures labeled as examples are illustrative and do not represent live inventory. Base comparisons on a cash price you would actually pay, including equivalent baggage, room type, and fees. Saved comparisons are held in local storage on the current hostname.
