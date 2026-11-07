# Arckey Interiors and Construction

Next.js (App Router) + Tailwind CSS v4 single-page site with a Formspree contact form.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the two values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Before going live

1. **Formspree**: create a form at formspree.io, copy the ID from its endpoint (`https://formspree.io/f/<ID>`), set `NEXT_PUBLIC_FORMSPREE_ID`.
2. **Domain**: set `NEXT_PUBLIC_SITE_URL` to the live URL (used for canonical, Open Graph, sitemap).
3. **Photos**: six photos are already in `public/work/` (the five room photos feed "Spaces we design", the desk photo is in the About section). To swap one, replace the file or edit its entry in `WORK` in `lib/site.ts`.
   Original note: put project photos in `public/work/` and set `image` on the matching entry in `WORK` in `lib/site.ts` (for example `image: "/work/living-rooms.jpg"`). Tiles without a photo show a colour swatch. Landscape photos around 1600 px wide work best.
4. **Opening hours / pincode**: add them to the JSON-LD in `app/page.tsx` to match the Google Business Profile exactly.
5. Verify the domain in Google Search Console (paste the HTML-tag token into `NEXT_PUBLIC_GSC_VERIFICATION`), submit `/sitemap.xml`, and add Google Analytics.

All business details (name, phone, address, links, services, FAQs) live in `lib/site.ts`.

## Client reviews

Visitors can write reviews at `/review`, read them at `/reviews` (and in the home page), and react with "Helpful" or "Love it".

**Share this link with clients:** `https://your-domain.com/review`. The page has Copy link and WhatsApp buttons too.

### Setup

1. **Neon (database).** Create a free project at neon.tech, copy the connection string, set it as `DATABASE_URL`. The tables are created automatically on first use (the same SQL is in `db/schema.sql`).
2. **Resend (email alerts).** Create an account at resend.com, verify your domain, create an API key. Set `RESEND_API_KEY`, `MAIL_FROM` (an address on your verified domain) and `OWNER_EMAIL`. To test before verifying a domain, Resend lets you send from `onboarding@resend.dev` to your own Resend account email.
3. **Admin.** Set `ADMIN_PASSWORD` (to sign in at `/admin`) and `REVIEW_SECRET` (any long random string).
4. Add all of these in your host's environment settings (for example Vercel) and redeploy.

### How it works

- New reviews are held as **pending** and you get an email. Open `/admin` to publish, hide or delete them. Set `REVIEWS_AUTO_APPROVE=true` to publish immediately instead.
- Spam protection: hidden honeypot field, a minimum time to fill the form, and a limit of 3 reviews per visitor per day (by a one-way hash of the IP address, never the address itself).
- Each browser can add one "Helpful" and one "Love it" per review, and can take it back.
- Reviews are not added to the Google structured data. Google ignores star ratings that a business publishes about itself.
