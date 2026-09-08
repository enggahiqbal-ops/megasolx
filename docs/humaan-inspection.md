# Humaan Website Inspection

**Inspection date:** 2026-03-09  
**Target:** https://www.humaan.com/  
**Method:** Public HTML, publicly served CSS/JS chunks, rendered content structure, ImageKit URL dimensions, JSON-LD, and meta/preload tags. No private source or assets were copied.

---

## 1. Site Architecture & Technology (Observable)

| Layer | Observation |
|-------|-------------|
| Framework | Next.js App Router (React Server Components, `__next_f` payloads, Turbopack chunks) |
| Styling | SCSS CSS Modules (`Component-module-scss-module__hash__element`) |
| CMS | Storyblok (`preconnect` to `a-us.storyblok.com`) |
| Media CDN | ImageKit (`ik.imagekit.io/isclzlt7q/humaan-v6-production/...`) |
| Video | Vimeo embed (`preconnect` to `player.vimeo.com`) |
| Smooth scroll | Lenis present in public JS chunks (`0z8ztw1aonn49.js`, `2wikhjkxe5tlb.js`) |
| Font | Self-hosted **PP Neue Montreal** (Regular, Light, Medium, Bold + italics) via `/_next/static/media/NeueMontreal_*.otf` |
| Analytics | Google Tag Manager (`GTM-WNB8PTD`) |

**Licensed font note for reconstruction:** Use PP Neue Montreal if licensed, otherwise a close grotesk alternative (e.g. Instrument Sans, General Sans, or similar neutral grotesk).

---

## 2. Page Hierarchy

```
/                          Homepage
/about                     About
/work                      Work index
/work/category/[slug]      Work category filters
/work/[slug]               Case study
/expertise/[slug]          Expertise/service pages
/thinking                  Article index
/thinking/[slug]           Article detail (inferred)
/contact                   Contact
```

### Expertise pages confirmed publicly linked
- `/expertise/websites`, `/expertise/web-applications`, `/expertise/mobile-apps`, `/expertise/ecommerce`, `/expertise/data-visualisation`
- `/expertise/user-research-validation`, `/expertise/user-experience-design`, `/expertise/user-interface-design`, `/expertise/prototyping`, `/expertise/design-systems`
- `/expertise/headless`, `/expertise/react-js`, `/expertise/payload-cms`, `/expertise/laravel`, `/expertise/ai-automation`
- `/expertise/commercial`, `/expertise/not-for-profit`, `/expertise/innovation-startups`, `/expertise/education`, `/expertise/community`

---

## 3. Global Layout System

### Page shell (`FooterRevealPageWrap`)
- Main content lives in `.page-wrap` with:
  - `background: var(--theme-background, #f3f3e9)`
  - `padding-top: var(--header-height)` (5.3125rem)
  - `min-height: 100vh`
  - `border-radius: 0 0 60px 60px` (rounded bottom corners over footer)
  - Background color transition: `0.4s ease-in-out`
- Footer sits **behind** the page; scrolling reveals it (footer-reveal pattern).
- Footer twin scroll element used for synchronized reveal behavior.

### Container widths (from public CSS)
| Token / class | Effective width |
|---------------|-------------------|
| `.container` | `max-width: calc(1432px + gutter*2)` |
| `.container-narrow` | `max-width: calc(1220px + gutter*2)` |
| Primary wide sections | `clamp(89.5rem, 94.709vw, 119.035rem)` ≈ **1432px → 1904px** content |
| Editorial/narrow blocks | `clamp(64.375rem … 85.6188rem)` to `clamp(76.25rem … 101.413rem)` |

### Gutters (`--container-gutter`)
| Breakpoint | Value |
|------------|-------|
| Default (mobile) | `20px` |
| `min-width: 768px` | `1.875rem` (30px) |
| `min-width: 992px` | `clamp(2.5rem, 2.6455vw, 3.325rem)` ≈ **40px → 53px** |

### Header height
- `--header-height: 5.3125rem` (85px)

---

## 4. Design Tokens (Public CSS `:root`)

### Default theme
```css
--default-primary: #90f188;
--default-primary-text: #23bb16;
--default-secondary: #0f1d07;
--default-text: #0f1d07b3;      /* ~70% opacity dark green-black */
--default-tertiary: #f3f3e9;   /* warm off-white page background */
```

