# Dash — Product Requirements

## Overview
**Dash** is a mobile food-ordering + delivery prototype for the Malaysian market, covering both the customer experience (delivery, dine-in QR, pickup, table booking, rewards) and the rider (driver) experience. Rebranded from EasyEat to a red-and-white identity.

## Brand
- Name: **Dash**
- Primary: `#E23744` (Dash red)
- Surface: `#FFFFFF`
- Full design system spec: `/app/DESIGN_SYSTEM.md` (Figma-ready)

## Delivered Screens (35+)

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
- Customer places order at `/delivery/cart` → tracks at `/delivery/tracking` and immediately sees a dark **Live toast**: "Farhan accepted your order — he'll be at Nasi Lemak Village in 4 min" (LIVE badge, auto-dismisses after 4s)
- Rider sees the SAME order (Nasi Lemak Village, RM 34.40, 3 items) as an incoming request card on `/rider/(tabs)/home` with 15-second timer
- Rider taps **Accept Delivery** → `/rider/active` with full delivery flow · **Chat** button opens `/rider/chat`

## Rider Chat
- Dark chat screen at `/rider/chat` with system message, red "me" bubbles + white "them" bubbles, message grouping, seen indicator, order pill at top
- **Quick reply chips row** ("I'm on the way", "I've arrived at the restaurant", "Picking up your order now", "I'm 5 min away", "I'm at your door", "Can you come down please?") — tap to send instantly
- Keyboard-aware composer with camera + send buttons, disabled state when empty
- Call icon in header

## Merchant Portal
- `/merchant` login (email + password) with red hero and "Switch to Customer" chip
- `/merchant/(tabs)/orders` — Kitchen order queue with left-border status colour, KPI strip (New / Preparing / Ready / Today), filter chips, and progressive CTAs: **Accept & start preparing → Mark as Ready → Hand off**. Customer notes (e.g. "Extra sambal, no peanuts") highlighted in amber. Auto-accept toggle in header.
- `/merchant/(tabs)/revenue` — Red hero with Day/Week/Month, hourly bar chart with peak marker, top items with progress bars, pending payout card
- `/merchant/(tabs)/menu` — Search + in-stock/low/out-of-stock toggle per item + per-item sold count + Edit/Photo/Discount actions
- `/merchant/(tabs)/account` — Restaurant profile, Open/Closed toggle, metrics, switch back to Customer, settings (Opening hours, Payout, Promotions, Printer/POS, etc.)

## Voucher Wallet
- `/vouchers` — ticket-style cards (perforated cut-out edges + coloured gradient top), Active / Used tabs with counts, tap to expand → QR code + centered code + Copy code + **Use now** CTA (deep-links to cart)
- Empty state redirects to `/rewards`

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
