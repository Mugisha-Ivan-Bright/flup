GLOBAL DESIGN SYSTEM — apply to every page

Colors (hardcode these exact values in CSS):
  --flup-green-dark:   #0D3D2B   (headings, active nav text, bold values)
  --flup-green-mid:    #1A6B4A   (secondary text, labels, icon strokes)
  --flup-green-action: #2ECC8F   (filled buttons, active nav bg, status dot On route, Live badge)
  --flup-blue-wait:    #5B9BD5   (status dot Waiting)
  --flup-page-bg:      #F0EFF4   (outer page background, same gray-lavender as screenshots)
  --flup-card-bg:      #FFFFFF   (all card/panel backgrounds)
  --flup-border:       #E8E8E8   (all card borders, dividers)
  --flup-label-gray:   #9B9B9B   (field label text above values)
  --flup-text-dark:    #1A1A1A   (primary body text)

Typography:
  Font: "DM Sans", fallback sans-serif (import from Google Fonts)
  Page title (h1): 24px, weight 600, color --flup-green-dark
  Section label (above a value): 11px, weight 400, color --flup-label-gray, uppercase tracking
  Primary value: 14–15px, weight 500, color --flup-green-dark
  Muted detail: 13px, weight 400, color --flup-label-gray
  KPI number: 32px, weight 700, color --flup-green-dark

Spacing:
  Page padding: 32px top, 28px left/right
  Card padding: 16px 20px
  Card border-radius: 12px
  Card border: 1px solid --flup-border
  Card box-shadow: none (flat, no elevation)
  Gap between cards: 16px

Sidebar:
  Width expanded: 220px | collapsed (icon rail): 60px
  Background: #FFFFFF
  Border-right: 1px solid --flup-border
  Logo area: 20px padding, circular green icon (svg owl/person silhouette) + "Flup" in 16px 600 --flup-green-dark
  Collapse toggle: small chevron button top-right of sidebar, 28px circle, border --flup-border
  Nav section label: 10px, weight 500, color --flup-label-gray, uppercase, margin-top 24px
  Nav item default: 13px, weight 400, --flup-text-dark, icon 18px stroke, padding 8px 12px, border-radius 8px
  Nav item active: background #E8F7F1, text --flup-green-dark, icon --flup-green-action, weight 500
  Nav item hover: background #F5F5F5
  Nav icon: Lucide or Tabler outline, 18px, vertically centered, margin-right 10px
  Bottom of sidebar: avatar (32px circle photo) + name (14px 500) + role (12px --flup-label-gray)
  Dark mode toggle: iOS-style pill switch, 36x20px, green when on
  Log out: 13px, --flup-label-gray, arrow-right icon

Buttons:
  Primary (Save, Add new track): bg --flup-green-action, text white, 13px 500, height 36px, border-radius 8px, padding 0 16px, icon left 16px
  Ghost (Cancel): bg transparent, border 1px --flup-border, text --flup-text-dark, same sizing
  Icon-only (···  ellipsis menu): 28px circle, bg transparent, hover bg #F5F5F5