### Semantic aliases (used sitewide)
```css
--theme-primary: var(--default-primary);
--theme-secondary: var(--default-secondary);
--theme-text: var(--default-text);
--theme-background: var(--default-tertiary);
--theme-logo: var(--default-secondary);
--theme-header-face: var(--default-primary);
```

### Additional theme variants observed
Purple, pink, yellow, blue, cyan, green, xmas, tennis, security — each with primary/secondary/text/tertiary sets. Pages override `--theme-*` inline or via section styles (e.g. awards modal uses pink theme).

### Body defaults
- `font-size: 0.9375rem` (15px)
- `font-weight: 500`
- `text-rendering: geometricprecision`
- Selection: foreground `--theme-secondary`, background `--theme-primary`

---

## 5. Breakpoints (Observable)

| Name | px | Usage |
|------|-----|-------|
| xs | 480 | Grid columns, small nav link padding |
| sm | 768 | Gutters, submenu positioning, text clip reveals |
| md | 992 | **Primary layout breakpoint** — desktop nav, sticky showreel, multi-column layouts |
| (article) | 1024 | Blog container width |
| lg | 1200 | Footer grid, team grid, stats scale-up |
| xl | 1400 | Hero overlap with header, larger display type |
| xxl | 1600 / 2000 | Thinking page heading caps |

Also observed: `max-width: 479px`, `max-width: 767px`, `max-width: 991px`, `max-width: 379px` for fine-grained mobile nav.

---

## 6. Typography Hierarchy

### Font family
- **PP Neue Montreal** — single family for display and body
- Weights used: 500 (default body/headings), with Bold/Light/Medium files loaded

### Display / hero patterns
| Context | Mobile | Desktop (992px+) |
|---------|--------|-------------------|
| Homepage H1 | `clamp(3.125rem, 6.51vw, 4.156rem)`, line-height **0.92** | `clamp(8.125rem, 8.598vw, 10.806rem)` |
| Work/About heroes | `2.5rem` | `clamp(6.25rem, 6.614vw, 8.3125rem)` |
| Showcase statement | `clamp(2.1875rem, 4.56vw, 2.909rem)` | `clamp(6.25rem, 6.614vw, 8.3125rem)`, centered, white on purple |
| Thinking H1 | — | `15vw` (992px), up to `20vw` (1600px+) |
| Footer CTA | `2.5rem` | `clamp(4.375rem, 4.63vw, 5.819rem)` |
| Feed "What's New" heading | — | `clamp(3.75rem, 3.968vw, 4.9875rem)` |

### Body / editorial
- Intro WYSIWYG: `clamp(1rem … 1.33rem)` mobile → `clamp(1.25rem … 1.6625rem)` desktop
- Article excerpt/meta: `clamp(0.9375rem … 1.247rem)` range common

### Letter spacing / case
- Headings: tight line-heights (0.75–1.0), no forced uppercase globally
- Category pills & UI labels: sentence case

### Responsive type technique
- Heavy use of `clamp(min, vw-based, max)` scaled to ~1512px design reference
- Per-character animation spans for hero text

---

## 7. Navigation Structure

### Primary links (desktop & mobile)
1. Home → `/`
2. About → `/about`
3. Work → `/work`
4. Expertise → mega submenu (button, not direct link)
5. Thinking → `/thinking`
6. Contact → `/contact`

### Header layout
- Grid: `auto | 1fr | auto` — logo left, pill nav center, face icon right
- Logo SVG: **125×16** viewBox
- Face icon: **40×40** SVG + optional `/nothing/nothing-2.gif` easter egg (81×200) with audio

### Pill navigation behavior
- Fixed pill container with `border-radius: 100vh`
- **Mobile:** fixed to bottom (`bottom: 1.875rem`), centered `translateX(-50%)`
- **Desktop (768px+):** fixed top (`top: 1.25rem`)
- Backdrop: `backdrop-filter: blur(8px)`, background `#ffffffb3`
- Twin link layer + **hover pill** + **active pill** (absolutely positioned, `border-radius: 100px`)
- Active link gets highlighted pill on current route
- Color transitions on links/logo/face: **0.4s ease-in-out**

