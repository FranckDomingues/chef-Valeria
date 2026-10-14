# Architecture and security — deployment contract

## Hexagonal boundaries
- `src/domain`: framework-independent catalog, pricing, business types.
- `src/adapters`: local SQLite persistence (replaceable with PostgreSQL adapter).
- `src/lib`: authentication, request validation and local development rate limit.
- `src/app`: HTTP delivery adapters, pages and routes.
- `src/components`: React presentation.

**Next iteration**: formal repository interfaces/ports, service use cases, dependency injection, adapter contract tests. This starter separates concerns but is NOT a fully implemented enterprise hexagonal core.

## Security controls implemented
- Single-owner login, no self-registration; Argon2id password hash.
- Signed 8-hour JWT session cookie (HttpOnly, SameSite=Strict, Secure on production).
- Server-side authorization for owner pages and ticket mutation endpoint.
- Origin verification on state-changing endpoints; strict input validation with Zod.
- Stripe-hosted checkout; catalog prices calculated server-side; signed Stripe webhooks.
- Webhook event idempotency table; only paid sessions become paid orders.
- Security headers and baseline CSP (CSP uses unsafe-inline/unsafe-eval for compatibility: **not production-hardened**).
- Local SQLite file excluded from Git; parameterized SQL.

## Mandatory production hardening — not included
1. HTTPS and reverse-proxy trusted host configuration, HSTS and nonce-based CSP without unsafe-eval.
2. Shared durable rate limiter, brute-force alerts, account recovery and MFA/passkeys for owner.
3. Rotate secrets; managed secret storage; audit logging, monitoring and alerts.
4. PostgreSQL (or appropriate managed DB), encrypted backups, restore drills, least-privilege credentials and retention policies.
5. Secure handling of PII; privacy notice, cookie notice where applicable, deletion/export policy, PCI scope review, tax/shipping/refunds/fulfillment.
6. Verify Stripe webhook retries, disputes/refunds and asynchronous methods, stock reservations, duplicate order fulfillment safeguards.
7. Threat model, dependency audit, SAST/DAST, penetration test, incident response and operational runbooks.
8. Verify proxy-forwarded headers are controlled by trusted infrastructure; do not expose this app directly to untrusted forwarded headers.
9. Serverless hosting: local SQLite filesystem is ephemeral; use a persistent DB instead.

This is a working **development starter**, not a certification or guarantee of enterprise-grade security. Do not store real customer data until hardening is complete.
