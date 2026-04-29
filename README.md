# VitalPulse MVP

VitalPulse is a mobile-first healthcare family dashboard MVP for demo, validation, and pilot testing.

## Features

- Premium dark UI (navy + teal) with calm status-first UX
- Landing, Login, Family Dashboard, Alerts, Records, and Admin Demo pages
- Live-style updates via 5-second polling
- Admin panel can modify vitals and status; family dashboard reflects updates
- Supabase-backed API routes with automatic mock fallback when env vars are missing
- Loading skeletons, empty states, and error handling
- Vercel-ready Next.js 15 app router structure

## Project Structure

```bash
.
├── app/
│   ├── admin/page.tsx
│   ├── alerts/page.tsx
│   ├── api/
│   │   ├── alerts/route.ts
│   │   ├── patients/route.ts
│   │   └── records/route.ts
│   ├── dashboard/page.tsx
│   ├── login/page.tsx
│   ├── records/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
├── supabase/schema.sql
├── .env.example
└── README.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Fill `.env.local` with your Supabase project values.

4. (Optional but recommended) Create DB schema:
   - Open Supabase SQL editor
   - Run `supabase/schema.sql`

5. Start dev server:
   ```bash
   npm run dev
   ```

6. Open: `http://localhost:3000`

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> If these are not set, the app still works using in-memory mock response fallback from API routes.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import project in Vercel.
3. Add environment variables in Vercel Project Settings.
4. Deploy using defaults (`npm run build`).
5. Re-deploy after schema setup and env updates.

## Future Upgrade Suggestions

- Realtime subscriptions with Supabase channels (instead of polling)
- Secure family auth (OTP by SMS/email + RBAC)
- Audit trail and clinician signatures for every update
- PDF upload + signed URLs for records
- Multi-patient family view + notifications
- AI-generated explainers in multilingual support
- Clinical-safe alert thresholds validated with doctors
