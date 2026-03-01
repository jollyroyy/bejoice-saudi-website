# BeJoice Saudi Website — Claude Instructions

## Project Overview
Plain HTML + CSS + Vanilla JS freight forwarding website for BeJoice Saudi.
Bundled with Vite. No framework, no TypeScript.

## Repository & Deployment
- **GitHub:** https://github.com/jollyroyy/bejoice-saudi-website
- **Vercel:** https://bejoice-saudi-website.vercel.app/
- **Reference site (React):** `C:/Users/ASUS/Desktop/Bejoice_Saudi/` — runs on localhost:3001

## Key Files
| File | Purpose |
|------|---------|
| `index.html` | All page sections, HTML structure |
| `src/style.css` | All styles — CSS variables, layout, components |
| `src/main.js` | Translations (EN+AR), i18n logic, quote modal functions |
| `public/` | Static assets — images only (no video file present) |

## Fonts
- **Headings / Display:** Space Grotesk (500, 700, 900)
- **Body / UI:** Inter (300, 400, 500, 600)
- Loaded via Google Fonts in `<head>` of index.html

## Colour Tokens (CSS variables in `:root`)
```
--accent-gold:        #cba864
--accent-green:       #0a8f55
--accent-green-glow:  rgba(10,143,85,0.4)
--bg-color:           #0b1115
--text-main:          #ffffff
--text-muted:         #c8d6e5
--font-heading:       'Space Grotesk', ui-sans-serif, system-ui, sans-serif
--font-sans:          'Inter', ui-sans-serif, system-ui, sans-serif
```

## i18n System
- Every visible text element has `data-i18n="key"` attribute
- Input placeholders use `data-i18n-placeholder="key"`
- All keys defined in `translations` object in `src/main.js` with `en` and `ar` sub-objects
- `setLanguage('en'|'ar')` iterates all `[data-i18n]` elements and sets `textContent`
- Arabic switches `document.documentElement.dir = 'rtl'`

## Quote Modal — Critical Note
All modal functions are defined inside a `type="module"` script.
They MUST be exposed globally for `onclick=""` attributes to work:
```js
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
window.selectOption = selectOption;
window.quoteNext = quoteNext;
window.quoteBack = quoteBack;
```

## Page Sections (in order)
1. **Hero** (`#home`) — video background, SEAMLESS CUSTOMS / ZERO DELAYS, metrics strip pinned to bottom
2. **Services** (`#services`) — 12 service cards in a grid, video background
3. **Testimonials** — marquee logos + 3 testimonial cards
4. **Compliance Edge** (`#usp`) — two-column layout, 4 feature cards
5. **Certifications** (`#certifications`) — 3-col grid, 6 cert cards (ZATCA, ISO, FIATA, IATA, AEO, SASO)
6. **About** (`#about`) — heading + paragraph + 3 specialty cards
7. **Contact** (`#contact`) — form with video/image background
8. **Tracking** (`#tracking`) — BOL/container number lookup widget
9. **Footer** — logo, links, office address, copyright

## Hero Video
- Referenced as `/hero-ship-bg.mp4` but **file is missing** from `public/`
- Watermark suppressed via CSS radial-gradient overlays on `.video-overlay`
- To fix properly: add a 4K ship video from Pexels as `public/hero-ship-bg.mp4`

## Metrics Strip
- Lives **inside** `#home` section as `<div class="metrics-strip">`
- `position: absolute; bottom: 0; background: transparent` — floats over the video
- Animated with `IntersectionObserver` counter in `src/main.js`

## Adding New Translations
Add keys to **both** `en` and `ar` blocks in the `translations` object in `src/main.js`, then add `data-i18n="your-key"` to the HTML element.
