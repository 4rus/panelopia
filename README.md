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
```bash
npm run build
```

Ensure environment variables are configured in the deployment environment before launch.
