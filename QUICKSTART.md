# FlowFit - Quick Start Guide ⚡

Get FlowFit running in 5 minutes!

## Prerequisites Check

```bash
node --version   # Need 18+
pnpm --version   # Need 8+
docker --version # Need Docker running
```

Don't have them? Install:
- **Node.js**: https://nodejs.org/
- **pnpm**: `npm install -g pnpm`
- **Docker**: https://www.docker.com/products/docker-desktop/

## 5-Minute Setup

### 1. Install Dependencies (1 min)
```bash
cd flowfit-app
pnpm install
```

### 2. Configure Environment (1 min)
```bash
# Copy environment template
cp .env.example .env.local

# Generate a secret
pnpm dlx @better-auth/cli@latest secret

# Open .env.local and paste the secret:
# BETTER_AUTH_SECRET="paste-here"
```

Or manually edit `.env.local`:
```env
BETTER_AUTH_SECRET="your-generated-secret-here"
BETTER_AUTH_URL="http://localhost:3000"
LOCAL_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flowfit"
DATABASE_URL=""
```

### 3. Start Database (1 min)
```bash
pnpm db:start
```

Wait for "database system is ready to accept connections"

### 4. Setup Database (1 min)
```bash
pnpm auth:generate
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

### 5. Start App (1 min)
```bash
pnpm dev
```

Open http://localhost:3000 🎉

## First Use

1. Click "Get Started"
2. Create account (email + password, min 8 chars)
3. Complete onboarding wizard
4. Explore your personalized dashboard!

## Common Issues

**Port 5432 in use?**
```bash
pnpm db:stop
pnpm db:start
```

**TypeScript errors?**
```bash
pnpm db:generate
pnpm auth:generate
```

**Starting fresh?**
```bash
pnpm db:delete
pnpm db:start
pnpm auth:generate
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## What's Next?

- **Local Dev**: You're ready to code!
- **Full Docs**: See [README.md](./README.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Setup Details**: See [SETUP.md](./SETUP.md)

## Useful Commands

```bash
# View database
pnpm db:studio

# Stop database
pnpm db:stop

# Check code quality
pnpm lint

# Build for production
pnpm build
```

## Need Help?

1. Check [SETUP.md](./SETUP.md) for troubleshooting
2. Review [README.md](./README.md) for full documentation
3. Check the error message carefully

## Success Checklist

- ✅ Node.js 18+ installed
- ✅ pnpm installed
- ✅ Docker running
- ✅ Dependencies installed (`pnpm install`)
- ✅ `.env.local` created with secret
- ✅ Database started (`pnpm db:start`)
- ✅ Migrations run (`pnpm db:migrate`)
- ✅ Data seeded (`pnpm db:seed`)
- ✅ Dev server running (`pnpm dev`)
- ✅ App accessible at http://localhost:3000

**You're all set! 🚀**

