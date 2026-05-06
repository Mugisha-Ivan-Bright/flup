You are a senior frontend engineer. Build a complete, production-ready admin dashboard called "Flup" — a furniture logistics and delivery management platform.

TECH STACK
- Framework: Refine v4 (React 18 + TypeScript)
- Data provider: @refinedev/graphql (Hasura-compatible or custom GraphQL endpoint)
- Realtime: graphql-ws WebSocket link + Refine LiveProvider (@refinedev/graphql ships with one)
- UI library: Ant Design (@refinedev/antd)
- Routing: React Router v6
- State: Refine's built-in resource/data layer (no extra Redux/Zustand)
- Charts: Recharts (for dashboard)

ARCHITECTURE REQUIREMENTS
Wire the Refine <Refine> root with:
  1. dataProvider — from @refinedev/graphql pointing to HTTP endpoint (e.g. /v1/graphql)
  2. liveProvider — from @refinedev/graphql pointing to ws:// WebSocket endpoint
  3. Set liveMode="auto" on all list/show resources so inserts, updates, and deletes are reflected in realtime without manual refresh
  4. resources: [ orders, products (marketplace), tracking, customers, discounts, ledger, taxes ]

PAGES TO BUILD

1. Dashboard (/dashboard)
   - KPI stat cards: Total customers (567,899), Total revenue ($3.465M), Total orders (1.136M), Total returns (1,789) — each with a trend arrow + percent change
   - Product sales bar chart (Gross margin vs Revenue, daily, Jul 1–12)
   - Sales by product category: donut chart with legend (Living room 25%, Kids 17%, Office 13%, Bedroom 12%, Kitchen 9%, Bathroom 8%, Dining room 6%, Decor 5%, Lighting 3%, Outdoor 2%)
   - Sales by countries table: Poland 19%, Austria 15%, Spain 13%, Romania 12%, France 11%, Italy 11%, Germany 10%, Ukraine 9%
   - Time period filter in top-right

2. Marketplace (/marketplace)
   - List of 132 products in a table/card hybrid
   - Columns: thumbnail image, Display name, Item ID, Price, Material, Dimensions, Category
   - Active filter chips: ALPHAWOOD, Living room, Dining room, Bedroom (dismissible)
   - Full-text search input
   - Realtime: new products appear instantly via liveMode="auto"
   - Sample products: Time (sA26sCO5, $265, Acacia brass, Living room), Morpheus (gW27sCO7, $1965, Walnut velours brass, Bedroom), Measure (gW16sCD4, $429, Walnut brass stainless, Dining room), Earth (dP26sCO6, $1412, Walnut brass granite, Living room)

3. Tracking (/tracking)
   - 76 total deliveries; tabs: All (76), On route (34), Waiting (28), Inactive (14)
   - 2-column card grid of delivery entries
   - Each card: status dot (green = On route, blue = Waiting), tracking ID, route (City A → City B), time left, distance (km), estimated time, stop list with ZIP codes
   - Truck illustration on each card (SVG or image)
   - Search by track ID, customer, delivery status, destination
   - Filters dropdown + Time sort
   - "Add new track" CTA button
   - Realtime: card status updates live (dot color + label) via liveMode="auto"
   - Sample entries: UL-158902NH (Madrid→Malaga, 529km, 5h27m, On route), KO-158454PO (Warszawa→Kraków, 290km, 3h35m, On route), UK-568742NK (Madrid→Roma, 1959km, 20h34m, Waiting)

