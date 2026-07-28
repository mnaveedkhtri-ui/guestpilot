import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// 1. Yahan /directory add kiya hai
const PROTECTED_PREFIXES = ["/dashboard", "/prospects", "/campaigns", "/settings", "/directory", "/finder", "/list-site", "/my-sites", "/admin-approvals"];
const AUTH_PAGES = ["/login", "/register"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/prospects/:path*",
    "/campaigns/:path*",
    "/settings/:path*",
    "/directory", // <-- YEH LINE ADD KAREIN (Exact match ke liye)
    "/directory/:path*", 
    "/finder",
    "/finder/:path*",
    "/list-site",
    "/list-site/:path*",
    "/my-sites",
    "/my-sites/:path*",
    "/admin-approvals",
    "/admin-approvals/:path*",
    "/login",
    "/register",
  ],
};