### Expertise mega menu
- Trigger: `button` with `data-submenu-open` on nav
- Container: white panel, `clip-path: inset(round 22px ...)`, `border-radius: 1.375rem` mobile / `1.875rem` desktop
- Animation: `0.4s cubic-bezier(0.86, 0, 0.07, 1)`
- Four groups: **What We Do**, **Design & UX**, **Technology**, **Experience**
- Each link has colored icon variant (--cyan, --pink, --blue, --green, --purple, --yellow)
- Mobile submenu: up to **90vh** height, opens upward from bottom nav

### Scroll / state
- Header is not a shrinking sticky bar; nav pill is **always fixed** (top or bottom by breakpoint)
- Page content offset by `--header-height`
- Skip link: `#page-content`

---

## 8. Homepage — Section Order

1. **Global header** (logo + pill nav + face)
2. **Hero** — H1 "Extraordinary Digital Experiences"
3. **Showreel block** — sticky scroll media inside purple theme section
4. **Showcase / intro statement** — "We design, build and ship world-class digital products for forward-thinking brands." (white type on purple)
5. **Client logo strip** (`HomepageLogos`) — SVG logos animate in from below
6. **Featured work grid** — 4 projects in alternating layout (see §12)
7. **About / people-first block** (`homepage-bottom`) — heading, copy, image, stats
8. **Statistics list** — 3 animated stat rows
9. **What's New** — horizontal feed slider with heading
10. **Footer reveal zone** — global footer with CTA, locations, links, word ticker, ballpit canvas (desktop)

---

## 9. Hero Section

| Property | Mobile | Desktop |
|----------|--------|---------|
| Min-height | `30vh` | `80vh` |
| Alignment | grid, vertically centered | same |
| Overlap header | — | `margin-top: calc(var(--header-height) * -1)` at 1400px+ |
| H1 max-width | `clamp(22.5rem, 46.875vw, 29.925rem)` | `clamp(68.75rem, 72.75vw, 91.4375rem)` |
| H1 color | `var(--theme-secondary)` | same |

### Hero animation (`TextAnimateUp`)
- Text split into per-letter `<span>` elements
- Initial: `opacity: 0`, `transform: translate3d(0, 80%, 0)`
- CSS variable `--progress` drives clip-path on words (768px+): `clip-path: inset(0 0 calc(100% - var(--progress) * 150%))`
- Accessible label on H1 via `aria-label`; animated spans `aria-hidden`

### Hero CTA
- "See Showreel" control associated with showreel (fullscreen/play pattern)

---

## 10. Showreel Section

### Structure
- Wrapper `.showreel-wrapper`: **200vh** scroll height on desktop (992px+)
- Inner `.showreel`: **sticky**, `top: 0`, **100vh** height
- Media container: `border-radius: 30px`, overflow hidden

### Scroll-driven layout (desktop)
- `--progress` drives horizontal inset:
  `--offset: calc((1 - var(--progress)) * var(--container-gutter) - var(--container-gutter))`
- Media expands from inset gutter toward full bleed as user scrolls

### Media aspect ratios & dimensions
| Breakpoint | Ratio / size | Source signal |
|------------|--------------|---------------|
| Mobile (≤479px) | **450×364** (~1.24:1) preload | ImageKit `tr=w-450,h-364` |
| Desktop (≥480px) | **1452×890** (~1.63:1) preload | ImageKit `tr=w-1452,h-890` |
| CSS mobile | `aspect-ratio: 1` on image/video | square crop |
| CSS desktop | `height: 100vh`, `object-fit: cover` | full viewport |

### Video behavior
- Separate desktop/mobile video elements (`.showreel__video--desktop`, `--mobile`)
- Vimeo integration (public preconnect)
- Poster/fallback PNG referenced in JSON-LD and OG tags
- Controls: `.showreel__controls--playing` state class
- Desktop fullscreen button: bottom center, blur backdrop `backdrop-filter: blur(8px)`, bg `#ffffff80`

### Theme
- Showreel sits in `homepage__purple-change` grid — purple background section spanning top/bottom grid areas

---

## 11. Intro / Showcase Statement

- Container: wide max-width matching work grid (~119rem cap)
- Color: **white text** on purple section
- Text-align: **center**
- Vertical spacing: large margins (`clamp(7.5rem … 9.975rem)` to `clamp(17.5rem … 23.275rem)` on desktop)
- Min-height includes **`padding-bottom: 50vh`** on mobile showcase — editorial pause before work grid overlap
- Work grid uses **`margin-top: -50vh`** to overlap showcase/showreel zone

