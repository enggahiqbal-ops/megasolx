# Humaan Assets Map

**Purpose:** Document publicly observable media slots, dimensions, aspect ratios, and interaction behavior for reconstruction with **local replaceable placeholders**.  
**Rule:** Do not copy Humaan CDN media into the distributable project. Use the local replacement paths below.

---

## Global Assets

### Logo
| Slot | Type | Observed size | Behavior | Local replacement |
|------|------|---------------|----------|-------------------|
| Header logo | SVG | 125×16 viewBox | `currentColor`, theme `--theme-logo` | `/public/images/logo.svg` |
| Footer / OG fallback | PNG | 64×64 favicon | Static | `/public/images/logo-mark.png` |

### Brand face / icon
| Slot | Type | Observed size | Behavior | Local replacement |
|------|------|---------------|----------|-------------------|
| Header face | SVG | 40×40 | Color `--theme-header-face`, hover easter egg | `/public/images/face-icon.svg` |
| Header easter egg | GIF | 81×200 | `/nothing/nothing-2.gif` + audio | Optional placeholder GIF |
| Footer face watermark | SVG | 289×311 | Decorative, `--theme-primary` | `/public/images/footer-face.svg` |

### Font files
| Slot | Type | Notes | Local replacement |
|------|------|-------|-------------------|
| Primary family | OTF | PP Neue Montreal (multiple weights) | `/public/fonts/NeueMontreal-*.woff2` or licensed alternative |

---

## Homepage

### Hero
| Slot | Type | Desktop ratio | Mobile ratio | Crop | Animation | Local replacement |
|------|------|---------------|--------------|------|-----------|-------------------|
| Hero (text only) | — | — | — | — | TextAnimateUp per letter | N/A — configurable in `data/site.ts` |
| Background | CSS color | — | — | — | — | `--theme-background: #f3f3e9` |

No hero background image observed — typography-only hero on cream background.

---

### Showreel
| Slot | Type | Desktop ratio | Mobile ratio | Crop | Animation | Local replacement |
|------|------|---------------|--------------|------|-----------|-------------------|
| Showreel poster | Image | **1452:890** (~1.63:1) | **450:364** (~1.24:1) | `object-fit: cover`; mobile CSS also uses **1:1** aspect | Sticky scroll expand via `--progress`; border-radius **30px** | `/public/images/showreel-poster.jpg` |
| Showreel video (desktop) | Video (Vimeo) | Full viewport height | — | Center crop, 100vh | Autoplay muted loop when playing; fullscreen button | `/public/videos/showreel.mp4` |
| Showreel video (mobile) | Video | 1:1 (CSS) | 1:1 | Cover | Separate mobile source element | `/public/videos/showreel-mobile.mp4` |
| OG / social preview | Image | **1200:630** | — | Cover | — | `/public/images/og-default.jpg` |

**Interaction notes**
- "See Showreel" opens fullscreen/play mode on desktop
- Controls bar with playing state class
- Hover outline transition 0.4s on poster image
- Reduced motion: show poster only, no autoplay

---

### Showcase / intro statement
| Slot | Type | Ratio | Dimensions | Crop | Animation | Local replacement |
|------|------|-------|------------|------|-----------|-------------------|
| Section background | CSS | — | Full width | — | Purple theme section (`homepage__purple-change`) | `--color-accent-purple-bg` token |
| Statement text | Text | — | max ~104.738rem | Centered | Scroll reveal (inferred) | `data/site.ts` → `introStatement` |

---

### Client logos (`HomepageLogos`)
| Slot | Type | Ratio | Observed SVG heights | Crop | Animation | Local replacement |
|------|------|-------|----------------------|------|-----------|-------------------|
| Client logo 01–N | SVG | varies | 22–66px height examples | Contain in strip | `opacity:0; translateY(100%)` stagger reveal | `/public/images/clients/client-01.svg` … |

Observed logo slot widths in HTML: 90–214px (SVG `--width` vars). Use grayscale/neutral placeholder marks.

---

### Featured project 01 — PIQUE (landscape)
| Slot | Type | Ratio | Crop | Hover | Reveal | Local replacement |
|------|------|-------|------|-------|--------|-------------------|
| Thumbnail | Image or video | **1452:890** | Inner frame **69.42%** width; outer `translateY(-60%)` | Scale **1.02** | `translateY(50px)` + opacity | `/public/images/projects/pique.jpg` |
| Video variant | MP4 | 1452:890 | Cover in rounded frame | Same | Same | `/public/videos/projects/pique.mp4` |

