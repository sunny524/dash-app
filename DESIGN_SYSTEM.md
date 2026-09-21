# Dash — Design System for Developer / Figma

> A Figma **file** cannot be generated as a binary here, but this document is the complete design system a developer can drop straight into a new Figma file using local styles, variables and auto-layout. Paste the colour hex codes into Figma → **Local Variables** → *color* collection, and the type scale into **Local Text Styles**. Everything below is the exact source of truth for the production React Native app under `/app/frontend`.

---

## 1. Brand

| Item | Value |
| --- | --- |
| App name | **Dash** |
| Tagline | *Food, delivered fast.* |
| Wordmark | Plus Jakarta Sans ExtraBold, letter-spacing −1, tracking optical |
| App icon | White plate + fork/knife glyph on `#E23744` background, 20 radius mask |

---

## 2. Color tokens (paste into Figma → Local Variables → *color*)

### Surfaces
| Token | Hex | Use |
| --- | --- | --- |
| `surface` | #FFFFFF | screen canvas |
| `onSurface` | #1A1A1A | primary text |
| `surfaceSecondary` | #F7F7F8 | cards, list rows |
| `onSurfaceSecondary` | #3A3A3C | text on cards |
| `surfaceTertiary` | #EDEDEF | inputs, chips |
| `surfaceInverse` | #1A1A1A | tooltips, snackbars |
| `muted` | #8E8E93 | captions, timestamps |

### Brand (Dash red)
| Token | Hex |
| --- | --- |
| `brandPrimary` | **#E23744** |
| `onBrandPrimary` | #FFFFFF |
| `brandSecondary` | #FDE7E9 |
| `onBrandSecondary` | #B32734 |
| `brandTertiary` | #FFF5F6 |

### Status
| Token | Hex |
| --- | --- |
| `success` | #34C759 |
| `warning` | #FF9500 |
| `error` | #FF3B30 |
| `star` | #F5A623 |

### Rider (dark mode)
| Token | Hex |
| --- | --- |
| `rider.bg` | #0B0F14 |
| `rider.bg2` | #141A21 |
| `rider.bg3` | #1D242D |
| `rider.border` | #242C36 |
| `rider.text` | #FFFFFF |
| `rider.textDim` | #9AA4B1 |
| `rider.brand` | #E23744 |
| `rider.brandDim` | #3A1519 |

---

## 3. Type scale (Figma → Local Text Styles)

Family: **Plus Jakarta Sans** (fallbacks: SF Pro Text, Roboto).

| Style | Size / Weight | Use |
| --- | --- | --- |
| Hero | 44 / 800 | Big money on Rewards + Earnings |
| H1 | 34 / 800 | Splash headline |
| H2 | 24 / 800 | Screen title |
| H3 | 20 / 800 | Section title |
| Title Lg | 18 / 700 | Menu item name (detail) |
| Title | 16 / 800 | Card title / row title |
| Body Lg | 15 / 600 | CTA labels |
| Body | 14 / 500 | Body copy |
| Small | 12 / 500 | Meta info |
| Caption | 10 / 700 | Tags / letterspaced labels |

---

## 4. Grid, spacing, radius

- **Spacing scale**: 4 · 8 · 12 · 16 · 24 · 32 · 48. Use `lg = 16` for horizontal screen padding.
- **Corner radius**: `sm 6`, `md 12`, `lg 20`, `pill 999`.
- **Shadow (elevated card)**: `y+4 · blur 12 · #0F172A @ 6% opacity`.
- **Sticky bottom CTA shadow**: `y-4 · blur 20 · #0F172A @ 12%`.

---

## 5. Component specs

