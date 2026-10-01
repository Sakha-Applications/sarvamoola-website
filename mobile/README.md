# Sarvamoola mobile app (Expo / React Native)

One-screen app for iOS and Android that mirrors the website: foundation intro, the two initiatives, and a contact form that opens the email app addressed to info@sarvamoola.in.

## Run it
```bash
cd mobile
npm install
npx expo install --fix     # aligns package versions with the installed Expo SDK
npx expo start
```
Then scan the QR code with the Expo Go app on your phone, or press `a` (Android emulator) / `i` (iOS simulator).

## Edit content
- Text and links: `src/content.js` (search for `TODO`)
- Colours and fonts: `src/theme.js`
- Layout: `App.js`

The two "Visit" buttons show a "not added yet" message until you set the `url` for each initiative in `src/content.js`.

## Before publishing to the stores
- Add `icon`, `splash` and (Android) `adaptiveIcon` images in `app.json`.
- Check the app identifiers in `app.json` (`in.sarvamoola.foundation`) and change them if you want something different. They can't be changed after the first store release.
- Build with EAS: `npm install -g eas-cli`, then `eas build --platform all`.

## Notes
- Package versions in `package.json` target Expo SDK 56. If `npm install` complains about a version, run `npx expo install --fix`.
- The email form needs an email app on the device. On simulators without one, the app shows a message with the address instead.
