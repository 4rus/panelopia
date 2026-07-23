# Panelopia

Panelopia is a modern Next.js website built for a premium wall panel business serving Calgary and Edmonton, Alberta. The app combines marketing pages, product listings, a visualizer promo, and a CRM-style dashboard prototype.

## What this project includes

- **Next.js 14 App Router** with server-rendered layouts and metadata
- **CSS Modules** for scoped styling and custom design system
- **Framer Motion** installed for page animations and motion UI
- **Supabase client** configured in lib/supabase.ts
- **Responsive navigation** with mobile menu and transparent home header
- **Contact form UI** with client-side state and submission flow
- **Lead dashboard prototype** with filters, selected lead panel, and status updates
- **Branding + fonts** defined in `app/globals.css`

## Project structure

```
panelopia/
├── app/
│   ├── layout.tsx          # Root layout with Nav + Footer
│   ├── globals.css         # Design tokens, fonts, base styles
│   ├── page.tsx            # Home page content
│   ├── page.module.css
│   ├── products/           # Products page content
│   ├── gallery/            # Design project gallery
│   ├── visualizer/         # Wall visualizer experience
│   ├── about/              # Brand story and showroom details
│   ├── contact/            # Contact form page
│   └── dashboard/          # CRM dashboard prototype
├── components/
│   └── layout/
│       ├── Nav.tsx         # Header, logo, mobile menu
│       └── Footer.tsx      # Footer links and contact info
├── lib/
│   ├── supabase.ts         # Supabase client + typed lead helpers
│   └── schema.sql          # Database schema for Supabase leads
├── public/
│   ├── images/             # Hero and gallery assets
│   ├── official_logo.png   # Default logo asset
│   └── logo-full.svg
├── .env.local.example      # Environment variable template
├── package.json
└── tsconfig.json
```

## Stack

- **Framework**: Next.js 14
- **UI**: React + CSS Modules
- **Animation**: Framer Motion
- **Database client**: Supabase JS
- **Fonts**: Cormorant Garamond + DM Sans via Google Fonts

## Local setup

`ash
npm install
cp .env.local.example .env.local
`

Then fill .env.local with your Supabase values:

`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
`

Run the site locally:

`ash
npm run dev
`

## Available scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — build for production    
- `npm run start` — run the production server after build
- `npm run lint` — run Next.js ESLint checks

## Routes

| Route | Description |
|------|-------------|
| / | Home page with hero, product categories, gallery promo, and visualizer CTA |
| /products | Product collection details and category anchors |
| /gallery | Installation photography and portfolio previews |
| /visualizer | Wall visualizer experience page |
| /about | Company story and showroom details |
| /contact | Contact / quote form UI |
| /dashboard | CRM dashboard prototype for managing leads |

## Supabase integration

`lib/supabase.ts` configures the Supabase client using environment variables.

Current code includes typed helpers for:

- getLeads()
- insertLead()
- updateLeadStatus()

Note: /contact and /dashboard currently use local mock data and placeholder comments for Supabase wiring. Connect those pages to the Supabase helpers to enable live lead storage and retrieval.

## Design and branding

The design system lives in `app/globals.css`.

Key tokens:

- --amber: #F5A623
- --coral: #E8522A
- --teal: #3DBFBF
- --ink: #1A1814
- --cream: #FAF8F4

Typography:

- Display headings: Cormorant Garamond
- Body text: DM Sans

## Logo configuration

Header logo settings are in components/layout/Nav.tsx.

- LOGO.imageSrc points to /official_logo.png
- LOGO.useSvgFallback can be toggled to use the inline SVG mark
- LOGO.showWordmark controls the text display next to the mark

## Notes

- Footer links include /policies, /tandc, and /return-policy, but those routes are not currently implemented in `app/`.
- The Supabase client is ready, but the front-end pages currently use mock data and simulated submission state.

## Deployment

Deploy to Vercel or any Next.js-compatible host.

```bash
npm run build
```

Ensure environment variables are configured in the deployment environment before launch.