### 5.1 Restaurant Card (regular)
- Width: full · height auto · radius 20 · shadow card · overflow hidden
- Image 100% × 140, gradient scrim 40px transparent → 12% black at bottom
- Promo pill top-left (#E23744, 10pt / 4pt padding, white text 11 ExtraBold)
- Favourite circle top-right (32 × 32, white 95%, heart-outline icon)
- Body padding 12/10 · Title 15 ExtraBold · Rating pill inline right (#FFF5F6, star + 11 Bold)
- Cuisines: `Malay • Halal • Local · $` — 12 muted
- Meta row: clock icon + `20 min` · dot · location icon + `0.8 km` · dot · chat icon + `1240+`

### 5.2 Restaurant Card (compact list)
- Row 88 tall · radius 20 · shadow card · padding 8, gap 12
- Thumb 76 × 76 · radius 12
- Same title + rating on the right · cuisines below · meta row (ETA · km · promo text)

### 5.3 Service Tile (Home 2×2)
- Aspect 1.15 · radius 20 · background `brandTertiary` (#FFF5F6) · border `border`
- Icon container 40 × 40, radius 12, white background · icon `brandPrimary` 24
- Optional badge pill top-right (`brandPrimary` bg, white 10 ExtraBold)
- Label 14 ExtraBold · subtitle 11 muted

### 5.4 Filter Chip Row
- Row height 56 · horizontal scroll · gap 8 · padding-h 16
- Chip: **36 tall** · pill · icon 14 + label 13 Bold · `flexShrink: 0`
- Idle: white bg / border `border` / text `onSurfaceSecondary`
- Selected: bg `brandPrimary` / border `brandPrimary` / text white
- Selected chip must never change size or padding — only colour.

### 5.5 Pill Button
- Height 46-52 · pill radius · label 15 ExtraBold · icon 16 optional
- Primary: `brandPrimary` bg · white text
- Secondary: `brandSecondary` bg · `onBrandSecondary` text
- Ghost: transparent · `brandPrimary` 1.5pt outline · `brandPrimary` text

### 5.6 Status Stepper (vertical)
- 32px circle marker, connected by 2pt vertical line
- Done: filled `brandPrimary` with white check
- Active: 2px `brandTertiary` ring + filled circle
- Pending: `surfaceTertiary` fill · muted icon

### 5.7 Bottom Nav (Tabs)
- Height 49 + safe area · white surface · 1pt top border `border`
- Active tint `brandPrimary` · inactive `muted`
- Label 11 SemiBold under 24pt icon

### 5.8 Sticky CTA
- Bottom docked · padding 16 horizontal, 12 top, safe area bottom
- White bg · 1pt top border `border` · optional sticky shadow above
- Uses `KeyboardStickyView` so it rides above the keyboard

### 5.9 Search Bar (Home / Delivery list)
- Height 42 · pill · `surfaceSecondary` bg
- Search icon 16 muted, TextInput 14 onSurface, right cluster: `|` divider + options icon (idle) OR `close-circle` (typing)

### 5.10 Stat Tile (Account · Earnings · Rewards)
- Card `surfaceSecondary` · radius 12 · padding 12
- Value 18-20 ExtraBold onSurface · label 10-11 muted

---

## 6. Screen inventory (Figma frames to create)

### Customer app (light, `#E23744` brand)
1. `01 Splash / Phone` — brand hero + phone input + social row
2. `02 OTP Verify` — 4 digit boxes, auto-advance
3. `03 Location` — map hero + saved addresses + sticky CTA
4. `04 Home` — deliver-to header, search, 4 service tiles, promo carousel, cuisine chips, restaurant list
5. `05 Delivery List` — search + filter chips + list · empty state
6. `06 Restaurant Detail` — parallax hero, info card, promo, category chips, menu list with add-buttons, sticky View Cart
7. `07 Reviews` — 4.8★ hero, 5-bar breakdown, tag cloud, filter chips, review cards with photos
8. `08 Item Detail` — hero, radios (spice), checkboxes (add-ons), special instructions, qty + Add to Cart
9. `09 Cart & Checkout` — deliver-to, delivery time, items with steppers, promo, payment, summary, Place Order
10. `10 Order Tracking` — map + rider row + stepper + cancel
11. `11 QR Scanner` — camera viewfinder, torch + gallery, Simulate Scan
12. `12 Dine-in Menu` — table header, seated banner, grid menu, Call Waiter FAB, View Tab CTA
13. `13 Bill & Split` — items, split toggle + counter, payment methods, summary, Pay CTA
14. `14 Pickup List` — banner + list
15. `15 Pickup Status` — big red order-number card + progress + summary + notify banner
16. `16 Booking List` — banner + list
17. `17 Booking Form` — date ribbon, time grid, party stepper, requests
18. `18 Booking Confirmation` — success hero + booking card + actions
19. `19 Orders Tab` — tabs (All/Delivery/Dine-in/Pickup) + live banner + cards
20. `20 Bookings Tab` — Upcoming/Past cards
21. `21 Account Tab` — profile + reward banner + settings list
22. `22 Rewards` — dark hero, tier progress, Rewards/History tabs, quick-redeem, all rewards, "How it works"

### Rider app (dark, `#E23744` accent)
23. `R1 Rider Login`
24. `R2 Rider Home` — online/offline hero, incentives carousel, quick access, hot zones, incoming order sheet
25. `R3 Active Delivery` — map + turn-by-turn banner + stepper + chat/call/navigate actions
26. `R4 Delivery Summary` — earnings hero + tip card + rate customer + trip details
27. `R5 Jobs` — filter tabs + delivery cards
28. `R6 Earnings` — segmented control + big money + cash out + weekly bar chart + breakdown + metrics
29. `R7 Rider Account` — profile + vehicle card + metric row + switch-to-customer + settings

---

## 7. Motion & interaction rules

- All screen transitions: iOS-style `slide_from_right`, 300 ms ease-out.
- Modal & bottom-sheet: 350 ms spring, damping 20.
- Chip / button press: scale 0.97, 120 ms.
- Keyboard: content auto-scrolls above the input using `KeyboardAwareScrollView`; sticky CTA rides up with `KeyboardStickyView`.
- Search: debounced live filter, no submit button. Clear (×) resets.
- OTP: auto-advance via `requestAnimationFrame`; backspace on empty moves back.

---

## 8. Photography guidance

- Malaysian food, top-down or 45° angle, natural light, warm tones.
- Sources: Unsplash search terms `nasi lemak`, `char kway teow`, `satay`, `dim sum`, `roti canai`, `laksa`, `teh tarik`.
- Every full-width photo needs a bottom gradient scrim (`transparent → rgba(0,0,0,0.12–0.7)`) so overlaid text stays legible.

---

## 9. Recreating this in Figma — 4-step recipe

1. **File setup**: iPhone 15 Pro frame (393 × 852), 4-column layout, 16 px side gutter, 12 col opt.
2. **Variables**: paste the tokens from Section 2 into `color` collection · Section 4 into `number` collection (spacing/radius).
3. **Text styles**: add every row from Section 3 as a text style, all bound to Plus Jakarta Sans.
4. **Component library**: build the components from Section 5 as auto-layout, then compose the 29 screens listed in Section 6. Every colour, radius and spacing already has a variable so instances re-theme in seconds.

Once the file is set up, share the public link with the team; the RN codebase under `/app/frontend` will match 1:1 because it consumes the same tokens.
