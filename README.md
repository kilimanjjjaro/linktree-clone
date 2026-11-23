# Linktree Clone

A Linktree clone built with Next.js 16 (App Router), React 19, Tailwind CSS
4, Auth.js, Prisma with Neon and Cloudinary. Guests can edit a tree saved in
their browser; logged in users save their trees in the database and publish
them.

## Getting Started

Requirements: Node.js 26 (pinned with Volta) and pnpm 11. pnpm runs the
project scripts with the Node.js version declared in `devEngines`.

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`pnpm install` also generates the Prisma client in `src/generated/prisma`.
Run `pnpm dlx prisma studio` to browse the database.

## Environment Variables

| Key                                                                    | Used for                                  |
| ---------------------------------------------------------------------- | ----------------------------------------- |
| `DATABASE_URL`                                                         | Neon Postgres connection string           |
| `AUTH_SECRET`                                                          | Auth.js session encryption                |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`                                 | Google login                              |
| `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`                                 | GitHub login                              |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`                                     | Confirmation and password reset emails    |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Avatar, background and link image uploads |

## Project structure

- `src/app`: the editor (`/`), the auth pages and the public trees
  (`/[treeUrl]`)
- `src/lib/actions`: server actions for auth and trees
- `src/lib/services`, `src/lib/auth`, `src/lib/database.ts`: data access,
  Auth.js and the Prisma client
- `src/components`: React components, grouped by section
- `src/lib/store`, `src/lib/hooks`: Zustand store and the hooks that edit the
  selected tree
- `src/proxy.ts`: redirects between the auth pages and the pages that need a
  session
- `tests/unit`, `tests/e2e`: Vitest and Playwright tests, with their constants
  and helpers in `tests/constants` and `tests/utils`

## Checks

```bash
pnpm format:check  # Prettier (pnpm format fixes the files)
pnpm typecheck     # TypeScript
pnpm lint          # ESLint
pnpm test          # Unit tests (Vitest)
pnpm build         # Production build
pnpm test:e2e      # End-to-end tests (Playwright, needs a build first)
pnpm test:all      # All of the above, in order
```

Before the first e2e run, install the browser with
`pnpm exec playwright install chromium`. The unit tests mock the database,
Auth.js, the mailer and Cloudinary, and the e2e tests run the production
build with a dummy database url, so neither needs real credentials nor
sends emails. The same checks, plus `pnpm audit`, run in CI on every pull
request (`.github/workflows/ci.yml`).
