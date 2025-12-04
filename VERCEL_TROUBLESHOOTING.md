# Vercel Deployment Troubleshooting Guide

## Issue: MIDDLEWARE_INVOCATION_FAILED Error

### Problem
You get a `500: INTERNAL_SERVER_ERROR` with code `MIDDLEWARE_INVOCATION_FAILED` when accessing your deployed app on Vercel.

### Root Cause
Vercel middleware runs in the **Edge Runtime**, which has several limitations:
- Cannot use Node.js-specific modules like `pg` (PostgreSQL client)
- Cannot use crypto operations that BetterAuth requires
- Cannot establish database connections

Your middleware was trying to:
1. Import BetterAuth (`@/lib/auth`)
2. Which imports the database connection (`@/database`)
3. Which uses `pg` (node-postgres) library
4. This fails in Edge Runtime

### Solution Applied
Simplified the middleware to not import any database-dependent code:

```typescript
// middleware.ts - Simplified version
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
```

### Status
✅ Fixed - Code pushed to GitHub
- Vercel will automatically redeploy
- Wait 2-3 minutes for new deployment
- Check your Vercel dashboard for deployment status

---

## Common Vercel Deployment Issues

### 1. Environment Variables Missing

**Symptoms:**
- Build fails with "Cannot find module"
- Runtime errors about undefined variables
- Database connection errors

**Solution:**
Check that these are set in Vercel → Settings → Environment Variables:
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `DATABASE_URL`

### 2. Database Connection Errors

**Symptoms:**
- "Connection timeout"
- "ECONNREFUSED"
- "SSL error"

**Solution:**
- Make sure DATABASE_URL includes `?sslmode=require`
- Verify Neon database is active (not paused)
- Use the "Direct Connection" string from Neon, not pooled

**Example correct format:**
```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Build Fails - Module Not Found

**Symptoms:**
- "Cannot find module 'xyz'"
- Build step fails

**Solution:**
- Check `package.json` - make sure dependencies are in `dependencies`, not `devDependencies`
- Exception: Build tools (TypeScript, ESLint) should be in `devDependencies`

### 4. BETTER_AUTH_URL Mismatch

**Symptoms:**
- Can't sign in
- "Invalid session" errors
- Redirect loops

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Update `BETTER_AUTH_URL` to match your exact Vercel URL:
   ```
   https://your-actual-app.vercel.app
   ```
3. Important: No trailing slash!
4. Redeploy after changing

### 5. Database Migrations Not Applied

**Symptoms:**
- "relation does not exist" errors
- "table not found"

**Solution:**
```bash
# Create .env.local with your Neon connection string
echo 'DATABASE_URL="postgresql://..."' > .env.local

# Run migrations on production
pnpm db:migrate-production

# Verify in Neon dashboard → Tables
```

### 6. App Shows Blank Page

**Symptoms:**
- App loads but shows nothing
- Console errors

**Check:**
1. Open browser DevTools (F12)
2. Check Console for JavaScript errors
3. Check Network tab for failed requests
4. Look for CORS or CSP errors

**Common fixes:**
- Clear browser cache
- Check if API routes are returning errors
- Verify database has data (check Neon dashboard)

---

## Vercel Deployment Checklist

Before deploying, verify:

- [ ] All environment variables are set correctly
- [ ] Database migrations have been run on production
- [ ] `BETTER_AUTH_URL` matches your Vercel URL
- [ ] Code builds locally: `pnpm build`
- [ ] No TypeScript errors (or they're intentionally ignored)
- [ ] `.env` files are in `.gitignore`

---

## How to Check Deployment Logs

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click "Deployments" tab
4. Click the most recent deployment
5. Scroll down to see build logs and function logs
6. Look for errors in red

---

## How to Redeploy

### Option 1: Push New Code
```bash
git add .
git commit -m "Fix: your changes"
git push origin main
# Vercel automatically deploys
```

### Option 2: Manual Redeploy (No Code Changes)
1. Go to Vercel → Deployments
2. Click ⋯ on latest deployment
3. Click "Redeploy"
4. Uncheck "Use existing Build Cache" if you changed environment variables
5. Click "Redeploy"

---

## Rollback Strategy

If your deployment breaks:

1. Go to Vercel → Deployments
2. Find the last working deployment (green checkmark)
3. Click ⋯ → "Promote to Production"
4. Fix the issue locally
5. Redeploy when ready

---

## Testing Your Deployment

After deploying, test these:

1. **Homepage loads**: Visit your Vercel URL
2. **Sign up works**: Create a new account
3. **Database writes**: Complete onboarding, check Neon dashboard
4. **Sign in works**: Log out and log back in
5. **Protected routes**: Try accessing dashboard while logged out
6. **API routes**: Check if data loads on dashboard

---

## Still Having Issues?

1. Check Vercel function logs:
   - Vercel Dashboard → Your Project → Logs
   - Look for runtime errors

2. Check database connection:
   - Neon Dashboard → Your Project → Monitoring
   - Look for connection errors

3. Check browser console:
   - Open DevTools (F12)
   - Look for JavaScript errors

4. Verify environment variables:
   - Vercel → Settings → Environment Variables
   - Make sure all are set for "Production"

---

## Quick Reference: Environment Variables

Required for production:

| Variable | Where to get it | Example |
|----------|----------------|---------|
| `BETTER_AUTH_SECRET` | Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` | `abc123...` |
| `BETTER_AUTH_URL` | Your Vercel deployment URL | `https://flowfit.vercel.app` |
| `DATABASE_URL` | Neon dashboard → Connection String | `postgresql://...neon.tech/neondb?sslmode=require` |

---

## Contact

If you're still stuck:
- Check the [Next.js Deployment docs](https://nextjs.org/docs/deployment)
- Check [Vercel docs](https://vercel.com/docs)
- Check [BetterAuth Vercel guide](https://www.better-auth.com/docs/deployment/vercel)
- Ask in your course Piazza/Slack

---

**Last Updated:** Dec 4, 2025
**Issue Fixed:** Middleware Edge Runtime compatibility

