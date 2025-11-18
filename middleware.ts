import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Public routes that don't require authentication
const publicRoutes = ["/api/auth"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Check authentication for API routes
  if (path.startsWith("/api/")) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Add user info to headers for downstream use
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", session.user.id);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Temporarily disable middleware to avoid edge runtime crypto issues
    // "/api/:path*",
    // "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};

