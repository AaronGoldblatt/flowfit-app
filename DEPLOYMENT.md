# FlowFit Deployment Guide

This guide follows the CS 5356 homework requirements for deploying to Vercel with Neon database.

## Architecture Overview

```
┌─────────────────┐
│  Client Browser │
└────────┬────────┘
         │
         ↓ UI Interaction
┌─────────────────┐
│   Next.js 15    │
│ (App Router +   │
│     SSR)        │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ↓         ↓
┌─────────┐ ┌──────────┐
│ Client  │ │  Server  │
│Components│ │Components│
│(React)  │ │(Actions) │
└─────────┘ └────┬─────┘
                 │
                 ↓
         ┌──────────────┐
         │  Middleware  │
         │    (Auth     │
         │ Enforcement) │
         └──────┬───────┘
                │
                ↓
         ┌──────────────┐
         │   Database   │
         │   Drizzle    │
         │     ORM      │
         └──────┬───────┘
                │
    ┌───────────┴───────────┐
    │                       │
    ↓                       ↓
┌─────────┐         ┌─────────┐
│  Auth   │         │ Social  │
│ Schema  │         │ Schema  │
│(Users,  │         │(Profiles│
│Sessions)│         │Cycles,  │
│         │         │Workouts)│
└────┬────┘         └────┬────┘
     │                   │
     └─────────┬─────────┘
               ↓
        ┌─────────────┐
        │  Database   │
        │(PostgreSQL) │
        │  Neon/Local │
        └─────────────┘
```

## Pre-Deployment Checklist

- [ ] Code is committed to GitHub
- [ ] Environment variables are documented
- [ ] Database schema is finalized
- [ ] Seed data script is ready
- [ ] All features tested locally

## Step 1: Set Up Neon Database

### 1.1 Create Neon Project

