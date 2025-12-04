import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware is disabled for Vercel deployment due to Edge Runtime limitations
// BetterAuth and database connections don't work in Edge Runtime
// Authentication is handled in server components and API routes instead

export async function middleware(request: NextRequest) {
  // Middleware is currently disabled - all requests pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Middleware disabled - no routes matched
    // This prevents Edge Runtime issues with database connections
  ],
};

