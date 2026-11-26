# Point Atlas

A U.S. travel rewards cheatsheet with award program guides, card comparisons, route-level award examples, a cents-per-point calculator, a booking calendar, and browser-local saved comparisons.

Build with `node scripts/build.mjs`, then serve `out/` with `python3 -m http.server 8000 --directory out` and visit `http://localhost:8000`. The build uses Node's standard library.

- `dist/data.js` holds the guide copy, sample award inputs, and sources.
- The build versions the offline cache from the service worker and the contents of `dist/`. It emits the public site in `out/`.
- GitHub Pages builds and publishes `out/` from `main`.
- Netlify builds and publishes `out/` per `netlify.toml`. Use `netlify deploy --prod` for a CLI deploy to the linked project.

To use the app offline, open it while connected so the service worker can save the guide, images, calculators, and booking calendar. After installing on a phone, open the Home Screen app while connected once. External booking and reference sites require a connection.

Figures labeled as examples are illustrative and do not represent live inventory. Base comparisons on a cash price you would actually pay, including equivalent baggage, room type, and fees. Saved comparisons are held in local storage on the current hostname.
