---
name: Crealia — Five editorial storefronts
description: Five fictional local businesses with shared controls and distinct editorial identities
colors:
  default-bg: "#f4f1eb"
  default-ink: "#252d27"
  default-surface: "#e7e8df"
  default-accent: "#28483b"
  white: "#fff"
  disclosure: "#171b19"
  distrito-bg: "#17221f"
  distrito-ink: "#e3e2da"
  distrito-surface: "#25342e"
  distrito-accent: "#c6d2a6"
  forma-bg: "#f3f1ed"
  forma-ink: "#29241f"
  forma-surface: "#e8e3db"
  forma-accent: "#913c30"
  brasa-bg: "#f7f2df"
  brasa-ink: "#191919"
  brasa-surface: "#ffdf5a"
  brasa-accent: "#e94432"
  miga-bg: "#eeede4"
  miga-ink: "#343d2d"
  miga-surface: "#dfe2d1"
  miga-accent: "#425037"
  aura-bg: "#f0eae7"
  aura-ink: "#443a36"
  aura-surface: "#e4d9d4"
  aura-accent: "#695448"
typography:
  display:
    fontFamily: "Editorial, Georgia, serif"
    fontSize: "clamp(60px, 7.2vw, 112px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Editorial, Georgia, serif"
    fontSize: "clamp(38px, 4.5vw, 70px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-.035em"
  brasa-display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(60px, 7.3vw, 112px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-.04em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.025em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "15px"
rounded:
  control: "0"
spacing:
  gutter: "clamp(22px, 5vw, 80px)"
  section: "130px"
  section-tablet: "90px"
  section-mobile: "80px"
  form-gap: "22px"
components:
  button-primary:
    backgroundColor: "{colors.default-accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "15px 24px"
  button-text:
    padding: "14px 0"
  select:
    backgroundColor: "{colors.default-bg}"
    textColor: "{colors.default-ink}"
    rounded: "{rounded.control}"
    padding: "15px"
  chip:
    backgroundColor: "{colors.default-surface}"
    padding: "12px 24px"
  booking:
    backgroundColor: "{colors.default-surface}"
    padding: "36px"
---
# Design System: Crealia — Five editorial storefronts

## Overview

**Creative North Star: "Five editorial storefronts"**

Five fictional businesses share clear controls and a visible Crealia connection while keeping their own palette, photographic composition and voice. This scoped system records the implemented world in `demo.css` and `demo.js`; it does not replace the root Crealia design system.

The approved direction uses large type, uneven photographic pairs and generous space around practical interactions. Distrito is precise and dark, Forma is a fashion lookbook, Brasa is bold and appetizing, Miga is relaxed, and Aura is calm. These are illustrative concepts, never client evidence.

**Key Characteristics:**
- Distinct brand palettes over a common semantic theme.
- Editorial photography with unequal image sizes.
- One useful simulation per business.
- Visible content before animation or JavaScript.

## Colors

Each page assigns its background, ink, surface, accent and on-accent through body-level custom properties. The default palette also serves the credits page. Frontmatter values are extracted from the stylesheet, not proposed replacements.

### Primary

Distrito uses a pale olive action over green-black; Forma uses rust; Brasa uses deep red across its hero and actions; Miga uses foliage green; Aura uses warm brown. Their matching `*-accent` entries are the primary colors. Actions use white text except Distrito, which uses its background as on-accent.

### Neutral

The `*-bg`, `*-ink` and `*-surface` families define canvas, reading text and form/menu surfaces. The disclosure bar is consistently dark with white text. Selected collection and coffee controls invert the current ink/background pair.

**The Theme Rule.** Resolve shared controls through the current page's semantic custom properties; do not carry a different business's palette into a control.

## Typography

Two main font systems are implemented: Zodiak (locally aliased as `Editorial`) with Inter for Distrito, Forma, Miga and Aura; Poppins with Inter for Brasa. Distrito uses its Editorial display family at weight 400 for its header wordmark. Inter handles body copy, controls and most product titles.

Zodiak is supplied by Indian Type Foundry through Fontshare. Local file: `assets/editorial.woff2`; attribution/license reference: [ITF Free Font License](https://www.fontshare.com/licenses/itf-ffl). The alias in CSS is not the font's public family name. Inter and Poppins reuse the root local font assets.

Display and headline roles share compact leading and negative tracking. Per-brand hero sizes override the base display role: Distrito up to 134px, Forma up to 108px, Aura up to 130px. Service titles use Editorial, while Brasa headings use Poppins 700. Body paragraphs are capped at 54ch; hero copy at 34ch. Hero paragraphs are 18px, including the final mobile override.

## Layout

The shared gutter is fluid; sections have a generous vertical rhythm. The body is capped at 1920px when the viewport is at least 1700px wide. Shared heroes use two columns, but Forma and Aura put split copy above unequal photographic pairs. Brasa's hero is full bleed. Miga offsets a short pastry photograph beside a taller coffee image.

At 1050px and below, gaps and imagery shrink, secondary header actions disappear, and appointment slots use two columns. At 650px and below, most content grids become one column, paired editorial images remain paired, the middle navigation link disappears, and slots return to four columns. All sections remain reachable through document flow. Mobile primary controls are at least 52px high; filters are 48px and removal controls 44px.

The homepage integration lives outside this folder in `demo-showcase.css` and `demo-showcase.js`. Its five doors use perspective (1400px), with explicit previous/next controls, arrow-key handling, horizontal dragging and ordinary direct links. Its breakpoints are 800px and 560px. This is a scoped integration with the root brand, not a replacement for its layout tokens.

## Elevation & Depth

The demo pages use no box shadows. Depth comes from tonal surfaces, image crops, asymmetry and photographic scale. The homepage showroom creates depth through 3D transforms, angle and opacity. Hovering an action raises it slightly; pressing it scales it down.

Hero images drift slowly over 15–18 seconds. One-time entrance animations run for 0.8 seconds when IntersectionObserver is available; content starts visible. Service rows and experience headings use opacity-only entry. Reduced-motion preferences disable demo animation, transitions and smooth scrolling; the showroom disables its transitions.

## Shapes

Square controls and rectangular photo crops define the demos. Inputs and primary actions explicitly use zero radius; surface grouping replaces decorative borders. The homepage's circular 50px arrow controls belong to its own integration shell.

## Components

Primary actions use the current accent/on-accent, minimum desktop height 56px and a 32px icon gap. Hover moves them upward 3px and reduces opacity; active scales to 0.97. Text actions have a 48px minimum height and move their arrow on hover. Focus-visible outlines use the page accent at 3px with a 5px offset.

Navigation uses native section anchors with an animated underline on hover. Each page has a skip link, a demo toolbar, a copy-link control and a footer returning to Crealia. Copying strips the hash; a clipboard failure inserts a selected text field for manual copying. Status toasts dismiss after 3.5 seconds.

Service rows and booking panels sit on theme surfaces. Booking uses labeled native selects and radio inputs, with visible selected and focus states. Distrito and Aura produce an inline selection summary that explicitly says no appointment was booked.

Forma filters use `aria-pressed` and the native hidden attribute, with size/color selects per product. Forma and Brasa keep a temporary in-memory basket: equal product/variant entries accumulate quantity; removal subtracts one unit. Totals use es-UY currency formatting. Summary actions show a nontransactional result; nothing is purchased or sent.

Miga's three pressed-state choices replace an inline coffee/pastry recommendation and price. Outputs and toast feedback are polite live regions. Each closing Crealia action opens a WhatsApp draft identifying the demo; the visitor sends it themselves.

## Do's and Don'ts

- Do preserve each page's semantic theme and editorial composition.
- Do keep direct links, native controls, visible focus and reduced-motion support.
- Do identify all concepts, prices, products and appointment times as illustrative.
- Don't describe these demos as commissioned client work.
- Don't imply that a basket summary or appointment selection completes a transaction.
- Don't propagate this scoped demo world into root design artifacts without a separate task.

## User-directed expressive revision
Brasa is explicitly neobrutalist: yellow #ffdf5a, tomato #e94432, ink #191919, 3px solid borders, 6px 6px 0 #191919 shadows. Hover translates 4px toward its shadow; pressed translates 6px. This intentionally supersedes no-shadow/no-outline house rules for Brasa only. Source: expressive.css.

Forma mounts the actual React Bits CircularCarousel in a local React island: cylinder, assemble entrance, draggable with momentum and snapping, keyboard arrows, no autoplay. Aura mounts original AccordionGallery with GSAP: horizontal desktop, vertical 480px mobile; active panel gets 55% of space. Hover/focus/touch selection, inactive labels hidden. Original licenses live in components. Shared markup remains static HTML.

Entrance motion is concentrated in hero elements and editorial photographs. Blanket headings, product, menu and form reveals were removed following finish review. Reduced-motion support remains.
