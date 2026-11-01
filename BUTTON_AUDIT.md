# Showcase interaction contracts

Kinship is a frontend-only feature showcase. An operation should update
visible local state rather than merely close a form. No action sends real
messages, executes legal agreements, or changes an external account.

## Landing

- Section links scroll to existing sections.
- Company, pricing, social, and policy controls open the relevant information.
- App entry controls navigate to login under the configured deployment base.
- The logo returns to the active locale's home page.
- The mobile menu supports keyboard opening, Escape dismissal, and navigation.
- The language selector updates content and locale metadata.

## Account and discovery

- Login selects a seeded persona; logout clears the active session.
- Profile edits belong to the current persona and survive navigation.
- Persona switching refreshes the editor rather than retaining another user's draft.
- Compass filters change results; votes update counts and progress; reset restores results.
- Messages and connection requests have visible local outcomes.
- Saved settings remain selected when revisiting the page.
- Account actions expose simulated, cancellable workflows.
- Search, notifications, theme, and navigation remain reachable on mobile.
- App links, search commands, account menus, and logout retain the active language.
- Sidebar collapse, expansion, and logout remain keyboard-accessible in either state.

## Crews and documents

- Crew creation adds a navigable crew with the creator as a member.
- Crew discovery supports a visible join/request outcome.
- Chat appends text and attachment previews; each submission appears once.
- Incidents, response status, values, and check-ins update the selected crew.
- Document creation preserves the crew and selected template.
- Draft editing, reopening, signing, and downloading operate on local documents.
- Activity links open a valid activity view or their referenced destination.

## Testing

Behavioral checks live in `tests/e2e/`. Run `npm run test:e2e` for the
development server, and `npm run generate && npm run test:e2e:static` for
the exported Pages-like site. Tests must assert outcomes, not just button
visibility or success notifications. Narrow mobile, tablet, desktop, keyboard,
locale, and WebKit checks cover the relevant interaction surfaces.
