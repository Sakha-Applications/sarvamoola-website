# Sarvamoola Foundation

Monorepo with two independent projects that share the same content and look.

```
sarvamoola-foundation/
  web/      Static website (HTML, CSS, JS). Hosted on Azure Static Web Apps at sarvamoola.in
  mobile/   Mobile app (Expo / React Native) for iOS and Android
```

## Web
```bash
npm run web            # serves ./web at http://localhost:3000
```
Deploy: Azure Static Web Apps with app location `/web`, no build step. See `web/README.md`.

## Mobile
```bash
npm run mobile:install # once
npm run mobile         # starts Expo; scan the QR code with Expo Go, or press a / i
```
See `mobile/README.md`.

## Keeping both in sync
Copy (mission line, "What we do", initiative intros, links) is written twice:
- web: `web/index.html` (search for `TODO`)
- mobile: `mobile/src/content.js`

Update both when the text changes.
