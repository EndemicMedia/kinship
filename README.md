# kinship
Parent Collective Platform

## Local development

```sh
npm ci
npm run dev
```

Open `http://localhost:3000/kinship/`. Use **Continue as Demo User**, or
sign in with a seeded persona's email and the password `password`.
The showcase runs entirely in the browser; it does not need a backend.

## Validation

```sh
npx playwright install chromium webkit
npm run typecheck
npm run test:unit
npm run test:i18n
node scripts/validate-images.mjs
npm run test:e2e
npm run generate
npm run test:e2e:static
```

The static E2E runner serves the exported site under `/kinship/`, including
the GitHub Pages 404 shell used by client-only deep links. Both runners own
port 3000; stop a development server before running them.
Only the three localized landing pages are prerendered; account routes
load the browser-only app through the exported fallback shell.
External avatar images are replaced with a checked-in image in tests so
network availability does not affect behavior assertions.

PR validation gates deployment on type checking, unit tests, required image
validation, static generation, and browser tests. Failed browser runs retain
traces, screenshots, and an HTML report.

See [Button Audit](./BUTTON_AUDIT.md) for interaction contracts and
[Image Style Reference](./docs/IMAGE_STYLE_REFERENCE.md) for asset generation.
