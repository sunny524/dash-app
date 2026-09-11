# EasyEat — Product Requirements

## Overview
EasyEat is a mobile food-only ordering app prototype for the Malaysian market, inspired by Grab's clean, card-based visual language. It is a **static high-fidelity screen set** covering four core flows: Delivery, QR Dine-in, Pickup, and Table Booking.

## Scope
- Mobile-first, iOS-style device frame
- High-fidelity static screens with mock data (no backend, no real integrations)
- Grab-inspired UX: rounded cards, pill buttons, filter chips, service tile grid, bold green (#00B14F) accent
- Malaysian restaurant names and food imagery via Unsplash

## Delivered Screens (22 total)

### Onboarding
- **/** — Splash / phone OTP login (with OTP verify state)
- **/location** — Location permission + saved addresses picker

### Tabs (Home, Orders, Bookings, Account)
- **/(tabs)/home** — Search, 4 service tiles, promo carousel, cuisine chips, restaurants near you
- **/(tabs)/orders** — Tabbed history (All / Delivery / Dine-in / Pickup) + live order banner
- **/(tabs)/bookings** — Upcoming/Past reservations with add-to-calendar & cancel actions
- **/(tabs)/account** — Profile, EasyPoints reward banner, settings list

### Delivery
- **/delivery/restaurants** — Restaurant list with filter chips
- **/delivery/restaurant/[id]** — Restaurant detail with parallax hero + menu categories
- **/delivery/item** — Menu item with spice level, add-ons, quantity stepper
- **/delivery/cart** — Cart + address + delivery time + payment + promo + summary
- **/delivery/tracking** — Live map + rider card + status stepper

### QR Dine-in
- **/dine-in/scanner** — QR scanner viewfinder + manual code entry
- **/dine-in/menu** — Table-aware menu grid + Call Waiter FAB + View Tab CTA
- **/dine-in/bill** — Bill breakdown + split bill toggle + payment methods

### Pickup
- **/pickup/restaurants** — Pickup-only restaurant list
- **/pickup/status** — Big order number card + progress stepper + directions

### Table Booking
- **/booking/restaurants** — Booking-enabled restaurant list
- **/booking/book** — Date ribbon, time slot grid, party size stepper, special requests
- **/booking/confirmation** — Success hero + booking card + add-to-calendar actions

## Reusable Components
- `RestaurantCard` — used in all 4 flows (photo, cuisines, rating badge, ETA, distance, review count)
- `ServiceTile` — 4 home tiles
- `FilterChipRow` — horizontal, non-wrapping, sticky-ready
- `StatusStepper` — vertical stepper for tracking + pickup status
- `PillButton` / `StickyCTA` — pill-shaped primary CTAs anchored at bottom
- `ScreenHeader` — safe-area aware sticky header with back button

## Design Tokens (`src/theme.ts`)
- Primary brand: **#00B14F** (Grab-style green)
- Surface: #FFFFFF, secondary #F5F6F8
- Pill radius 999, card radius 20, medium radius 12
- Spacing scale 4/8/12/16/24/32/48

## Not in scope
- Backend / API / auth (all mocked, screens are non-functional beyond navigation)
- Ride-hailing, groceries, parcels
- Payment integrations (Stripe/DuitNow shown as UI mocks only)
