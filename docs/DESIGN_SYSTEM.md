# Frontend Design Factory — Design rules v1.0

## Philosophy
A commercial-grade reusable baseline: elegant, legible, responsive, accessible, restrained animation. Replace branding without changing domain logic.

## Design tokens
- Background `#f7f6f2`, ink `#1b2927`, muted `#65716d`, accent `#b57e50`, border `#e4e5df`.
- Font pairing: Playfair Display headings, DM Sans body; fallback fonts provided. For regulated or high-performance deployments self-host fonts.
- Spacing: 4/8/12/16/24/32/48/64 px; max content width 1160px.
- Border radius: 18px for cards, full pill for primary CTAs.
- Cards: consistent elevation and image aspect; avoid gratuitous glassmorphism.

## Motion
- Motion library (`motion/react`) for subtle product hover; target 150–250ms.
- Honor prefers-reduced-motion; no blocking animations on checkout or auth.
- Animate feedback, not critical business state. Avoid layout shifts.

## UI UX Pro Max + 21st.dev workflow
1. Write page objective, persona, accessibility requirements and trust cues.
2. Use UI UX Pro Max as a *design review skill*, not as a runtime dependency.
3. Evaluate candidate components from 21st.dev; review their code, licenses, accessibility, dependencies and security before copying.
4. Adapt to these design tokens; do not copy arbitrary components wholesale.
5. Use Motion only where it improves clarity; test keyboard and reduced-motion behavior.
6. Verify mobile, desktop, loading, empty, error and unauthorized states.

## Release acceptance criteria
- WCAG 2.2 AA target, keyboard focus, labels, contrast and semantic structure.
- 320/375/768/1024/1440px responsive review.
- Lighthouse accessibility/performance evaluation on deployed build.
- No payment card inputs in our app; no secrets in client bundles.
- Unit, integration, E2E and security checks required before production.
