# FlowFit Setup Guide

This guide will walk you through setting up the FlowFit application from scratch.

## Quick Start (5 minutes)

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Generate auth secret
pnpm dlx @better-auth/cli@latest secret

# Copy the generated secret and add it to .env.local as BETTER_AUTH_SECRET

# 4. Start local database
pnpm db:start

# 5. Generate auth schema
pnpm auth:generate

# 6. Generate database migrations
pnpm db:generate

# 7. Run migrations
pnpm db:migrate

# 8. Seed workout templates
pnpm db:seed

# 9. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and you're ready to go!

## Detailed Setup Instructions

### 1. Prerequisites

Make sure you have installed:
- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - Install with `npm install -g pnpm`
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
  - On Mac, [OrbStack](https://orbstack.dev/) is a great alternative

Verify installations:
```bash
node --version   # Should be 18+
pnpm --version   # Should be 8+
docker --version # Should work
```

### 2. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd flowfit-app

# Install dependencies
pnpm install
```

### 3. Environment Configuration

Create a local environment file:
```bash
cp .env.example .env.local
```

Generate a secure secret for BetterAuth:
```bash
pnpm dlx @better-auth/cli@latest secret
```

Or use OpenSSL:
```bash
openssl rand -hex 32
```

Update `.env.local`:
```env
BETTER_AUTH_SECRET="paste-your-generated-secret-here"
BETTER_AUTH_URL="http://localhost:3000"

POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="flowfit"
LOCAL_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flowfit"

# Leave empty for now (used in production)
DATABASE_URL=""
```

### 4. Database Setup

Start PostgreSQL in Docker:
```bash
pnpm db:start
```

Verify it's running:
```bash
docker ps
```

You should see a container named `flowfit-postgres` running.

### 5. Generate Database Schema

First, generate the BetterAuth schema:
```bash
pnpm auth:generate
```

This creates `database/schema/auth.ts` with user, session, and account tables.

Then generate SQL migrations from all schemas:
```bash
pnpm db:generate
```

This reads all files in `database/schema/` and creates SQL migration files in `database/migrations/`.

### 6. Run Migrations

Apply the migrations to your local database:
```bash
pnpm db:migrate
```

This creates all the tables in your PostgreSQL database.

### 7. Seed Data

Populate the database with workout templates:
```bash
pnpm db:seed
```

This adds ~20 workout templates for different cycle phases and pregnancy trimesters.

### 8. Start Development

Start the Next.js development server:
```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 9. Create Your First Account

1. Click "Get Started" or go to `/auth/signup`
2. Enter your name, email, and password (min 8 characters)
3. Complete the onboarding flow
4. Start using the app!

## Troubleshooting

### Port 5432 Already in Use

If you see an error about port 5432 being in use:

```bash
# Stop any existing PostgreSQL containers
docker ps
docker stop <container-id>

# Or stop all Docker containers
docker compose down

# Then try again
pnpm db:start
```

### Database Connection Errors

If migrations fail with connection errors:

1. Make sure Docker is running
2. Verify the database is up: `docker ps`
3. Check the logs: `docker logs flowfit-postgres`
4. Try restarting: `pnpm db:stop && pnpm db:start`

### BetterAuth Errors

If you see authentication errors:

1. Make sure you've generated a secret
2. Verify it's in `.env.local` as `BETTER_AUTH_SECRET`
3. Restart the dev server after changing `.env.local`

### TypeScript Errors

If you see TypeScript errors:

```bash
# Regenerate types
pnpm db:generate
pnpm auth:generate

# Restart TypeScript server in your editor
# VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

### Starting Fresh

To completely reset your local database:

```bash
# Stop and delete all data
pnpm db:delete

# Start fresh
pnpm db:start
pnpm auth:generate
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Development Workflow

### Making Schema Changes

1. Edit schema files in `database/schema/`
2. Generate new migrations: `pnpm db:generate`
3. Review the generated SQL in `database/migrations/`
4. Apply migrations: `pnpm db:migrate`
5. Restart dev server

### Viewing the Database

Use Drizzle Studio to explore your database:

```bash
pnpm db:studio
```

This opens a web UI at [https://local.drizzle.studio](https://local.drizzle.studio)

### Code Quality

```bash
# Check for linting errors
pnpm lint

# Auto-fix linting errors
pnpm lint:fix
```

## Production Deployment

See [README.md](./README.md#deployment) for detailed deployment instructions to Vercel and Neon.

Quick version:

1. Create a Neon database at [neon.tech](https://neon.tech)
2. Copy the connection string
3. Add to `.env.local` as `DATABASE_URL`
4. Run production migrations:
   ```bash
   pnpm db:migrate-production
   ```
5. Deploy to Vercel
6. Set environment variables in Vercel dashboard

## Next Steps

- Read the [README.md](./README.md) for full documentation
- Explore the [API documentation](./README.md#api-documentation)
- Check out the project structure in [README.md](./README.md#project-structure)

## Getting Help

- Check the [Troubleshooting](#troubleshooting) section above
- Review [BetterAuth docs](https://www.better-auth.com/docs)
- Review [Drizzle docs](https://orm.drizzle.team/docs)
- Review [Next.js docs](https://nextjs.org/docs)

Happy coding! 🚀

