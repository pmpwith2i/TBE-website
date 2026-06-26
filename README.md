This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Event pre-registrations

Event data lives in `constants/events.ts`. The native pre-registration form saves
submissions to Supabase and sends an admin notification with Resend.

1. Create a Supabase project and run `supabase/event-registrations.sql` in the
   Supabase SQL editor.
2. Add these environment variables locally and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
RESEND_API_KEY=re_your_key
EVENT_REGISTRATION_EMAIL_FROM="Teramo Bike Experience <iscrizioni@your-domain.it>"
EVENT_REGISTRATION_EMAIL_TO=iscrizioni@your-domain.it
```

`EVENT_REGISTRATION_EMAIL_TO` accepts multiple comma-separated recipients.
`EVENT_REGISTRATION_EMAIL_FROM` must use a sender/domain verified in Resend.
The Supabase table keeps Row Level Security enabled and only exposes a public
insert policy; there is no public select policy for registration data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
