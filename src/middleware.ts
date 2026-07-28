import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Cookie se session token check karein
  const sessionToken = request.cookies.get("authjs.session-token") || request.cookies.get("__Secure-authjs.session-token");

  // Agar user login nahi hai aur /directory par janne ki koshish kar raha hai
  if (pathname.startsWith("/directory") && !sessionToken) {
    // Usko direct /login page par redirect kar dein
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/directory/:path*"],
};
