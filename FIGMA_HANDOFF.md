# Dash — Figma Handoff

## Why there's no `.fig` file
Figma binary files (`.fig`) are proprietary and can only be authored inside the Figma desktop / web app. They can't be generated from code. Instead, here is a **complete, drop-in Figma library** you can rebuild in ~5 minutes using free plugins.

---

## What's in this folder for your Figma designer

| File | Purpose |
| --- | --- |
| `/app/dash-design-tokens.json` | **All colours, spacing, radius, shadows, typography** in the Tokens Studio v2 format. Imports directly into Figma using the free *Tokens Studio for Figma* plugin. |
| `/app/DESIGN_SYSTEM.md` | Human-readable design spec — the 29 screens, every component (Restaurant Card, Service Tile, Filter Chip, Status Stepper, Sticky CTA, etc.), motion rules and photography guidance. |
| `/app/design_guidelines.json` | Machine-readable summary (same tokens, condensed). |
| `/app/assets/dash-logo.svg` | Vector logo — paste into Figma directly. |
| `/app/frontend/src/theme.ts` | Live source of truth used by the RN app. Any change in Figma should be mirrored here. |

---

## 5-step Figma recipe (share this with the designer)

1. **Create a new Figma file** called `Dash — Design System`. Frame preset: iPhone 15 Pro (393 × 852).
2. **Install the plugin** *Tokens Studio for Figma* → open plugin → *Tools ▸ Load from file* → pick `dash-design-tokens.json` → *Apply to document*. You now have every colour, spacing, radius, shadow and text style as a Figma variable / style.
3. **Set the Themes**: in the plugin's *Themes* tab, switch between **Dash Customer (Light)** and **Dash Rider (Dark)** to see instances re-theme.
4. **Add fonts**: install *Plus Jakarta Sans* (free on Google Fonts). Create text styles for each row in `DESIGN_SYSTEM.md § 3` — Hero 44/800, H1 34/800, H2 24/800, H3 20/800, Title Lg 18/700, Title 16/800, Body Lg 15/600, Body 14/500, Small 12/500, Caption 10/700.
5. **Build components** from `DESIGN_SYSTEM.md § 5` (Restaurant Card, Service Tile, Filter Chip, Pill Button, Status Stepper, Bottom Nav, Sticky CTA, Search Bar), then compose the 35 screens listed under § 6 + the four new ones below.

> Once step 4 is done, every existing screenshot in the running app becomes a colour-accurate reference — because both the RN app and the Figma file consume the same tokens.

---

## Screens to include (35 total)

Match filenames 1:1 with `/app/frontend/app/...` so devs can navigate from Figma → code.

### Customer (light, `#E23744`)
1. Splash + Phone OTP · 2. OTP Verify · 3. Location · 4. Home · 5. Delivery List · 6. Restaurant Detail · 7. Reviews · 8. Item Detail · 9. Cart & Checkout · 10. Order Tracking (with live toast) · 11. QR Scanner · 12. Dine-in Menu · 13. Bill & Split · 14. Pickup List · 15. Pickup Status · 16. Booking List · 17. Booking Form · 18. Booking Confirmation · 19. Orders Tab · 20. Bookings Tab · 21. Account Tab · 22. Rewards · **23. Voucher Wallet**

### Rider (dark, `#E23744`)
24. Rider Login · 25. Rider Home (online/offline + incoming order) · 26. Active Delivery · 27. Delivery Summary · 28. Jobs · 29. Earnings · 30. Rider Account · **31. Rider ↔ Customer Chat**

### Merchant (light, `#E23744`)
32. Merchant Login · **33. Kitchen Orders** · **34. Revenue** · **35. Menu Management** · Merchant Account

---

## What lives in the codebase already (nothing to rebuild)

- All screens above are implemented under `/app/frontend/app/*` with proper testIDs, keyboard-aware forms, sticky CTAs above the keyboard, live search, filter chips that stay put, and real toggles / claim states.
- The RN app already consumes the same tokens through `/app/frontend/src/theme.ts` — if the designer changes a token in Figma, we change the same key here and the entire app re-themes.

---

## Preview links to hand to the designer

- Splash / Home / any customer route: append the path to `EXPO_PUBLIC_BACKEND_URL` from `frontend/.env`
- QR code beside the preview panel opens the whole app in **Expo Go** on any iOS/Android phone in seconds
- Public preview URL: **https://dine-scan-order-12.preview.emergentagent.com**

Sample paths worth walking through as a Figma reference:
`/`, `/(tabs)/home`, `/delivery/reviews`, `/rewards`, `/vouchers`, `/rider`, `/rider/chat`, `/rider/active`, `/merchant`, `/merchant/(tabs)/orders`, `/merchant/(tabs)/revenue`.

---

## If you'd rather have a fully-authored Figma file

Options:
1. **Hire a designer for 4-6 hours** to run the 5 steps above — total cost usually < RM 400.
2. **Use Figma AI (currently in beta)**: create a new file, use the `dash-design-tokens.json` variables, then paste the specs from `DESIGN_SYSTEM.md` into Figma AI → "Create component library from this spec". It'll scaffold the components, ready to be polished.
3. **Anima / Locofy plugins** can *reverse-import* our RN screens as Figma frames — they will read the live app URL, take screenshots and rebuild them as auto-layout groups. That's the fastest path to a full `.fig` file that mirrors what's already running.
