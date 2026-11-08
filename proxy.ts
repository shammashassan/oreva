import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Next.js 16 Proxy Convention (replaces deprecated middleware.ts).
 * Runs on the server boundary prior to page rendering.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // Protected Admin Routes: redirect unauthenticated users to /login
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Auth Routes: redirect authenticated admins away from /login to /admin
  if (pathname === "/login") {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
};