---

### Featured project 02 — Sussex Taps (portrait)
| Slot | Type | Ratio | Crop | Hover | Reveal | Local replacement |
|------|------|-------|------|-------|--------|-------------------|
| Thumbnail | Image/video | **710:890** (~0.797:1) | Inner frame **38.03%** width | Scale 1.02 | translateY(50px) | `/public/images/projects/sussex-taps.jpg` |

---

### Featured project 03 — Chaleit (portrait)
| Slot | Type | Ratio | Crop | Hover | Reveal | Local replacement |
|------|------|-------|------|-------|--------|-------------------|
| Thumbnail | Image/video | **710:890** | Same portrait frame | Scale 1.02 | Same | `/public/images/projects/chaleit.jpg` |

---

### Featured project 04 — Exposing Surveillance (landscape)
| Slot | Type | Ratio | Crop | Hover | Reveal | Local replacement |
|------|------|-------|------|-------|--------|-------------------|
| Thumbnail | Image/video | **1452:890** | Landscape frame | Scale 1.02 | Same | `/public/images/projects/exposing-surveillance.jpg` |

---

### About / people-first image (`homepage-bottom`)
| Slot | Type | Ratio | Desktop/mobile | Crop | Animation | Local replacement |
|------|------|-------|----------------|------|-----------|-------------------|
| Team/lifestyle photo | Image | ~3:4 inferred from grid | Right column spans 2 rows desktop | `border-radius: 30px`, cover | Loading pulse `#0000001a` | `/public/images/about-teaser.jpg` |

---

### Statistics block
| Slot | Type | Notes | Local replacement |
|------|------|-------|-------------------|
| Stat values | Text/animated number | Counter animates to final value on scroll | `data/site.ts` → `stats[]` |
| Stat labels | Text | TextAnimateUp word spans | Same |

---

### What's New feed cards
| Slot | Type | Card width | Aspect | Crop | Interaction | Local replacement |
|------|------|------------|--------|------|-------------|-------------------|
| Feed card thumb | Image | `clamp(18.75rem, 19.84vw, 24.94rem)` column | ~4:3 inferred | Cover, rounded | Horizontal drag slider | `/public/images/news/news-01.jpg` |
| Category pill | Text/badge | — | — | — | — | `data/articles.ts` |

---

## Work Index (`/work`)

### Page hero
| Slot | Type | Ratio | Notes | Local replacement |
|------|------|-------|-------|-------------------|
| Hero text | Typography | — | TextAnimateUp | `data/site.ts` |

### Category filter pills
| Slot | Type | Notes | Hover | Local replacement |
|------|------|-------|-------|-------------------|
| Filter pills | UI (no image) | White/dark pill toggle | Scale 1.075, color invert | N/A — driven by `data/projects.ts` categories |

### Work grid cards (each project)
| Slot | Type | Ratio variants | Hover | Local replacement |
|------|------|----------------|-------|-------------------|
| Project thumbnail | Image/video | **1452:890** landscape OR **710:890** portrait | Scale 1.02 | `/public/images/projects/{slug}.jpg` |
| Project video | MP4 | Same as card layout | Optional autoplay on hover (verify in QA) | `/public/videos/projects/{slug}.mp4` |
| Title overlay | Text | — | — | `data/projects.ts` |

**Observed featured slugs for placeholders:** pharmacy-777, nbcf, talk-n-walk, exposing-surveillance, sussex-taps, chaleit, marvell-tile-stone, cancer-council-wa, loam, scotch-college, pentanet, trailswa, pique, fair-go-finance, ferox, fluidity

---

## Case Study (`/work/[slug]`)

### Hero / sidebar
| Slot | Type | Ratio | Notes | Local replacement |
|------|------|-------|-------|-------------------|
| Project title | Text | — | Sticky sidebar | `data/projects.ts` |
| Visit site CTA | Button | — | External link icon | — |
| Hero media | Image/video | Project-specific | Full-width modular blocks below | `/public/images/projects/{slug}-hero.jpg` |

