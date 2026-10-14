# Luva’s Healthy V3 — cinematic hero

The homepage now uses an accessible full-width cinematic hero, with Motion entrance effects, separate logo/text overlays, a play/pause control, and a reduced-motion poster fallback.

## One required manual step
The Grok-generated 8-second video is complete in Invideo, but the workspace could not download its MP4 due to network restrictions. The archive does **not** include the MP4. Download it from:
https://invideo.io/@ingfrancisco/luvas-healthy-cinematic-website-intro/notebook/seq-4.1

Save it exactly as `public/videos/luvas-intro.mp4` (create no nested folder). The browser will then play it automatically. Without it, the hero displays the supplied still photo.

## Run locally
In macOS Terminal, from this project's root:
`npm install`
`npm run dev`
Open http://localhost:3000.

No additional Invideo credits are needed to install this video. Check browser autoplay policy; video is muted and plays inline. Test accessibility and mobile performance before publishing.
