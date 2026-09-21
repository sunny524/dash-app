# Dash — Product Requirements

## Overview
**Dash** is a mobile food-ordering + delivery prototype for the Malaysian market, covering both the customer experience (delivery, dine-in QR, pickup, table booking, rewards) and the rider (driver) experience. Rebranded from EasyEat to a red-and-white identity.

## Brand
- Name: **Dash**
- Primary: `#E23744` (Dash red)
- Surface: `#FFFFFF`
- Full design system spec: `/app/DESIGN_SYSTEM.md` (Figma-ready)

## Delivered Screens (30+)

### Customer app (light, `#E23744` accent)
- **/** Splash + phone OTP
- **/location** Location permission + saved addresses
- **/(tabs)/home** — Search, service tiles, promo carousel, cuisine chips, restaurants
- **/(tabs)/orders** — Tabbed history + live order banner
- **/(tabs)/bookings** — Upcoming/Past reservations
- **/(tabs)/account** — Profile, DashPoints banner, Sign in as Rider entry, settings
- **/delivery/restaurants** — Filter chips + live search + empty state
- **/delivery/restaurant/[id]** — Parallax hero + menu
- **/delivery/reviews** — 4.8★ hero, breakdown, tag cloud, filters
- **/delivery/item** — Customization + qty + KeyboardStickyView CTA
- **/delivery/cart** — Address, delivery time, promo, payment, summary
- **/delivery/tracking** — Map + rider card + stepper
- **/dine-in/scanner** — QR viewfinder
- **/dine-in/menu** — Table-aware menu + Call Waiter FAB
- **/dine-in/bill** — Split bill + payment methods
- **/pickup/restaurants** — Pickup list
- **/pickup/status** — Big order number card + stepper
- **/booking/restaurants**, **/booking/book**, **/booking/confirmation**
- **/rewards** — DashPoints hub with Rewards / History tabs

### Rider app (dark, `#E23744` accent)
- **/rider** Login
- **/rider/(tabs)/home** — Online/Offline hero, incentives, hot zones, incoming order request sheet with 15s timer, accept/decline
- **/rider/active** — Map + turn-by-turn banner + 4-step delivery stepper (Head to restaurant → Pickup → Head to customer → Deliver) + Chat/Call/Navigate + customer note
- **/rider/summary** — Delivery complete + earnings breakdown + rate customer + trip details + continue riding CTA
- **/rider/(tabs)/jobs** — Job history with filter tabs
- **/rider/(tabs)/earnings** — Day/Week/Month segmented control + weekly bar chart + breakdown + acceptance/completion metrics + cash out
- **/rider/(tabs)/account** — Rider profile + vehicle + metrics + switch back to customer + settings

## Customer → Rider handoff (as requested)
- Customer places order at `/delivery/cart` → tracks at `/delivery/tracking`
- Rider sees the SAME order (Nasi Lemak Village, RM 34.40, 3 items) come in as an incoming request card on `/rider/(tabs)/home`
- Rider taps **Accept Delivery** → assigned to `/rider/active` with full delivery flow

## Design deliverables
- Live theme tokens in `/app/frontend/src/theme.ts`
- Figma-ready design system: `/app/DESIGN_SYSTEM.md`
- Colours mirrored in `/app/design_guidelines.json`

## Interactions (working prototype)
- Live search on Home + Delivery list (name / cuisine / address)
- Filter chips with real filtering (Top Rated, Under 25 min, Promo, $, Halal, cuisines)
- Redeemable rewards with claimed state
- OTP auto-advance with backspace-back
- KeyboardAware forms + sticky CTAs above keyboard
- Rider online toggle triggers a mock incoming order after 800 ms with a 15-second countdown, red urgency at 5s
- 4-step active delivery advances stage-by-stage
- Rate customer 1-5 stars on summary
- Weekly earnings bar chart with today highlight