1. Go to [neon.tech](https://neon.tech)
2. Sign up or sign in (free tier is sufficient)
3. Click "Create Project"
4. Choose a name: `flowfit-production`
5. Select region: Choose closest to your users (e.g., US East - Ohio)
6. Click "Create Project"

### 1.2 Get Connection String

1. In your Neon dashboard, go to your project
2. Click "Connection Details"
3. Copy the connection string (it looks like):
   ```
   postgresql://user:password@ep-cool-name-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **Important**: Copy the **"Direct Connection"** string (not pooled) for migrations

### 1.3 Run Migrations on Production Database

1. Add the Neon connection string to your local `.env.local`:
   ```env
   DATABASE_URL="postgresql://user:password@...neon.tech/neondb?sslmode=require"
   ```

2. Run production migrations:
   ```bash
   pnpm db:migrate-production
   ```

3. Seed the database with workout templates:
   ```bash
   NODE_ENV=production pnpm db:seed
   ```

4. Verify in Neon dashboard:
   - Go to "Tables" tab
   - You should see: users, sessions, profiles, cycles, workouts, etc.

## Step 2: Deploy to Vercel

### 2.1 Prepare GitHub Repository

1. Ensure your code is pushed to GitHub:
   ```bash
   git add .
   git commit -m "Initial FlowFit deployment"
   git push origin main
   ```

2. Make sure `.env` and `.env.local` are in `.gitignore` (already done)

### 2.2 Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Sign up/sign in with GitHub
3. Click "Add New" → "Project"
4. Import your FlowFit repository
5. Configure project settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `pnpm build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install` (auto-detected)

### 2.3 Set Environment Variables

Click "Environment Variables" and add:

```env
# BetterAuth Configuration
BETTER_AUTH_SECRET=<generate-new-secret-for-production>
BETTER_AUTH_URL=https://your-app-name.vercel.app

# Database
DATABASE_URL=<your-neon-connection-string>

# Optional: For OAuth (if you want to enable Google/Apple login)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
APPLE_CLIENT_ID=
APPLE_CLIENT_SECRET=
```

**Important**: 
- Generate a NEW `BETTER_AUTH_SECRET` for production (don't reuse local)
  ```bash
  pnpm dlx @better-auth/cli@latest secret
  ```
- The `BETTER_AUTH_URL` will be your Vercel app URL
- Use the Neon connection string from Step 1.2

### 2.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-3 minutes)
3. Once deployed, you'll get a URL like: `https://flowfit-app-xyz.vercel.app`

### 2.5 Update BETTER_AUTH_URL

1. After first deployment, go to Vercel project settings
2. Navigate to "Environment Variables"
3. Update `BETTER_AUTH_URL` with your actual Vercel URL:
   ```
   https://flowfit-app-xyz.vercel.app
   ```
4. Redeploy (Vercel → Deployments → ⋯ → Redeploy)

## Step 3: Verify Deployment

### 3.1 Test Authentication

1. Visit your Vercel URL
2. Click "Get Started"
3. Create a new account
4. Verify email/password signup works

### 3.2 Test Onboarding

1. Complete the onboarding flow
2. Enter profile information
3. Set cycle/pregnancy data
4. Verify data is saved

### 3.3 Test Core Features

- [ ] User can log in/out
- [ ] Profile is persisted
- [ ] Cycle phase is calculated correctly
- [ ] Workout recommendations appear
- [ ] Can log workouts
- [ ] Dashboard shows data

### 3.4 Check Database

1. Go to Neon dashboard
2. Navigate to "Tables" → "profiles"
3. You should see your test user's profile

## Step 4: Continuous Deployment

Every push to your `main` branch will automatically deploy to Vercel.

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys
```

## Troubleshooting

### Build Fails on Vercel

**Error**: "Module not found" or "Cannot find module"
- **Solution**: Make sure all dependencies are in `dependencies`, not `devDependencies`
- Check: `package.json` - move TypeScript/build tools to `devDependencies`

**Error**: "Environment variable not found"
- **Solution**: Double-check all required env vars are set in Vercel
- Go to: Project Settings → Environment Variables

### Database Connection Issues

**Error**: "connect ECONNREFUSED" or "Connection timeout"
- **Solution**: 
  1. Verify Neon connection string is correct
  2. Check Neon project is active (not paused)
  3. Use "Direct Connection" string for migrations
  4. Ensure SSL mode is included: `?sslmode=require`

**Error**: "relation does not exist"
- **Solution**: Run migrations on production database
  ```bash
  pnpm db:migrate-production
  ```

### Authentication Issues

**Error**: "Invalid session" or "Unauthorized"
- **Solution**: 
  1. Regenerate `BETTER_AUTH_SECRET` for production
  2. Verify `BETTER_AUTH_URL` matches your Vercel domain
  3. Clear browser cookies and try again
  4. Redeploy after updating env vars

### Performance Issues

**Slow Response Times**
- **Solution**:
  1. Check Neon query performance in dashboard
  2. Add database indexes if needed
  3. Enable Neon connection pooling
  4. Use Vercel Edge functions for auth checks

## Production Considerations

### Security

- ✅ Environment secrets stored securely in Vercel
- ✅ Database connections use SSL
- ✅ Authentication enforced via middleware
- ✅ User data isolated by userId in queries
- ⚠️ Consider rate limiting for API routes
- ⚠️ Add CORS configuration if needed
- ⚠️ Enable Vercel's DDoS protection

### Monitoring

- Set up Vercel Analytics (included free)
- Enable Neon monitoring for query performance
- Add error tracking (Sentry, LogRocket)
- Monitor database usage (Neon has limits on free tier)

### Scaling

**Free Tier Limits**:
- Vercel: 100 GB bandwidth/month, 100 deployments/day
- Neon: 3 GB storage, 1 compute instance

**When to Upgrade**:
- Consistent traffic > 10k requests/month
- Database > 2 GB
- Need multiple preview environments

### Database Maintenance

```bash
# Add a new migration
1. Update schema locally
2. Generate migration: pnpm db:generate
3. Test locally: pnpm db:migrate
4. Push to GitHub
5. Run on production: pnpm db:migrate-production
6. Verify in Neon dashboard
```

## Rollback Strategy

If something goes wrong:

### Rollback Deployment

1. Go to Vercel → Deployments
2. Find last working deployment
3. Click ⋯ → "Redeploy"

### Rollback Database

Neon supports point-in-time recovery:
1. Go to Neon dashboard → "Branches"
2. Create new branch from previous point in time
3. Update `DATABASE_URL` to new branch
4. Redeploy Vercel

## Cost Estimates

### Development (Free)
- Vercel: Hobby plan
- Neon: Free tier
- Total: $0/month

### Production (Small scale)
- Vercel: Pro plan - $20/month
- Neon: Scale plan - $19/month
- Total: ~$39/month

### Production (Medium scale)
- Vercel: Pro plan - $20/month
- Neon: Business plan - $69/month
- CDN/Assets: ~$10/month
- Total: ~$99/month

## Post-Deployment

### Update Documentation

1. Update README.md with production URL
2. Document any production-specific configs
3. Add deployment badge to README

### Share Your App

Your app is live at: `https://your-app-name.vercel.app`

Share with:
- Classmates for testing
- Instructors for grading
- Users for feedback

## Submission for CS 5356

When submitting your homework:

1. **GitHub Repository**: Link to your code
2. **Vercel Deployment**: Link to live app
3. **Neon Database**: Screenshot of tables in dashboard
4. **Demo Account**: Provide test credentials
5. **Documentation**: Link to README.md

Example submission:
```
GitHub: https://github.com/username/flowfit-app
Live App: https://flowfit-app-xyz.vercel.app
Database: Neon (see screenshot)
Test Account: demo@example.com / testtest123
```

## Success! 🎉

Your FlowFit app is now:
- ✅ Deployed to Vercel (PaaS)
- ✅ Connected to Neon database
- ✅ Using BetterAuth for authentication
- ✅ Automatically deploying on push
- ✅ Production-ready and scalable

Need help? Check the [SETUP.md](./SETUP.md) or [README.md](./README.md) for troubleshooting.

