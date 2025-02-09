This is a [Next.js](https://nextjs.org/) project.

## Getting Started

First, run the database server:

```bash
pnpm dlx prisma studio
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

You must add an environment variable to your project, this is neccessary only in development environment.

| Key                  | Value    |
| -------------------- | -------- |
| `DATABASE_URL`       | `string` |
| `AUTH_SECRET`        | `string` |
| `RESEND_API_KEY`     | `string` |
| `AUTH_GOOGLE_ID`     | `string` |
| `AUTH_GOOGLE_SECRET` | `string` |