### Modular content blocks
| Block type | Media ratio | Radius | Local pattern |
|------------|-------------|--------|---------------|
| Full-width image | 16:10 – 3:2 typical | 20px → 30px | `/public/images/projects/{slug}/block-01.jpg` |
| Content + aside image | ~1:1 in 50% column | 20px → 30px | `/public/images/projects/{slug}/aside.jpg` |
| Video block | 16:9 | 30px | `/public/videos/projects/{slug}/demo.mp4` |
| Gallery | Mixed | 20px | `/public/images/projects/{slug}/gallery-*.jpg` |
| Awards table | — | — | Data-only |
| Testimonial | Text + optional avatar | — | `data/projects.ts` |
| Quote | Text | — | Same |

### Sussex Taps-specific (observed awards-heavy case study)
| Slot | Type | Notes | Local replacement |
|------|------|-------|-------------------|
| Awards table | Data | Organisation / category / year rows | `data/projects.ts` awards array |
| Testimonial avatar | Image | CEO quote | `/public/images/testimonials/placeholder.jpg` |

---

## About Page (`/about`)

### Hero
| Slot | Type | Desktop | Mobile | Animation | Local replacement |
|------|------|---------|--------|-----------|-------------------|
| Hero heading | Text | Large display | `--mobile` heading variant | TextAnimateUp | `data/site.ts` |
| Hero imagery | Image sequence / gallery | Horizontal drag | Stack | Gallery shrink-drag transform | `/public/images/about/gallery-*.jpg` |

### Client logo grid
| Slot | Type | Ratio | Size | Interaction | Local replacement |
|------|------|-------|------|-------------|-------------------|
| Logo cell | SVG in square cell | **1:1** | 3-col → 5-col grid | Specular/highlight on hover (3D tilt inferred) | `/public/images/clients/*.svg` |

### Team cards
| Slot | Type | Ratio | Notes | Local replacement |
|------|------|-------|-------|-------------------|
| Team member photo | Image | ~3:4 portrait | Drag gallery + mobile grid | `/public/images/team/{name}.jpg` |
| Name / role | Text | — | — | `data/site.ts` team array |

### Testimonials
| Slot | Type | Notes | Local replacement |
|------|------|-------|-------------------|
| Quote text | Typography | Large display size | `data/site.ts` |
| Author | Text | Name + company | Same |

---

## Expertise Pages (`/expertise/[slug]`)

| Slot | Type | Ratio | Placement | Local replacement |
|------|------|-------|-----------|-------------------|
| Hero title | Text | — | Top | `data/expertise.ts` |
| Section media | Image | ~16:10 | Between text sections | `/public/images/expertise/{slug}-01.jpg` |
| Feature icons | SVG | 12×12 – 14×14 | Inline with feature rows | `/public/images/icons/{name}.svg` |
| Awards logos | SVG | varied | Social proof row | `/public/images/awards/*.svg` |
| Related expertise card | Image optional | — | Bottom CTA card | `/public/images/expertise/{related-slug}.jpg` |

---

## Thinking / Articles (`/thinking`)

| Slot | Type | Card width | Thumb ratio | Hover | Local replacement |
|------|------|------------|-------------|-------|-------------------|
| Article thumbnail | Image | Full card width | ~16:10 inferred | Card lift/link (verify in QA) | `/public/images/articles/{slug}.jpg` |
| Author avatar | Image | Small circle | 1:1 | — | `/public/images/authors/{slug}.jpg` |

Article metadata slots: category tags, reading time, date, title, excerpt — all text from `data/articles.ts`.

---

## Contact Page (`/contact`)

| Slot | Type | Desktop | Mobile | Crop | Local replacement |
|------|------|---------|--------|------|-------------------|
| Background image | Image | **1512×1000** (~1.51:1) | Hidden | Cover, absolute fill | `/public/images/contact-bg-desktop.jpg` |
| Background image mobile | Image | — | **450×450** (1:1) | Cover | `/public/images/contact-bg-mobile.jpg` |
| Background video (if present) | Video | 1512×1000 | 450×450 | Cover, autoplay muted | `/public/videos/contact-bg.mp4` |

**Layout:** H1 centered over media, CTA buttons below, global locations footer.

---

## Footer / Global