---

## 12. Featured Work Grid (Homepage)

### Observed project order & layout
| # | Project | Row type | Aspect ratio |
|---|---------|----------|--------------|
| 1 | PIQUE | landscape (full width) | **1452:890** (~1.63:1) |
| 2 | Sussex Taps | portrait pair row | **710:890** (~0.797:1) each |
| 3 | Chaleit | portrait pair row | **710:890** |
| 4 | Exposing Surveillance | landscape | **1452:890** |

### Grid CSS
- Row gap: `3.125rem` mobile → `clamp(1.875rem … 2.494rem)` tablet+
- Landscape row: single column `grid-template-areas: "a"`
- Portrait row: stacked mobile, **two columns** desktop (`"a b"`)
- Section max-width: `clamp(89.5rem, 94.709vw, 119.035rem)`

### Work card anatomy
- Wrapper enters with `opacity: 0; transform: translateY(50px)` (scroll reveal)
- Thumbnail uses padding-top aspect-ratio box: `padding-top: calc(var(--aspect-y)/var(--aspect-x)*100%)`
- Inner image width: **69.42%** (landscape), **38.03%** (portrait) — creates floating device/frame look
- Thumbnail outer default inline transform: `translateY(-60%)` — parallax/crop offset
- Border radius: `clamp(1.25rem … 1.6625rem)` → `clamp(1.875rem … 2.494rem)` desktop
- Picture radius: **20px** mobile, inherits on desktop

### Project card typography
- Title below/at content overlay: `clamp(1rem … 1.33rem)` → `clamp(1.25rem … 1.6625rem)`
- Content variants: `--white` or `--black` text on media

### Hover / focus
- `@media (hover:hover)`: thumbnail child scales **`transform: scale(1.02)`**
- Focus-visible: dashed outline `--theme-secondary` + 6px `--theme-primary` shadow ring
- **No custom cursor label** observed on project cards in public CSS (site uses global MouseSpinner)

---

## 13. About / People-First Block (`homepage-bottom`)

### Desktop grid (992px+)
```
"heading  heading"
"content  image"
"stats    image"
```
Columns: **2fr / 3fr**

### Heading
- Observed accessible label pattern: emoji/smiley inline SVG in heading
- Example structure: "Great work for great [smiley] people."
- Font-size: `clamp(2.5rem, 8.33vw, 3.325rem)` → `clamp(8.125rem, 8.598vw, 10.806rem)`, line-height **0.75**

### Body copy
- Two paragraph editorial block (people-first + independent spirit) — content from CMS
- Link to About page
- Image: `border-radius: 30px`

---

## 14. Statistics Block

### Layout
- 2-column grid per stat row: **40% value / 60% label**
- Border-bottom: `1px solid #0000001a` between items
- Padding per row: `clamp(1.875rem … 2.494rem)`

### Observed stats (structure)
| Value | Label |
|-------|-------|
| 0% | In-house & independent |
| 0 | [animated counter label] |
| 0+ | [animated counter label] |

(Values animate via JS counters on scroll; initial HTML shows `0` placeholders.)

### Typography
- Value: `clamp(3.125rem … 4.156rem)` → up to `clamp(5rem … 6.65rem)` at 1200px+
- Label: `clamp(1.5rem … 1.995rem)`, weight 500

---

## 15. What's New / Feed Slider

- Component: `FeedSlider`
- Heading: "What's New" — sticky left while cards scroll horizontally
- Cards: fixed column width `clamp(18.75rem, 19.841vw, 24.9375rem)`
- Gap: `clamp(1.25rem … 1.6625rem)`
- Interaction: `cursor: grab` / `grabbing`, drag with `transition: transform 0.7s cubic-bezier(0.5, 0.5, 0, 1)`
- Card metadata: category pill, date, title, optional external link
- Overflow extends to viewport edges via `--feed-overflow` calc

---

## 16. Work Page (`/work`)

### Header
- H1: "World-class digital products, idea to execution."
- Same `TextAnimateUp` hero pattern

### Category filters (`WorkCategories`)
Publicly rendered pill links (route-based, not client-only):

