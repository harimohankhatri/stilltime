# Stilltime

A small, responsive calendar and clock frontend. Events, notes, custom event types, and preferences persist in the current browser using local storage.

## Run locally

```sh
npm install
npm run dev
```

Create a production bundle with `npm run build`.

## Calendar conversion

AD↔BS conversion lives in `src/date.js` and uses `@sbmdkl/nepali-date-converter` 2.0.5. The package documents support for AD 1921–2040 and BS 1978–2099; dates outside this range are not converted.

## Production integrations

This repository contains a client-side app only. Google OAuth and account-backed cloud storage need an OAuth client, an authentication service, and a database/API; no credentials or backend were supplied. User data currently stays in the browser that created it. The Settings page can export that data as JSON.
