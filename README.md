# PrimeScore Partner Portal

Partner platform UI for PrimeScore DSAs and channel partners. Credit Rectification is the main product; loans, cards, accounts and insurance are side products.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and lucide icons. Works as an installable PWA on phones and has its own desktop layout.

> **UI only.** All data (partner, leads, payouts, products) is mock data in `src/lib/data.ts`. Login, Add case and KYC validate input but don't send anything anywhere yet.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. To try it on a phone on the same Wi-Fi, open `http://<your-computer-ip>:3000` (local network addresses are allowed in `next.config.ts`).

Install and offline support only run in a production build:

```bash
npm run build
npm start
```

## Screens

| Route | What it is |
| --- | --- |
| `/` | Home: earnings, Credit Rectification, needs-attention list, products, training (desktop gets a dashboard) |
| `/leads` | Rectification cases and other referrals (table on desktop) |
| `/leads/[id]` | Case detail: score before/after, stage timeline, errors being fixed |
| `/leads/new` | Add case or lead form |
| `/sell`, `/sell/[slug]` | Product catalogue and product detail |
| `/learn` | Trainings, courses and videos, filtered by topic |
| `/earnings` | Balance, payout history, withdraw |
| `/account`, `/kyc` | Profile, settings, 4-step KYC |
| `/login` | Mobile + OTP login |
| `/notifications`, `/soon` | Notifications, placeholder for unbuilt features |

## Where things live

- `src/lib/data.ts`: all mock data, product colours by category, rectification stages
- `src/app/globals.css`: brand tokens (navy, gauge red/yellow/green), type and motion
- `src/components/app-shell.tsx`: sidebar, top bar and bottom tab bar
- `src/components/ui.tsx`: shared panels, rows, avatar
- `scripts/gen-icons.mjs`: regenerates the PWA icons from the logo mark
