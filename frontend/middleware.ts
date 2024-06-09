import { IncomingMessage } from "http";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/feed"];
const toBeRedirectedRoutes = ["/", "/login", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("userToken");
  // console.log({pathname})
  // console.log({token})

  if (protectedRoutes.includes(pathname) && !token) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (toBeRedirectedRoutes.includes(pathname) && token) {
    const feedUrl = new URL("/feed", req.url);
    return NextResponse.redirect(feedUrl);
  }

  const res = NextResponse.next();

  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Expires', '0');
  res.headers.set('Surrogate-Control', 'no-store');

  return res;
}

export const config = {
  // Apply the middleware to all routes except those matching the specified patterns
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