| Label | Route |
|-------|-------|
| Featured | `/work` |
| Commercial | `/work/category/commercial` |
| Community & Purpose | `/work/category/community-purpose` |
| Education | `/work/category/education` |
| Innovation | `/work/category/innovation` |
| Not for Profit | `/work/category/not-for-profit` |
| UI & UX | `/work/category/ui-ux` |

### Pill styling
- Default: white bg, dark text
- Active: `--theme-primary` text on `--theme-secondary` bg
- Hover: inverted colors + **`scale(1.075)`**, 0.2s ease
- Hit area expanded via `::before` inset pseudo

### Project grid
- Same `WorkGrid` / `WorkCard` system as homepage
- Grid enter animation: `opacity 0 → 1`, `translateY(4vw) → 0`, **0.4s ease-in-out**
- Featured projects listed in public HTML include: Pharmacy 777, NBCF, Talk N Walk, Exposing Surveillance, Sussex Taps, Chaleit, Marvell, Cancer Council WA, Loam, Scotch College, Pentanet, TrailsWA, PIQUE, Fair Go Finance, Ferox, Fluidity

### Service/skill tags (Websites, React.js, UX Design, etc.)
- **Not observed as a second filter row** in public initial HTML for `/work`
- These labels **do appear** as expertise nav items and as **case study service lists** (e.g. "Digital Strategy", "React & Next.js", "Payload CMS")
- For reconstruction: implement as metadata tags on projects + optional filter layer, but the **observable** work index filter UI is the **category pill row** above

---

## 17. Case Study Template (`/work/[slug]`)

### Observed structure (Pharmacy 777, Sussex Taps, Exposing Surveillance)
1. **Sidebar** (sticky on desktop) — title, "Visit Website" button, category, services list
2. **Modular content body** — long-form paragraphs
3. **Awards table** (where applicable)
4. **Testimonial** block
5. **Next project** navigation (inferred from site patterns)
6. Global footer

### Sidebar (992px+)
- Width: `clamp(28.125rem, 29.762vw, 37.406rem)`
- Sticky top aligned
- Primary CTA button: secondary background, icon arrow

### Content blocks (public CSS components)
- `ModularBlocks` with vertical gap: 5rem → 6.25rem → **9.375rem** (992px+)
- `ContentAsideImage` — 50/50 grid, image radius 20px → 30px
- `IconCards`, `FAQsBlock`, `AwardsBlock`, etc.

---

## 18. About Page (`/about`)

### Section order (observed)
1. Hero — "Digital Products. Human Experiences." (`TextAnimateUp`, mobile-specific heading variant)
2. **Client logo grid** (`LogoGrid`) — 3 cols mobile → 5 cols desktop, square cells, glass/card borders
3. Capabilities intro paragraph
4. **Capability columns** — Strategy & UX, Design, Development, Technology, Optimisation, Support (bullet lists)
5. **Testimonials slider** — prev/next controls, large quote typography
6. **Team section** — "We're only Humaan" + horizontal draggable gallery/cards
7. **Awards block** — intro + logo grid + "See all awards" modal trigger
8. **Values / Do's & Don'ts** — two-column lists
9. Careers CTA
10. Footer

### About gallery
- Horizontal drag gallery with `cursor: grab`
- Border radius: 10px → 30px
- Vertical padding uses viewport-relative `calc(100/1512px*100vw)` offset pattern

---

## 19. Expertise Pages (`/expertise/[slug]`)

### Template pattern (Websites, Headless, UX Design observed)
1. Hero H1 — service name
2. Subheading line — value proposition
3. Large condensed headline words (split styling, no spaces visual)
4. Intro paragraph + **4 feature rows** (icon/title/description, separated by `---` in content)
5. Multiple **H2 sections** with large display titles (words run together visually)
6. Body paragraphs per section
7. **Awards** social proof row (AWA, Good Design, Webby, Awwwards, FWA SVGs)
8. **Testimonials** (blockquote + author)
9. **Related expertise** card link at bottom
10. Expertise footer bar (white rounded top, 992px+)
11. Global footer

### Expertise card pattern
- Dark `--theme-secondary` background, white text, `border-radius: 30px`
- Pill badge using `--theme-primary`

---

## 20. Thinking Page (`/thinking`)

### Header
- H1: "Thinking" — uses `TextAnimateDown` (letters from `-80% Y`)
- Subheading: "Musings on design, experience and technology."
- Desktop H1: **15vw** font-size, negative top margin (~-12%) for overlap effect

