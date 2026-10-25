# Sarga Bharath Industries Pvt. Ltd. — Bearing Solutions Website

A single-page corporate website for Sarga Bharath Industries ("From Indian to Indians · Make in India | Built for
the World"). It presents the company's bearing products, automotive, industrial and railway bearing solutions, and
specialised bearing technologies, and invites B2B enquiries by form or WhatsApp.

This is a **frontend-only website**. There is no e-commerce, cart, login, database or backend.

## Tech stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4 (design tokens and animation keyframes in `src/index.css`)
- Framer Motion through `LazyMotion` with `domMax` (scroll reveals, tab and filter transitions, layout animation)
- Lucide React icons
- Archivo variable font, self-hosted through `@fontsource-variable/archivo`

## Getting started

Requires Node.js 20.19+ or 22.12+ (developed with Node 24).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start the development server with hot reload     |
| `npm run build`     | Type-check, then build for production to `dist/` |
| `npm run preview`   | Serve the production build locally               |
| `npm run typecheck` | Run the TypeScript compiler only                 |
| `npm run lint`      | Lint with oxlint                                 |

### Before deploying

Set the public site address in `.env` so Open Graph tags and structured data use absolute URLs:

```bash
VITE_SITE_URL=https://www.your-domain.example
```

`dist/` is a static site, so it can be hosted on any static host (Netlify, Vercel, Cloudflare Pages, S3, or an
Apache/Nginx server).

## Page structure

| Section | Anchor | What it does |
| --- | --- | --- |
| Header | — | Top bar with email, phone and WhatsApp; sticky menu with a five-column Products mega menu |
| Hero | `#home` | Headline, bearing search, CTAs, drawing-sheet photo with a rotating "Detail A" bearing |
| Bearing Products | `#products`, `#bearing-<id>` | 10 bearing types with section drawings; ball / roller / thrust filter |
| Application Solutions | `#solutions`, `#solutions-automotive` / `-industrial` / `-railway` | Tabbed sector showcase with photos and solution lists |
| Specialised Technologies | `#technologies`, `#tech-<id>` | Six technologies on a blueprint background with a rotating bearing |
| Why Sarga Bharath | `#why-choose-us` | Four reasons, drawn from the company's own statements |
| About | `#about` | Company introduction, philosophy, vision, mission and values |
| Contact | `#contact` | WhatsApp, phone, email, offices and the enquiry form |
| Footer | — | Product, solution and technology links; contact details |

A floating WhatsApp button (bottom right) opens a chat with **+91 96325 56494** with a pre-filled greeting.

```
src/
  App.tsx                      page composition
  index.css                    Tailwind import, colour/type tokens, animations
  data/
    bearings.ts                bearing products, sector solutions, technologies, enquiry options
    bearing-sections.ts        geometry of the 10 bearing half-section drawings
    company.ts                 name, taglines, vision / mission / values, offices, phone, email, WhatsApp
    navigation.ts              menu and mega menu, built from bearings.ts
  components/
    layout/                    Header, Footer
    sections/                  one component per page section
    contact/                   EnquiryForm and its validation
    ui/                        BrandLogo, BearingSectionDrawing, BearingSpinner, WhatsAppButton, Reveal, …
  context/                     passes "Enquire now" choices to the form
  hooks/                       scroll state, active section tracking
  lib/                         search, smooth scrolling, motion presets, enquiry submit stub
public/
  images/photos/               responsive WebP photographs
  images/brand/                Sarga Bharath logo: header lockup, full logo, monogram
```

## Editing content

- **Products, solutions and technologies:** `src/data/bearings.ts`. The menus, footer links, search and the
  enquiry form's options are all built from this file, so an entry added here appears everywhere.
- **Company details and statements:** `src/data/company.ts`. The WhatsApp number is stored once there
  (`whatsapp.number`, in the international format `91XXXXXXXXXX`); every WhatsApp link uses it.
- **Bearing drawings:** each type in `bearings.ts` names a drawing in `bearing-sections.ts`. The drawings are
  schematic half-sections in a 160 × 128 coordinate space with the bearing axis along `y = 120`.

**Content accuracy rule:** product, solution and technology names are the company's own list. The one-line
descriptions of bearing types and technologies are general engineering definitions. Don't add years in business,
certifications, customer names, statistics, prices or specifications until the company has confirmed them. The
phone number and email address were carried over from an earlier version of this site; confirm them before launch.

## Search

The hero search is a local search over `bearings.ts` (no product database). It matches bearing types, sector
solutions and technologies, including common terms such as "taper", "axle box" or "insulated". Choosing a result
scrolls to it and highlights it; if nothing matches, the visitor can send the search text to the enquiry form.

## Enquiry form

The form validates on the client: required fields, email format, a phone number of 10 to 13 digits, and a minimum
message length. It shows inline errors, moves focus to the first invalid field, and announces a summary to screen
readers. Every "Enquire" link pre-selects the matching bearing, solution or technology.

**Submissions go to WhatsApp.** A valid submission opens a WhatsApp chat with +91 96325 56494 in a new tab, with
every field already written into the message; the visitor presses Send in WhatsApp to deliver it. On phones this
opens the WhatsApp app, on computers WhatsApp Web or the desktop app. If the browser blocks the new tab, the
confirmation panel offers an "Open WhatsApp" button instead. The message format is set by `enquiryMessage()` in
`src/lib/enquiry.ts`.

## Motion

- One page-load sequence in the hero (text, drawing-sheet border, photo, detail view)
- Scroll reveals on sections and staggered grids, once per element
- Animated filter pill and card reflow in Bearing Products; animated tab indicator and panel transitions in Solutions
- Rotating bearings: the inner ring turns at shaft speed and the ball set at about 0.4×, like a real bearing's cage
- `prefers-reduced-motion` turns off movement, rotation and smooth scrolling (content still appears)

## Accessibility and performance

- Semantic landmarks, one `h1`, ordered headings, skip link, visible keyboard focus
- ARIA combobox search, tab pattern for sectors (arrow keys, Home, End), disclosure-pattern menus
- The mobile menu makes the page `inert` and returns focus on close
- Colour contrast meets WCAG AA, including WhatsApp green text (`#15803d`, 5.0:1)
- Responsive WebP images with `srcset`, lazy loading below the fold, a preloaded hero image, and a 1200×630 OG image

Lighthouse on the production build (25 October 2026): desktop 100 for Performance, Accessibility, Best Practices
and SEO; mobile Performance 90, Accessibility 100, Best Practices 100, SEO 100.

## Image sources

- **Logo** is the supplied Sarga Bharath Industries artwork, cut into a header lockup, the full logo (footer, and PNG
  for structured data) and the monogram (hero). The favicon, Apple touch icon and `og-image.jpg` use the same
  artwork. The cut-outs are for white or very light backgrounds, since the white stripe of the swoosh is transparent.
- **Bearing drawings** are original SVG illustrations (`BearingSectionDrawing`, `BearingSpinner`).
- **Photographs** are from Unsplash, used under the [Unsplash License](https://unsplash.com/license), which allows
  free commercial use without attribution. They are listed here for traceability:

| File prefix             | Source                                  |
| ----------------------- | --------------------------------------- |
| hero-tapered-bearing    | https://unsplash.com/photos/Ww-KZ1lOxM8 |
| about-bearing-housing   | https://unsplash.com/photos/hTfSNWFCnjk |
| auto-wheel-hub          | https://unsplash.com/photos/EpT-ZetoKm8 |
| auto-two-wheeler        | https://unsplash.com/photos/IJfpVYlRv5I |
| auto-commercial-vehicle | https://unsplash.com/photos/6uQIlR9vnDI |
| auto-tractor            | https://unsplash.com/photos/unZZmYZqXLY |
| auto-electric-vehicle   | https://unsplash.com/photos/lGrYPbLF4p4 |
| ind-electric-motor      | https://unsplash.com/photos/W_V16LUnHYo |
| ind-conveyor            | https://unsplash.com/photos/qCB_-fzt35s |
| ind-heavy-duty          | https://unsplash.com/photos/bWFcqGQMtv4 |
| ind-gearbox             | https://unsplash.com/photos/uRnWbdawNLo |
| rail-vande-bharat       | https://unsplash.com/photos/2b66lz7RJnI |
| rail-axle-box           | https://unsplash.com/photos/CfSE-yO-0bQ |
| rail-wheelset           | https://unsplash.com/photos/qLCM3T2I0Ks |
| rail-freight            | https://unsplash.com/photos/PJUbLL5g9BY |

To replace a photo, export WebP files at the same widths with the same `<name>-<width>.webp` names into
`public/images/photos/`.
