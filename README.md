# Northform — Commerce Design System Template

Reusable Next.js + React + Motion storefront with owner-only local CRM, SQLite and optional Stripe Checkout.

## Requirements
Node.js 20.9+ (prefer Node 22 LTS), npm, local writable disk. The project has not been installed or integration-tested in this archive environment.

## Quick start
```bash
npm install
cp .env.example .env.local
npm run setup:owner
```
Paste generated `OWNER_PASSWORD_HASH` into `.env.local`. Generate `SESSION_SECRET` with `openssl rand -hex 32` and set `OWNER_EMAIL`. Then:
```bash
npm run dev
```
Visit `http://localhost:3000`, owner login at `/owner/login`. The SQLite database is created automatically under `./data/`.

### Stripe test checkout (optional)
Set `STRIPE_SECRET_KEY` to your **test** secret key and `NEXT_PUBLIC_BASE_URL=http://localhost:3000`. Start Stripe CLI forwarding to `localhost:3000/api/webhooks/stripe` and set the displayed `STRIPE_WEBHOOK_SECRET`. Use Stripe test cards only. Checkout returns a configuration message if keys are absent.

### Project structure
- `src/domain` business model
- `src/adapters` persistence
- `src/app` web routes, store, owner console, webhook
- `src/components` reusable UI and client cart
- `docs/DESIGN_SYSTEM.md` shared frontend standards
- `docs/ARCHITECTURE_SECURITY.md` security/deployment contract

## What is and is not provided
Included: landing page, about, products, localStorage cart, optional hosted Stripe Checkout, owner-only login, ticket creation/list, paid-order read-only list, Motion hover effects, responsive visual language.
Not included: inventory management, shipping, taxes, refunds, ticket editing, emails, MFA, multi-user permissions, real customer CRM sync, production security certification. All catalog content is illustrative.

## Adapting for a new project
1. Replace name, copy, tokens and product catalog.
2. Define domain ports and application use cases for your project.
3. Implement your persistence/payment adapters; keep the core provider-independent.
4. Apply design review and security gates from `docs/`.
5. Complete production hardening before accepting real payments/customer information.

## Important
The design uses text/shape placeholders rather than third-party product photos, so it works offline after dependency installation. The optional Google Fonts request requires internet.