### Article list
- `ArticleCard` components in grid/list
- Each card: thumbnail, category tags, reading time, title, excerpt, author + date, arrow button
- Metadata via `ArticleMeta`, `ArticleAuthor`
- "Load More" pagination button at bottom (observed count: 6 more)

---

## 21. Contact Page (`/contact`)

### Layout
- Full viewport min-height grid
- Negative margin top to overlap header: `calc(var(--header-height) * -1)`
- Background **image/video** fills viewport behind content

### Media dimensions (ImageKit transforms)
| Variant | Dimensions | Ratio |
|---------|------------|-------|
| Desktop | **1512×1000** | ~1.51:1 |
| Mobile square | **450×450** | 1:1 |

### Content
- H1: "We've got a great feeling about this"
- Primary CTA: **Submit a brief** (opens contact form modal)
- Separate desktop/mobile background elements (CSS display swap at 992px)
- Footer integrated via `contact-footer` section with global locations

### Locations (JSON-LD / footer)
- Perth (primary AU)
- Melbourne
- Los Angeles (US sub-organization)

---

## 22. Footer

### Visual system
- White background, `--theme-secondary` text
- `max-height: 100svh`
- Sticky inner grid with areas: `heading | columns | bottom | face`

### CTA heading
- Button-style heading: **"Let's make"** + animated word ticker
- Ticker words (observed): epic, innovative, delightful, robust, extraordinary, original, intelligent, engaging, beautiful, secure, world-class
- Arrow icon shifts on hover: `translate(25%, 10%)`
- Hover color: `--theme-primary`

### Desktop extras
- **Ballpit** canvas animation (`BallPit` component) behind footer content (992px+, hidden mobile)
- Large face SVG watermark

### Footer columns
- Contact email buttons with arrow nudge on hover (`translate(4px)`)
- Locations: Perth, Melbourne, Los Angeles
- Social links, legal, copyright
- Navigation repeats

### Mobile layout
- Narrow centered stack (`max-width: 30rem` → `37.5rem` tablet)
- Face icon visible in footer grid (hidden on desktop footer grid in favor of ballpit)

---

## 23. Custom Cursor (`MouseSpinner`)

- Fixed wrapper, `pointer-events: none`, z-index **1000**
- SVG spinner follows cursor position
- `mix-blend-mode: color-dodge` on SVG
- Appear animation: **0.15s ease-in-out**, scale 0 → 1, fade in
- **Not** a dot+ring system — single blended glyph
- Should be disabled on touch / reduced motion / small screens

---

## 24. Scroll Behavior

- **Lenis** smooth scroll on desktop (public JS)
- **GSAP-style scroll triggers** inferred from `--progress` driven CSS on showreel and scroll-linked transforms
- `overscroll-behavior: none` on body
- Footer reveal: page wrap translates/scales to expose footer beneath
- Sticky sections: showreel, project sidebar, feed heading, modal close button

---

## 25. Reveal Animations (Observable)

| Pattern | Target | Initial state | Easing / duration |
|---------|--------|---------------|-------------------|
| `TextAnimateUp` | Hero words | `translateY(80%)`, opacity 0 | clip-path via `--progress` |
| `TextAnimateDown` | Thinking title | `translateY(-80%)` | same clip system |
| Scroll fade-up | Work cards, stats, logos | `opacity:0; translateY(50px)` or `translateX(-50px)` | scroll-triggered |
| Work grid enter | /work page | `translateY(4vw)` | 0.4s ease-in-out |
| Submenu | Expertise nav | clip-path inset + height | 0.4s cubic-bezier(0.86,0,0.07,1) |
| Hover scale | Work cards, category pills | scale 1.02 / 1.075 | 0.2s ease |
| Logo strip | Client logos | `opacity:0; translateY(100%)` | stagger |

---

## 26. Page Transitions

- No dedicated route transition overlay class observed in public CSS
- Per-section enter animations and footer reveal provide continuity
- Background `--theme-background` transitions (0.4s) prevent harsh flashes
- Modal system (`SmoothModal`) used for awards, contact form — fade + padding animation

---

## 27. Sticky / Fixed Elements

