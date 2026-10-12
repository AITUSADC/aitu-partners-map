# AITU Partners

A polished, fullscreen student benefits explorer for Astana, Kazakhstan. Built as a frontend MVP with a custom midnight-blue Mapbox style, an AITU campus hub, partner markers, combined search and category filters, offer cards, and a responsive mobile bottom sheet.

**All 12 businesses and offers are fictional demonstration data. Addresses and coordinates are approximate. No actual partnership or redeemable discount is implied.**

## Stack

- Next.js 16 (App Router), React 19, strict TypeScript
- Tailwind CSS 4 with a custom component stylesheet
- Mapbox GL JS 3 with a custom vector style
- Lucide React icons and locally bundled Manrope font
- Subtle CSS transitions, with reduced-motion support
- Local TypeScript data; no backend, authentication, or external database

## Run locally

Use Node.js 22.13 or newer and npm.

```bash
npm install
```

Create `.env.local` in the project root (copy `.env.example`) and add a **public** Mapbox access token:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

Get your token from your [Mapbox account](https://account.mapbox.com/access-tokens/). Use a public token with access to Mapbox styles, vector tiles, and fonts. If you add URL restrictions, include your development and production origins. Never put a secret Mapbox token in a `NEXT_PUBLIC_` variable; public variables are sent to the browser.

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). Restart the server after changing `.env.local`. For deployment, set the token **before building**, since Next.js bundles public variables at build time.

Without a token, the interface displays **“Mapbox token required”** and a clearly labeled, locally drawn schematic preview. Search, filters, marker selection, details, preview panning, and zoom controls remain usable. The preview is illustrative, not a geographic map or navigation service. A valid token enables the actual Astana vector map, camera fly-to, map gestures, attribution, and the selected partner connection line. Invalid credentials, unavailable WebGL, and map connection timeouts show a designed recovery state with a retry button.

## Interaction

- Search by partner name, and combine the query with any category.
- Select a list item or marker to open an offer. On the live map, the camera flies to the partner.
- Open **View offer details** to read the description, sample terms, and location.
- Close the card, press Escape, or use reset view to clear selection.
- Use + / −, **Go to AITU**, and **Reset map view** in the lower right.
- On mobile, drag the handle or title up/down to expand or collapse the discovery sheet. It follows your finger and settles into position on release; tapping or using the chevron also works. The partner list scrolls independently, and categories scroll horizontally.
- Press `/` to focus partner search.
- The Digital Committee logo opens [the committee's Telegram](https://t.me/aitu_digital_committee), and **Связаться с ТП** opens [support](https://t.me/Akend0), both in a new tab.
- **How it works** opens the student guide. No sign-in is required.
- On mobile, the Digital Committee logo stays in the header beside the menu button. The menu contains **Explore partners**, **How it works**, and **Связаться с ТП**. Explore opens the discovery panel and focuses search.

## Structure

```text
src/
  app/                   # Server-rendered route/layout, metadata, global styles
  components/
    PartnersExplorer.tsx # Client state, filters, selection, mobile sheet
    layout/              # Header, branding, sidebar, student guide
    map/                 # Mapbox lifecycle/style, HTML markers, controls, preview
    partners/            # Filters, list, selected card, offer details
    ui/                  # Accessible native dialog
  data/partners.ts        # The partner dataset, AITU location, initial camera
  lib/partners.ts         # Pure filtering and straight-line distance helpers
  types/partner.ts        # Partner and category contracts
tests/                   # Filtering and dataset integrity checks
```

## Replace demo data

Edit **`src/data/partners.ts`** to add or replace partners. The `Partner` interface in **`src/types/partner.ts`** documents the required fields. Every partner needs a unique ID, one of the six categories, a benefit, description, terms, and location. Use verified latitude/longitude and permission to advertise real offers. The two extra fields `offerLabel` and `terms` power the short benefit label and details dialog. An optional `logo` field is reserved for future brand imagery; this MVP uses category icons consistently.

Category labels, colors, and icons live in `src/components/partners/categories.ts`. Map colors and vector layers live in `src/components/map/map-style.ts`. The default view is in `src/data/partners.ts`.

### AITU buildings

The three campus points live in **`src/data/campuses.ts`**, separately from sample partners:

- Main building: EXPO block C1, Mangilik El 55/11.
- MVC: EXPO International Exhibition Center, Mangilik El 53/1; used for some classes, as specified by the project owner.
- Korkem: Turkistan 14A/1, near the Botanical Garden; address confirmed by the project owner.

They stay visible when partner search or category filters change. Select a campus marker or use the campus selector to focus the camera. Partner distances and the selected connection line use the currently selected campus. Reset restores the city view while keeping that campus selected. The three campus points are not counted as discount partners.

Coordinates identify buildings approximately, not classroom entrances. C1 address source: [AITU contacts](https://astanait.edu.kz/ru/contacts). MVC point: [EXPO venue listing](https://2gis.kz/astana/geo/70030076894676907). Korkem building coordinates: [Turkistan 14A/1](https://yandex.kz/maps/ru/163/astana/house/turkistan_koshesi_14a_1/Y0gYcgVlTkEHQFtrfX1xdnpmYQ%3D%3D/). Update the campus data if an entrance needs a more precise pin.

To connect a backend later, fetch records in the server page and pass typed data into `PartnersExplorer`, or replace the local import with a fetching hook. Keep the `Partner` contract and existing filter/selection components. Add loading, validation, and error handling at that boundary; no UI rewrite is required. Authentication and administration can be added separately when needed.

## Validation and production

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

The app cleans up Mapbox instances and markers on unmount and does not recreate the map when search or selection changes. It uses native buttons and dialogs, keyboard focus indicators, live result counts, and reduced-motion support. Mapbox branding and attribution remain visible on the live map.

Live tiles, fonts, and map interactions require a valid Mapbox token, network access, and WebGL. Partner distances are approximate straight-line distances, not walking or driving routes. There is no backend, account system, redemption, payment, or routing service in this MVP.

Implementation references: [Next.js App Router](https://nextjs.org/docs/app/getting-started/installation), [Mapbox Map API](https://docs.mapbox.com/mapbox-gl-js/api/map/).
