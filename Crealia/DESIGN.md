---
name: Crealia
description: Creamos posibilidades digitales — an interactive showroom for local businesses.
colors:
  primary: "#00d6a8"
  primary-hover: "#4de7c5"
  deep: "#063b3a"
  background: "#071116"
  ink: "#f7faf9"
  surface: "#102127"
  muted: "#b7c7cb"
  paper: "#edeae4"
  field: "#b2f2e3"
  service-surface: "#0c4543"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(48px, 5.5vw, 88px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(38px, 4.5vw, 68px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "15px"
    fontWeight: 500
rounded:
  square: "0px"
  pill: "40px"
  chip: "30px"
spacing:
  gutter: "clamp(20px, 3.3vw, 52px)"
  section: "120px"
  section-tablet: "85px"
  section-mobile: "72px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "16px 25px"
  button-dark:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "16px 25px"
  category:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "11px 18px"
  category-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.background}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.background}"
    rounded: "{rounded.square}"
    padding: "14px 16px"
  service-accordion:
    backgroundColor: "{colors.service-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "24px"
---

# Design System: Crealia

## Overview

**Creative North Star: "A window into your next business"**

Crealia pairs a dark, spacious studio presentation with tangible miniature business websites. Emerald brings energy and warmth; Poppins headlines and Inter reading text preserve the supplied identity. The interface feels confident, approachable and useful, with photography showing the kinds of businesses it serves.

This documents the implemented static HTML, CSS and JavaScript site. The selected pinned-poster direction was adapted into a split hero with a floating mockup collage and an interactive category browser. There are no pinned scroll scenes: only the desktop showcase aside and service heading use ordinary sticky positioning. Hosting is pending; the direct code build was approved.

Review disposition: **ship**, with no material UI findings reported by the final reviewer. The handoff reports **55/55 functional tests passing**. Inspector heuristic warnings are documented in the direction brief: service accordions resemble icon cards, hidden details content can resemble an eyebrow, and miniature sites plus monumental branding require extra type scales. These are recorded exceptions, not a claim that the inspector emitted no warnings.

**Key Characteristics:**

- Dark grounds, pale text and decisive emerald actions.
- Real interface fragments and explicit fictional demonstrations.
- Pill controls against square, flat content surfaces.
- Spacious desktop composition that becomes ordinary mobile flow.

## Colors

The palette combines electric emerald with blue-black and deep green, while each fictional demo can carry its own contained palette. Frontmatter values are normative.

### Primary

- **Digital Emerald** (`primary`): primary contact actions, the moving statement band, process dots and the full inquiry section. `primary-hover` lightens primary buttons.

### Secondary

- **Deep Evergreen** (`deep`): the service section and dark-button hover state.
- **Soft Mint** (`field`): form fields against the emerald inquiry ground.

### Neutral

- **Blue Black** (`background`): main page ground, dark button fill and text on emerald.
- **Cool White** (`ink`): main text and selected category fill.
- **Night Slate** (`surface`): unselected category buttons, FAQ rows, mobile menu and selection dialog.
- **Mist Gray** (`muted`): supporting text and footer metadata.
- **Warm Paper** (`paper`): the hero's perfume browser surface.
- **Evergreen Lift** (`service-surface`): tonal separation of service disclosures.

**The Contained Worlds Rule.** Demo palettes belong inside the fictional websites; the surrounding Crealia interface retains its brand palette.

## Typography

**Display Font:** Poppins, with sans-serif fallback. **Body Font:** Inter, with sans-serif fallback. Both load from local assets.

**Character:** Medium-weight, tightly tracked Poppins makes short promises feel assured. Inter carries explanations and controls with calmer spacing. Type remains sentence case rather than relying on decorative uppercase labels.

### Hierarchy

- **Display:** the two-line hero statement; the frontmatter records its desktop baseline.
- **Headline:** section headings, with a larger contact-specific treatment.
- **Title:** component headings; service and process headings have context-specific sizes.
- **Body:** standard reading copy. Hero support increases to 18px; FAQ answers cap their measure at 65ch.
- **Label:** form labels and navigation. Notes use 13px; nested fictional interfaces intentionally use a separate miniature scale.
- **Monumental brand:** the footer word scales from 100px through 24vw to 360px, with 23vw on phones. Its final tracking is -0.04em.

**The Reading First Rule.** Preserve the final accessibility overrides: outer supporting copy is generally 16px, and notes must not inherit the miniature demo scale.

