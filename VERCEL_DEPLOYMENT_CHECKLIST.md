# Vercel Deployment Checklist

Follow these steps to deploy FlowFit to Vercel.

## Pre-Deployment Steps

### Step 1: Generate Production Secrets

Before deploying, you need to generate a secure secret for production:

```bash
cd flowfit-app
pnpm dlx @better-auth/cli@latest secret
```

Copy the generated secret - you'll need it for Vercel environment variables.

### Step 2: Verify Your Code is Ready

```bash
# Make sure everything is committed
git status

# If you have uncommitted changes, commit them:
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Deployment Steps

### Step 3: Set Up Neon Database (Production Database)

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up or log in (GitHub sign-in is easiest)
3. Click **"Create Project"**
4. Settings:
   - Name: `flowfit-production`
   - Region: Choose closest to your users (e.g., US East - Ohio)
   - Postgres version: Latest (default)
5. Click **"Create Project"**
6. Copy the **Connection String** (looks like):
   ```
   postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   
   **IMPORTANT**: Make sure you copy the **"Direct Connection"** string, not the pooled one!

### Step 4: Run Migrations on Production Database

Create a temporary `.env.local` file (this is already gitignored):

```bash
# In flowfit-app directory
echo 'DATABASE_URL="YOUR_NEON_CONNECTION_STRING_HERE"' > .env.local
```

Replace `YOUR_NEON_CONNECTION_STRING_HERE` with the connection string from Neon.

Then run migrations:

```bash
pnpm db:migrate-production
```

If you have a seed script and want to populate initial data:

```bash
NODE_ENV=production pnpm db:seed
```

### Step 5: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"** (use GitHub for easiest setup)
3. Click **"Add New..."** → **"Project"**
4. Import your repository:
   - If this is your personal repository, just select it
   - If it's under an organization (startup-systems), you may need to adjust OAuth permissions
5. Configure Project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `flowfit-app` (important!)
   - **Build Command**: Leave as default (`next build`)
   - **Output Directory**: Leave as default (`.next`)
   - **Install Command**: `pnpm install`

### Step 6: Set Environment Variables in Vercel

Before clicking "Deploy", add these environment variables:

Click **"Environment Variables"** and add:

| Variable Name | Value |
|--------------|-------|
| `BETTER_AUTH_SECRET` | The secret you generated in Step 1 |
| `BETTER_AUTH_URL` | `https://your-app.vercel.app` (you'll update this after first deploy) |
| `DATABASE_URL` | Your Neon connection string from Step 3 |

**Note**: For `BETTER_AUTH_URL`, just put a placeholder like `https://flowfit.vercel.app` for now. You'll update it after the first deployment with your actual Vercel URL.

### Step 7: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://flowfit-app-abc123.vercel.app`

### Step 8: Update BETTER_AUTH_URL

After your first deployment:

1. Copy your actual Vercel URL
2. Go to your Vercel project → **Settings** → **Environment Variables**
3. Find `BETTER_AUTH_URL` and click **"Edit"**
4. Update it with your actual URL: `https://flowfit-app-abc123.vercel.app`
5. Save
6. Go to **Deployments** tab → Click the three dots next to latest deployment → **"Redeploy"**
7. Make sure "Use existing Build Cache" is **unchecked**
8. Click **"Redeploy"**

## Verification

### Test Your Deployed App

1. Visit your Vercel URL
2. Try signing up with a test account
3. Complete the onboarding flow
4. Verify features work:
   - [ ] Sign up / Sign in
   - [ ] Onboarding flow
   - [ ] Dashboard loads
   - [ ] Profile data is saved
   - [ ] Cycle tracking works
   - [ ] Workout recommendations appear

### Check Database

1. Go back to [Neon dashboard](https://console.neon.tech)
2. Select your `flowfit-production` project
3. Click **"Tables"** in the sidebar
4. You should see tables like: `users`, `sessions`, `profiles`, `cycles`, `workouts`, etc.
5. Click on `users` - you should see your test account

## Troubleshooting

### Build Fails

**Error**: "Cannot find module" or similar
- Solution: Make sure all dependencies are in the `dependencies` section of `package.json`, not `devDependencies` (except for actual dev tools like TypeScript)

**Error**: "Environment variable not set"
- Solution: Double-check environment variables in Vercel Settings → Environment Variables

### Database Connection Fails

**Error**: "Connection refused" or "timeout"
- Solution: 
  1. Verify the Neon connection string is correct
  2. Make sure you're using the **Direct Connection** string, not pooled
  3. Check that it includes `?sslmode=require` at the end

**Error**: "relation does not exist" 
- Solution: You didn't run migrations on production. Go back to Step 4.

### Authentication Issues

**Error**: "Invalid session" or cookies not working
- Solution:
  1. Make sure `BETTER_AUTH_URL` exactly matches your Vercel deployment URL (including https://)
  2. Regenerate `BETTER_AUTH_SECRET` if needed
  3. Clear your browser cookies and try again
  4. Redeploy after updating env vars

## For Homework Submission

According to the homework PDF, you need to submit:

1. **Link to GitHub repository** - your code repository
2. **Link to Vercel deployment** - your live app URL
3. **Any comments** - optional notes about your deployment

Example submission text:
```
GitHub Repository: https://github.com/your-username/ProductStudio
Vercel Deployment: https://flowfit-app-abc123.vercel.app

Test Account: test@example.com / testtest123

Notes: All features working. Used Neon for PostgreSQL database.
```

## Continuous Deployment

Good news! After initial setup, every time you push to your main branch, Vercel will automatically rebuild and redeploy your app.

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys within 2-3 minutes
```

## Database Migrations in Production

When you update your database schema:

1. Update schema files locally (e.g., `database/schema/*.ts`)
2. Generate migration: `pnpm db:generate`
3. Test locally: `pnpm db:migrate`
4. Commit and push to GitHub
5. Run on production: `pnpm db:migrate-production`
6. Verify deployment still works

## Success!

Once deployed, your FlowFit app will be:
- Live on the internet at your Vercel URL
- Connected to a production Neon database
- Automatically deploying on every push
- Using secure authentication with BetterAuth

**Your app is now live!**