4. Orders (/orders) — with Edit Order panel
   - Order list with order IDs
   - Edit order drawer/modal (order DSD15879):
     * Tab 1 "Order info": customer details (Alina Carter, alina.carter@gmail.com, Italian phone (338)-123-4567), departure date Jul 16 2022 at 8PM, delivery date Jul 17 2022 at 5PM
     * Tab 2 "Route info": shipping address (France, ZIP 75016), driver section (Drew Cano, ID 2156-85-7458), route field
   - Product line items inside order: "Warm" chair (1x $412, Acacia velour brass, France Paris stock #11, dP26sCO6), "Earth" table (2x $1412, Walnut brass granite, France Dijon stock #1)
   - Each product shows 3 thumbnail images
   - Save / Cancel buttons
   - Realtime: order status changes reflect live

5. Customers (/customers)
   - Standard CRUD list + detail panel

6. Discounts (/discounts)
   - Standard CRUD list

7. Ledger + Taxes (/ledger, /taxes)
   - Simple data tables with Refine useTable + realtime

SIDEBAR NAVIGATION
Two-level layout (collapsed icon-only rail + expanded labeled sidebar) matching the design:
- Logo: circular icon + "Flup" wordmark
- Collapse toggle (< / >)
- Sections: MARKETING (Dashboard, Marketplace, Orders, Tracking, Customers, Discounts), PAYMENTS (Ledger, Taxes), SYSTEM (Settings, Dark mode toggle)
- Active item: green filled background pill
- Bottom: user avatar + name (Harper Nelson, Admin Manager) + Log out

DESIGN SYSTEM
Replicate the Flup visual language precisely:
- Color: Primary green #1A6B4A (dark forest green for text/accents), action green #2ECC8F (buttons, active states, status dots)
- Background: light gray page #F0EFF4, white cards with subtle border
- Typography: clean sans-serif, dark green headings (#0D3D2B), muted gray labels
- Cards: white, border-radius 12px, 1px solid #E8E8E8, no heavy shadows
- Buttons: "Add new track" = green filled (#2ECC8F), white text; Save = same; Cancel = ghost
- Status badges: On route = green dot (#2ECC8F), Waiting = blue dot (#5B9BD5), Inactive = gray dot
- Trend arrows: green up arrow for positive %, red down arrow for negative %
- Truck cards: show a side-view truck SVG with green cargo container

REALTIME SPEC
Implement these realtime behaviors using Refine LiveProvider + graphql-ws:
- Tracking page: when a delivery status changes in the DB, the card updates its dot color and label instantly
- Orders page: when an order is edited/saved by another user, the list reflects it without refresh
- Marketplace: new products added server-side appear at top of list
- Dashboard KPIs: polling every 30s (use refetchInterval on useCustom hook) since aggregates are expensive to subscribe to
- Show a subtle green "Live" indicator badge in the top-right of realtime pages

FILE STRUCTURE
src/
  pages/
    dashboard/         index.tsx, KpiCard.tsx, SalesChart.tsx, CategoryDonut.tsx, CountriesTable.tsx
    marketplace/       index.tsx, ProductRow.tsx, FilterChips.tsx
    tracking/          index.tsx, TrackingCard.tsx, TruckSVG.tsx
    orders/            index.tsx, EditOrderDrawer.tsx, ProductLineItem.tsx
    customers/         index.tsx
    discounts/         index.tsx
    ledger/            index.tsx
    taxes/             index.tsx
  components/
    layout/            Sidebar.tsx, Header.tsx, LiveBadge.tsx
    common/            StatusDot.tsx, TrendArrow.tsx, FilterChip.tsx
  providers/
    dataProvider.ts    (graphql http)
    liveProvider.ts    (graphql-ws websocket)
  graphql/
    queries.ts         (all useList / useOne queries)
    mutations.ts       (useCreate / useUpdate / useDelete)
    subscriptions.ts   (live subscriptions per resource)
  App.tsx
  index.tsx

OUTPUT INSTRUCTIONS
- Output each file completely — no truncation, no "// ... rest of code"
- Start with App.tsx (Refine root wiring), then liveProvider.ts, then dataProvider.ts, then pages in order above
- Use TypeScript interfaces for all data shapes
- Use Refine hooks exclusively: useList, useOne, useCreate, useUpdate, useDelete, useTable, useForm, useShow
- Do NOT use useState/useEffect for data fetching — always use Refine hooks
- For the live subscription queries, use the Hasura subscription format:
    subscription OnOrderUpdated { orders { id status updated_at } }
- Ant Design components only — no MUI, no Tailwind, no custom CSS frameworks
- Include package.json with exact versions of all dependencies
- After all files, add a "Setup" section explaining: GraphQL endpoint env vars, Hasura permission tables needed, how to run locally
    

NOTE:iMPLEMENT EACH FEATURE FULLY, RECORD your progress in a progress-tracker.md(doing, done, backlog)
------------------find the images in /reference-ui-images for more convenience-------------