## Layout

The maximum page container is 1680px with fluid side gutters. Desktop sections use generous vertical spacing, and split compositions share a common left edge. The hero divides copy and three overlapping website mockups into two columns. A horizontal emerald statement band follows; its final implementation is unrotated to stay within the viewport.

The showcase combines wrapping category controls, one persistent browser frame and a narrow sticky explanation column. A three-image strip offers further entry points. The deep-green service section places its sticky heading beside native accordions. Four process steps form a row, followed by a split FAQ, an emerald two-column inquiry form and a monumental typographic footer.

At 1100px, spacing and previews compact. At 800px, the hero, showcase, services and FAQ become single-column, sticky support becomes static, and process steps become two columns. At 560px, gutters become 20px; the menu becomes a toggle-controlled dropdown; the contact section and process become single-column; demo text sits above a full-width image; products become stacked rows; the image strip becomes horizontal image/text pairs. Section spacing decreases through the frontmatter's tablet and mobile values. A 1800px enhancement limits hero artwork and increases the hero gap.

Content is visible by default. IntersectionObserver adds brief entrance animations only after elements enter view, without first hiding them. Reduced-motion preferences disable animations, transitions and smooth scrolling; the page remains fully readable. The hero floats gently on 7–9-second loops; the ticker runs over 35 seconds and pauses on hover. Ordinary document scrolling is preserved.

## Elevation & Depth

The page is flat by default. Dark and green tonal surfaces establish grouping; the hero's overlap and rotation establish depth without card shadows. Shadows are reserved for overlays and feedback.

### Shadow Vocabulary

- **Selection dialog:** `0 30px 100px #0008`, with a `#000b` backdrop.
- **Toast:** `0 8px 30px #0003`.
- **Mobile navigation:** `0 20px 30px #0005`.

## Shapes

Rounded pill actions and category controls contrast with square browser frames, products, accordions and form fields. Small circular process markers and browser dots repeat the brand's softer geometry. Line icons use restrained strokes. The hero collage rotates its three layers; the interactive browser remains level and easy to operate.

## Components

### Buttons

Confident pill actions use a 56px minimum height, a 24px icon gap and semibold Inter. Primary buttons carry emerald; the inquiry form uses a dark variant. Hover lifts buttons by 3px, active press scales to 0.97, and keyboard focus uses a 3px outline with 6px offset. On the emerald form, focus changes to dark for visibility. Text links offer lower-emphasis actions.

### Chips

Categories wrap naturally. Unselected controls use Night Slate and selected controls use Cool White with dark text. Selection is exposed through `aria-pressed`; catalogue filters use the same semantic state with each demo's accent. Category choice updates the business, image, catalogue, features and contextual inquiry link.

### Cards / Containers

Square surfaces stay flat. The showcase browser has a compact gray chrome bar and explicit demo labeling. Product containers use a lightened demo ground, while the gym uses a dark tonal surface. Desktop products form three columns; mobile products use compact rows. These are working examples, not client endorsements.

### Inputs / Fields

Soft-mint, square fields use a 51px minimum height and visible labels. The business name and idea have length limits; idea is marked optional. No custom error or disabled visual system is implemented. Submission composes a WhatsApp message for the visitor to send; it does not submit a purchase or reserve a service.

### Navigation

The header uses a ribbon mark, wordmark, three text links and a light contact pill. On phones, Menú controls an expandable surface with `aria-expanded`; selecting a link or pressing Escape closes it. A focusable skip link precedes the header.

### Disclosures and demonstration selection

Services and FAQ use native `details`/`summary`; the first service starts open and the plus rotates when expanded. The sample selection opens a native modal dialog with a dark backdrop, close button, removal and clear actions. A polite live-region toast confirms additions. The dialog explicitly states that purchases and reservations do not occur.

## Do's and Don'ts

### Do:

- **Do** preserve Poppins, Inter and the supplied Crealia palette.
- **Do** keep fictional-business and illustrative-price labels visible in the demos.
- **Do** keep keyboard focus obvious on dark and emerald backgrounds.
- **Do** retain ordinary mobile flow, visible content defaults and reduced-motion behavior.

### Don't:

- **Don't** describe this implementation as a pinned scrolling story.
- **Don't** present demonstrations as client work, real payments or confirmed bookings.
- **Don't** spread the demo-specific palettes into the surrounding Crealia interface.
- **Don't** shrink outer marketing copy to the miniature mockups' type scale.
