This is a [Next.js](https://nextjs.org) 16 project. Content is managed with an
embedded [Sanity](https://www.sanity.io) Studio.

## Getting Started

1. Install dependencies and copy the env file:

   ```bash
   npm install
   cp .env.example .env.local
   ```

2. Create two API tokens at
   [manage.sanity.io → API → Tokens](https://www.sanity.io/manage/project/cxr8q1di/api/tokens)
   and paste them into `.env.local`:

   | Variable                 | Role   | Used for                              |
   | ------------------------ | ------ | ------------------------------------- |
   | `SANITY_API_READ_TOKEN`  | Viewer | Draft-mode preview + live content     |
   | `SANITY_API_WRITE_TOKEN` | Editor | One-off seeding (`npm run seed` only) |

3. Seed the dataset with the placeholder "Montra Studio" content from
   [`data/montra.ts`](data/montra.ts) (singletons, 5 services, 5 projects, 6 team
   members, 5 client logos, 6 testimonials, 3 pricing plans, 10 blog posts):

   ```bash
   npm run seed
   ```

   Upserts by id, so re-running it is safe.

4. Run the dev server:

   ```bash
   npm run dev
   ```

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## How the CMS integration works

- **Schemas** live in [`sanity/schemaTypes`](sanity/schemaTypes). The Studio is
  mounted at `/studio` via [`app/studio/[[...tool]]`](app/studio) and configured
  in [`sanity.config.ts`](sanity.config.ts).
- **Queries** are in [`sanity/lib/queries.ts`](sanity/lib/queries.ts). Pages fetch
  with `sanityFetch` from [`sanity/lib/live.ts`](sanity/lib/live.ts), which wires
  the site to Sanity's Live Content API — published pages update without a
  redeploy, and `<SanityLive />` in [`app/(site)/layout.tsx`](<app/(site)/layout.tsx>)
  keeps them in sync.
- **Types** are generated from the schema + queries into `sanity.types.ts` by
  `npm run typegen`. This runs automatically on `prebuild`; re-run it by hand
  after changing a schema or query.
- **Preview**: the Studio's Presentation tool loads the site in an iframe and
  turns on Next.js Draft Mode through
  [`app/api/draft-mode/enable`](<app/api/draft-mode/enable/route.ts>), so editors
  see unpublished drafts live.

The marketing site lives under the `app/(site)` route group so the Studio route
renders without the site chrome (nav, footer). The frontend design is a
faithful React/Tailwind rebuild of the "Montra" Next.js template
(Bootstrap/jQuery in the original — reimplemented here without either), with
its `main.css`/`responsive.css`/vendor CSS served from `public/assets/montra`.

## Deployment

Set the same env vars in your host. `NEXT_PUBLIC_SANITY_STUDIO_URL` should point
at `https://<your-domain>/studio`, and add that origin to
**CORS origins** in the Sanity dashboard.