| Slot | Type | Notes | Local replacement |
|------|------|-------|-------------------|
| CTA word ticker | Text animation | Rotating adjectives after "Let's make something" | `data/site.ts` → `footer.tickerWords[]` |
| Ballpit canvas | Canvas/WebGL | Desktop 992px+ only | Implement lightweight particle placeholder or static gradient |
| Location flags/icons | SVG | Small inline icons | `/public/images/icons/location.svg` |
| Social icons | SVG | Standard set | `/public/images/icons/social/*.svg` |

---

## Navigation / UI Media

| Slot | Type | Size | Notes | Local replacement |
|------|------|------|-------|-------------------|
| Expertise menu icons | SVG | 10–14px | Color-coded by category | `/public/images/icons/expertise/*.svg` |
| Button arrow icon | SVG | 14×13 | Used in CTAs | `/public/images/icons/arrow.svg` |
| MouseSpinner cursor | SVG | ~24–32px est. | mix-blend-mode: color-dodge | `/public/images/cursor-spinner.svg` |
| Modal close icon | SVG | ~18px | Blur circle backdrop | `/public/images/icons/close.svg` |

---

## Media Component Spec (for reconstruction)

### Image (`<Media type="image" />`)
```ts
{
  src: "/images/projects/example.jpg",
  alt: "Description",
  aspectRatio: "1452/890", // or "710/890", "1/1", "1512/1000"
  objectFit: "cover",
  objectPosition: "center",
  sizes: "(max-width: 479px) 100vw, (max-width: 991px) 90vw, 1190px",
  radius: "30px", // 20px mobile
  priority: false,
  blurDataURL: optional,
}
```

### Video (`<Video />`)
```ts
{
  src: "/videos/showreel.mp4",
  mobileSrc: "/videos/showreel-mobile.mp4",
  poster: "/images/showreel-poster.jpg",
  autoplay: true,
  muted: true,
  loop: true,
  playsInline: true,
  controls: false, // true for case study embeds
  reducedMotionFallback: "poster",
}
```

---

## Aspect Ratio Quick Reference

| Ratio | Decimal | Used for |
|-------|---------|----------|
| 1452:890 | 1.63:1 | Landscape project cards, showreel desktop |
| 710:890 | 0.80:1 | Portrait project cards |
| 1512:1000 | 1.51:1 | Contact desktop background |
| 450:450 | 1:1 | Contact mobile, showreel mobile CSS |
| 450:364 | 1.24:1 | Showreel mobile preload |
| 1200:630 | 1.90:1 | Open Graph images |
| 1:1 | 1.0 | Logo grid cells, mobile showreel |

---

## Loading & Fallback Behavior

| State | Observable treatment |
|-------|------------------------|
| Image loading | `#0000001a` background + 1s pulse animation |
| Image error | Not observed — implement neutral gray placeholder |
| Video loading | Poster image until `canplay` |
| Video reduced motion | Should freeze on poster (implement in reconstruction) |
| Font loading | `next/font` or preload OTF/WOFF2; fallbacks: system-ui sans |

---

## CDN URL Pattern (reference only — do not ship)

```
https://ik.imagekit.io/isclzlt7q/humaan-v6-production/images/{filename}?tr=w-{w},h-{h},dpr-{1|2},f-webp,q-{80|100}
```

Use this only to understand transform parameters when generating local responsive sizes.

---

## Placeholder Checklist for `/public`

```
public/
  images/
    logo.svg
    logo-mark.png
    face-icon.svg
    footer-face.svg
    showreel-poster.jpg
    og-default.jpg
    about-teaser.jpg
    contact-bg-desktop.jpg
    contact-bg-mobile.jpg
    projects/
      pique.jpg
      sussex-taps.jpg
      chaleit.jpg
      exposing-surveillance.jpg
      {slug}.jpg
      {slug}/block-01.jpg
    clients/
      client-01.svg …
    team/
      member-01.jpg …
    articles/
      article-01.jpg …
    expertise/
      websites-01.jpg …
    icons/
      arrow.svg
      close.svg
      expertise/*.svg
      social/*.svg
  videos/
    showreel.mp4
    showreel-mobile.mp4
    contact-bg.mp4
    projects/
      pique.mp4
      {slug}.mp4
  fonts/
    (licensed grotesk files)
```

Every path above must be swappable via `data/site.ts`, `data/projects.ts`, `data/articles.ts`, and `data/expertise.ts` without editing layout components.
