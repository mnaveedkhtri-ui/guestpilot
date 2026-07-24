# GuestPilot AI — Core App Shell

This is the foundation slice of GuestPilot AI: real authentication, a
multi-tenant workspace model, and a working dashboard backed by an actual
database. It's meant to be the base the rest of the platform (AI outreach,
website finder, blog CMS, reports, admin panel, etc.) gets built on top of.

## What's implemented

- **Auth**: email/password accounts via Auth.js v5, bcrypt-hashed
  passwords, JWT sessions. Routes under `/dashboard`, `/prospects`,
  `/campaigns`, `/settings` are protected by `src/proxy.ts` (Next.js's
  current middleware convention).
- **Workspaces**: registering creates a user, a workspace, and an `owner`
  membership, so multi-tenancy is there from day one even though team
  invites aren't built yet.
- **Database**: Drizzle ORM against a local SQLite file via `@libsql/client`.
  This was chosen over Prisma because Prisma's CLI needs to download engine
  binaries from `binaries.prisma.sh` at install/generate time, which fails
  in network-restricted environments (including the sandbox this was built
  in). Drizzle + libsql only ever touches the npm registry, and the same
  `@libsql/client` driver can point at a hosted Turso database in production
  by changing `DATABASE_URL` — no code changes. Moving to Postgres later
  means swapping the driver import in `src/db/index.ts` and
  `drizzle.config.ts`'s `dialect`; the schema and query code are unaffected
  for anything that isn't SQLite-specific SQL.
- **Design system**: dark ink/indigo/amber tokens in `src/app/globals.css`,
  a small component library in `src/components/ui` (Button, Input, Label,
  Card, Badge), and a dashboard shell (sidebar + topbar) in
  `src/components/dashboard`.
- **Working pages**: Register, Login, Dashboard overview (real counts from
  the DB), Prospects (add a prospect, change its status inline — both go
  straight to the database), Campaigns (create + list), Settings.

Fonts use a system-font stack rather than `next/font/google`, because
fetching from `fonts.googleapis.com` is also blocked in restricted
environments. If your deploy target has open internet, swap in Sora +
Inter via `next/font/google` in `src/app/layout.tsx` for a closer match to
the original design brief.

## What's not built yet

Everything else in the original spec — the AI outreach generator, website
finder/search, email sending, blog CMS, reports/exports, admin panel, team
invites, 3D landing page, billing. This slice is intentionally scoped to
be a solid, real foundation rather than a wide layer of stubs.

## Getting started

```bash
npm install
cp .env.example .env   # then edit values, see below
npm run db:generate    # only needed if you change src/db/schema.ts
npm run db:migrate     # creates ./guestpilot.db and applies migrations
npm run dev
```

Visit `http://localhost:3000/register` to create the first account and
workspace.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | `file:./guestpilot.db` for local SQLite, or a `libsql://…` URL for a hosted Turso database. |
| `DATABASE_AUTH_TOKEN` | Only for hosted Turso | Auth token for the hosted database. |
| `AUTH_SECRET` | Yes | Used to sign session JWTs. Generate with `openssl rand -base64 32`. Must be set to a real secret in production. |

## Project structure

```
src/
  app/
    (auth)/login, (auth)/register     — public auth pages
    (dashboard)/                      — protected app shell + pages
    api/auth/[...nextauth]/route.ts   — Auth.js route handler
  actions/                            — server actions (register, login,
                                         sign-out, prospects, campaigns)
  components/
    ui/                               — design-system primitives
    dashboard/                        — sidebar, topbar
  db/
    schema.ts                         — Drizzle table definitions
    index.ts                          — db client
    migrate.ts                        — migration runner (npm run db:migrate)
  lib/
    auth.ts                           — Auth.js configuration
    password.ts, slug.ts, utils.ts, validations.ts
  proxy.ts                            — route protection (Next.js middleware)
drizzle/                              — generated SQL migrations
```

## Database workflow

This project uses Drizzle Kit's SQL migration workflow (not `db push`), so
schema changes are versioned and reviewable:

1. Edit `src/db/schema.ts`.
2. `npm run db:generate` — writes a new SQL file to `drizzle/`.
3. `npm run db:migrate` — applies pending migrations to `DATABASE_URL`.
4. `npm run db:studio` — opens Drizzle Studio to browse data visually.

## Deployment notes

- **Vercel / Railway / Render**: set `DATABASE_URL` to a hosted Turso
  database and `AUTH_SECRET` in the platform's environment variables, then
  deploy normally (`npm run build && npm run start`).
- **Docker / self-hosted**: the local SQLite file works as-is if you mount
  a persistent volume for `guestpilot.db`; run `npm run db:migrate` as part
  of your container's start command before `npm run start`.
- Whatever the target, run `npm run db:migrate` once against the target
  `DATABASE_URL` before first boot — nothing creates tables automatically
  at runtime.