| Element | Behavior |
|---------|----------|
| Pill navigation | Fixed top (768px+) or bottom (mobile) |
| Showreel media | Sticky 100vh (992px+) |
| Project sidebar | Sticky on case studies (992px+) |
| Feed "What's New" heading | Sticky left during horizontal scroll |
| Modal close button | Sticky top 30px / 45px |
| Alert/no-JS bar | Fixed bottom |

---

## 28. Responsive Behavior Summary

### Mobile (320–767px)
- Bottom-fixed pill nav; reduced link padding below 480px / 380px
- Square showreel media aspect
- Single-column work rows (including portrait pairs stacked)
- Simplified footer layout, no ballpit
- Contact square media crop
- Team grid 1–2 columns

### Tablet (768–991px)
- Top-fixed nav returns
- Increased gutters
- Submenu opens downward from nav
- Some typography mid-scale clamps active

### Desktop (992px+)
- Full typographic scale
- Sticky showreel scroll scene
- Two-column portrait work rows
- Homepage bottom 2fr/3fr grid
- Footer multi-column layout

### Large desktop (1400px+)
- Hero overlaps header zone
- Maximum clamp values reached on many type tokens

---

## 29. Accessibility Observations

- Skip navigation link to `#page-content`
- Semantic landmarks: `header`, `main`, `footer`, `nav`
- Hero headings use `aria-label` with decorative letter spans hidden
- Focus-visible: **3px dashed** outline, `--theme-secondary`, 2px offset
- Buttons used for non-navigation actions (Expertise, footer CTA, brief submit)
- No-JS alert bar fixed bottom
- Reduced motion: not explicitly in CSS — should be added in reconstruction
- Video/showreel requires keyboard-accessible play control on desktop

---

## 30. DOM / Class Naming Patterns

```
FooterRevealPageWrap / page-wrap
Header / HeaderSubmenu
HomepageTemplate / HomepageShowreel / HomepageStats
WorkGrid / WorkCard / WorkCategories
ThinkingTemplate / ArticleCard
AboutTemplate / AboutGallery / AboutTeam
ContactTemplate
ProjectContents / ProjectSidebar
ModularBlocks / ContentAsideImage
TextAnimateUp / TextAnimateDown
MouseSpinner
FeedSlider
Footer / FooterInternationalContents
Pill (generic tag component)
Button (variants: --bg-primary, --bg-secondary, --bg-white, --icon)
```

Data attributes: `data-submenu-open`, `data-columns`, `data-dpl-id`

---

## 31. Image / Media Treatment Summary

- `object-fit: cover` universal for photos/video
- ImageKit responsive transforms with `dpr-1/2`, `f-webp`, `q-80/100`
- `<picture>` with `<source media="...">` breakpoints at **479px / 480px**
- Loading placeholders: `#0000001a` bg + pulse animation
- Border radii: 20px mobile → 30px desktop for large media
- `.5px solid transparent` border trick on images (likely subpixel rendering)

---

## 32. SEO / Metadata (Observable)

- Title template on homepage: "Humaan | Websites & Apps | Award-Winning Digital Agency"
- Canonical URLs per page
- OG/Twitter large image cards (1200×630 from showreel poster)
- JSON-LD: WebPage, LocalBusiness, OfferCatalog services
- `lang="en"` on `<html>`

---

## 33. Reconstruction Notes

1. **Do not copy** Humaan logos, copy, team photos, showreel, or client marks — use placeholders from `/public/images` and `/public/videos`.
2. Match **layout rhythm** first: gutter system, 1432px logical canvas, clamp typography, 992px breakpoint.
3. Priority interactions: pill nav + expertise menu, showreel sticky scroll, work card hover scale, footer reveal, MouseSpinner, Lenis scroll.
4. The site's personality comes from **tight grotesk display type**, **green/cream palette**, **large radii**, and **scroll-linked media** — not from generic card shadows.
5. Project/service tags belong in **data layer** even if filter UI is simplified to observed category pills.

---

## 34. Inspection Limits (Not Observable Without Browser Runtime)

- Exact GSAP ScrollTrigger pin values and scrub curves
- Precise Lenis duration/lerp settings
- MouseSpinner SVG path variants per context (carousel vs default)
- Some `/work` grid content loaded after client hydration (Suspense template observed)
- Exact ballpit physics parameters

These should be tuned during visual QA against the live site.