Status dots:
  8px filled circle, display: inline-block, margin-right 6px, vertical-align middle
  On route: --flup-green-action (#2ECC8F)
  Waiting:  --flup-blue-wait  (#5B9BD5)
  Inactive: #C4C4C4

Trend arrows (KPI cards):
  Green arrow up ▲ + green percent: color #2ECC8F, font-size 13px
  Red arrow down ▼ + red percent:   color #E24B4A, font-size 13px
  Displayed inline-right of the KPI number




  DASHBOARD PAGE — /dashboard

Layout: white content panel, full width minus sidebar, page-bg behind it
Top bar: "Dashboard" h1 left, "Time period: [dropdown]" right with calendar icon

KPI ROW — 4 equal cards in a single row, gap 16px, each card:
  Structure (top to bottom inside card):
    icon  (18px, --flup-label-gray)  |  label text 11px --flup-label-gray
    large number 32px 700 --flup-green-dark
    trend: arrow + percent, 13px (green or red per sign)
  Card 1: icon=person-group  | "Total customers"  | 567,899   | ▲ 2.5%  green
  Card 2: icon=currency-dollar | "Total revenue"  | $3,465 M  | ▲ 0.5%  green
  Card 3: icon=shopping-cart   | "Total orders"   | 1,136 M   | ▼ 0.2%  red
  Card 4: icon=arrow-return    | "Total returns"  | 1,789     | ▲ 0.12% green
  Card 5 (dashed border, no fill): icon=plus 24px center | "Add data" 13px --flup-label-gray

PRODUCT SALES CHART — full-width card below KPI row
  Title "Product sales" 16px 600 --flup-green-dark, top-left
  Legend top-right: filled circle #378ADD "Gross margin" | filled circle #EF9F27 "Revenue"
  Grouped bar chart, x-axis Jul 1–12, y-axis 0–70K
  Blue bars = gross margin, orange bars = revenue, side by side per day
  Hover tooltip: dark pill, shows "● Gross margin  $52,187  ▲ 2.5%"
  Chart height: 220px, no grid lines just faint horizontal dashes

BOTTOM ROW — two cards side by side, gap 16px

  LEFT card "Sales by product category":
    Title 16px 600, top-left
    Donut chart, 180px diameter, right-aligned within card
    Center of donut: empty (no label inside)
    Segments (clockwise from top): purple 25%, blue 17%, teal 13%, coral 12%, orange 9%, pink 8%, gray 6%, green 5%, yellow 3%, red 2%
    Legend 2-column grid left of donut, each row: colored 10px square + category name + em-dash + percent
    Categories: Living room 25%, Kids 17%, Office 13%, Bedroom 12%, Kitchen 9%, Bathroom 8%, Dining room 6%, Decor 5%, Lighting 3%, Outdoor 2%

  RIGHT card "Sales by countries":
    Title 16px 600, top-left
    Choropleth map of Europe, right half of card, green fill intensity = % share
    Country list left side, each row: green 8px dot | country name 13px | percent right-aligned bold
    Rows: Poland 19%, Austria 15%, Spain 13%, Romania 12%, France 11%, Italy 11%, Germany 10%, Ukraine 9%
    Row hover: light green bg #E8F7F1


    TRACKING PAGE — /tracking

Top bar:
  Left: "Tracking" h1 + muted "76 deliveries" 14px --flup-label-gray inline
  Right: green filled button "+ Add new track" (icon plus, text white)

Filter row below title:
  Tab pills: "All 76" (active: --flup-green-action bg, white text, border-radius 20px)
             "On route 34" | "Waiting 28" | "Inactive 14"  (inactive: bg #F5F5F5, --flup-text-dark)
  Spacing between tabs: 8px

Search + filter row:
  Search input full width with magnifier icon left, placeholder "Search for track ID, customer, delivery status, destination"
  Right side: "Filters" dropdown button (icon sliders) + "Time" sort dropdown

Card grid — 2 columns, gap 16px, cards listed by recency

DELIVERY CARD anatomy (each card is a white rounded-12px box, 1px --flup-border):
  TOP SECTION (left column + truck image right):
    Status line:  [dot 8px] "On route" OR "Waiting"  13px 500
    Tracking ID:  20px 700 --flup-green-dark  e.g. "UL-158902NH"
    Route label:  16px 600 --flup-green-dark  e.g. "Madrid – Malaga"
    Time left:    right-aligned 13px --flup-label-gray  e.g. "1 h 36 min left"
    Truck image:  right side, ~120px wide SVG truck facing right
                  Cab: light gray (#F0EFF4), Cargo box: flat green (#2ECC8F)
                  Wheels: dark gray circles, no shadows

  BOTTOM SECTION (below a thin divider line):
    Two columns:
      Left col:
        "Distance"  label 11px --flup-label-gray
        "529 km"    value 14px 500 --flup-green-dark
        "Estimated time" label
        "5 h 27 min"     value
      Right col (stop list with dot-line connector):
        Each stop: filled circle 6px --flup-green-action + ZIP + city, 13px
        Stops connected by vertical dashed line
        Last stop has outlined circle (destination)

Sample cards to generate (in order):
  1. UL-158902NH | On route | Madrid→Malaga | 1h36m left | 529km / 5h27m
     Stops: 18001 Granada → 18600 Motril → 29001 Málaga
  2. KO-158454PO | On route | Warszawa→Kraków | 3h09m left | 290km / 3h35m
     Stops: 00-006 Warszawa → 26-600 Radom → 25-004 Kielce → 30-000 Kraków
  3. UK-568742NK | Waiting  | Madrid→Roma    | 19h59m left | 1959km / 20h34m
     Stops: 28001 Madrid → 16121 Genove → 50100 Firenze → 00100 Roma
  4. KO-158002NH | On route | Warszawa→Katowice | 2h06m left | 295km / 3h16m
     Stops: 97-300 Piotrków → 42-208 Częstochowa → 40-001 Katowice
  5. KJ-145651LK | On route | Paris→Berlin   | 1h16m left | 1275km / 12h50m
     Stops: 18001 Hannover → 10115 Berlin
  6. GM-145125PO | Waiting  | Stockholm→Copenhagen | 4h10m left | 658km / 7h08m
     Stops: 58128 Linköping → 55302 Jönköping → 25189 Helsingborg → 21110 Malmö
  7. UA-785412KO | On route | Graz→Wien      | 2h10m left
  8. UA-144500MN | On route | Kraków→Bucharest | 44m left

REALTIME BEHAVIOR:
  When status changes server-side → dot color + label text update with a 300ms fade transition
  Show green "● Live" badge 10px dot + "Live" text 11px in top-right of page header



MARKETPLACE PAGE — /marketplace

Top bar:
  Left: "Marketplace" h1 + "132 products" muted 14px inline
  Right: "Filters" button with sliders icon

Filter chip row:
  Active filter chips, each a pill: label + "×" dismiss icon
  bg #F0EFF4, border 1px --flup-border, border-radius 20px, 13px text --flup-green-dark
  Chips: [ALPHAWOOD ×] [Living room ×] [Dining room ×] [Bedroom ×]
  + "Clear all filters" button with trash icon, right-aligned

Search bar: full width, magnifier icon left, placeholder "Search for product"

PRODUCT LIST — single column, each product is a horizontal card:
  Left: checkbox 16px square (unchecked state)
  Product photo: 100×100px white square, object-fit contain, light gray bg #F5F5F5, border-radius 8px
  Center block:
    Row 1: "Display name" label 11px --flup-label-gray | name 15px 600 --flup-green-dark
    Row 2: "Item ID"      label                        | ID 14px 500 --flup-text-dark
    Row 3: "Price"        label                        | price 16px 600 --flup-green-dark
  Right block (two columns):
    Col A:
      "Material" label | value 14px --flup-green-dark
      "Dimensions" label | value 13px
    Col B:
      "Category" label | value 14px
  Far right: "···" ellipsis menu button 28px circle

  Divider: 1px --flup-border between each row

Products to show (in order):
  1. Photo: wooden minimal chair
     Name: Time | ID: sA26sCO5 | Price: $265,00
     Material: Acacia, brass | Dims: h 735mm, w 600mm, d 500mm | Cat: Living room
  2. Photo: bed with green striped headboard and white bedding
     Name: Morpheus | ID: gW27sCO7 | Price: $1,965,00
     Material: Walnut, velours, brass | Dims: h 700mm, w 2000mm, d ... | Cat: Bedroom
  3. Photo: round wooden bar stool with brass footrest
     Name: Measure | ID: gW16sCD4 | Price: $429,00
     Material: Walnut, brass, stainless steel | Dims: H 820mm, W 500mm | Cat: Dining room
  4. Photo: low sculptural coffee table with organic shape
     Name: Earth | ID: dP26sCO6 | Price: $1,412,00
     Material: Walnut, brass, granite | Dims: H 735mm, W 60... | Cat: ...

NOTE: product photos are real 3D-rendered furniture images. In implementation use
placeholder images from a CDN (e.g. picsum.photos) sized 100×100 with the correct
furniture description passed as seed, or use your own asset imports.




ORDERS PAGE — /orders

Main layout: order list left (same card-row pattern as Marketplace)
Each order row shows: order ID, customer name, status badge, total, date

EDIT ORDER DRAWER — slides in from right, width 420px, white bg, shadow-left: none (flat)
Header: "Edit order" 20px 600 left | order ID "DSD15879" 14px --flup-label-gray right
Tab bar below header: "Order info" | "Route info"
  Active tab: text --flup-green-dark, 2px bottom border --flup-green-action
  Inactive tab: --flup-label-gray, no border

Tab 1 — ORDER INFO:

  PRODUCT LINE ITEMS section (no section title, just the items):
  Each item card (white, border --flup-border, radius 8px, padding 12px):
    Row layout:
      Left: 3 small product thumbnails stacked horizontally (60×60px each, bg #F5F5F5, radius 6px)
             Images show the chair/table from multiple angles
      Right of thumbnails:
        "Display name" label 11px --flup-label-gray
        Product name 15px 600 --flup-green-dark  (e.g. "Warm")
        Grid of metadata below name (2 columns):
          "Material" label | "Acacia, velour, brass"
          "Color"    label | brown circle 12px filled
          "Stock"    label | "France, Paris, stock #11"
        Right column of item card:
          "Quantity" label | "1"  14px 500
          "Price"    label | "$412,00"  16px 600 --flup-green-dark
        Item ID below: "Item ID  dP26sCO6"  13px --flup-label-gray
        Dimensions:    "Dimensions  H 735 mm, W 600 mm, D 500 mm"  13px

  Item 1: "Warm"  — armchair, green velvet tufted cushion, wood frame
    Material: Acacia, velour, brass | Color: brown dot | Stock: France, Paris, stock #11
    Qty: 1 | Price: $412,00 | ID: dP26sCO6 | Dims: H 735mm W 600mm D 500mm

  Item 2: "Earth" — low dark-wood coffee table with organic marble top
    Material: Walnut, brass, granite | Color: dark gray dot | Stock: France, Dijon, stock #1
    Qty: 2 | Price: $1,412,00 | ID: dP26sCO6 | Dims: H 735mm W 600mm D 500mm

  "Total: [?]" row at bottom of items section (info icon after label)
  Save button (green filled) | Cancel button (ghost) — bottom-right of drawer

  CUSTOMER DETAILS section (below items, white card):
    Section label: "Customer details" 13px --flup-label-gray
    Two-column form grid (labels above inputs):
      Name field:    label "Name"    | value "Alina"
      Surname:       label "Surname" | value "Carter"
      Email:         label "Email"   | value "alina.carter@gmail.com"
      Phone:         label "Phone number" | flag dropdown (Italian flag 🇮🇹) + "(338)-123-4567"
    All inputs: height 40px, border 1px --flup-border, radius 8px, 14px text

  DEPARTURE DATE section (white card below customer):
    "Departure date" label + date input showing "16 July 2022" with calendar icon
    Time input "08:00 PM" with clock icon
    Same for "Delivery date": "17 July 2022" + time "05:00 PM"

Tab 2 — ROUTE INFO:

  "Shipping address" dropdown (full width, label above)
  Two fields row: "Country" | flag 🇫🇷 + "France"
  "ZIP code" input showing "75016"

  Divider

  "Driver" label section:
    "Driver name" label | "Drew Cano" value  15px 500 --flup-green-dark
    "ID number"   label | "2156-85-7458"
    Driver avatar: 40px circle, photo of man with beard

  "Route" text field (full width)
Detail panel — Tracking card expanded (driver info tab)
Copy
TRACKING DETAIL PANEL — appears when clicking a delivery card

5 tabs: "Goods info" | "Vehicle info" | "Driver info" (active, underlined green) | "Customers info" | "History log"

DRIVER INFO TAB content (white card):
  Driver row:
    Avatar: 48px circle, photo (man with beard in blue polo shirt)
    "Driver" label 11px --flup-label-gray above name
    Name: "Albert Carter" 16px 600 --flup-green-dark
  Action buttons row (below name):
    [green filled] "Call" with phone icon
    [ghost] "Chat" with message icon
  Metadata grid (2×2):
    "ID number"       | "2156-85-7458"
    "Driver's licence"| "CDL"
    "Driver's rate"   | "4.9"
    "License class"   | "A, D"

ROUTE PROGRESS section (white card below):
  "Distance"       label | "124/529 km"       value
  "Estimated time" label | "1 h 36 min/5 h 27 min" value
  "Speed"          label | "62 mph/76 mph"    value
  Visual progress bar: thin 4px green bar showing 124/529 = ~23% filled

STATUS CARD (compact, same as list card):
  "● On route" + "UA-144500MN" 18px bold
  "Kraków – Bucharest" route
  Stops: 500001 Brasov → 010001 Bucharest
  Time left: "44 min left" right-aligned
  Truck SVG same as list card


  