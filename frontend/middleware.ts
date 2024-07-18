import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import {
  isProtectedAdminRoute,
  isProtectedRoute,
  toBeRedirectedAdminRoutes,
  toBeRedirectedRoutes,
} from "./utils/routes";

const adminRoutes = /^\/admin(\/.*)?$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Improved matcher for static assets
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  if (adminRoutes.test(pathname)) {
    const tokenVerified = await verifyToken("adminToken", req);

    const isProtected = isProtectedAdminRoute(pathname);
    if (isProtected && !tokenVerified) {
      const loginUrl = new URL("/admin", req.url);
      return NextResponse.redirect(loginUrl);
    }

    const toBeRedirected = toBeRedirectedAdminRoutes(pathname);
    if (toBeRedirected && tokenVerified) {
      const feedUrl = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(feedUrl);
    }
  }

  const tokenVerified = await verifyToken("token", req);

  // Protected Routes logic - redirect to home if it doesn't have token in cookies
  const isProtected = isProtectedRoute(pathname);
  if (isProtected && !tokenVerified) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ToBeRedirected Routes logic - redirect to feed if it has token in cookies
  const toBeRedirected = toBeRedirectedRoutes(pathname);
  if (toBeRedirected && tokenVerified) {
    const feedUrl = new URL("/feed", req.url);
    return NextResponse.redirect(feedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

async function verifyToken(
  tokenName: string,
  req: NextRequest
): Promise<boolean> {
  const token = req.cookies.get(tokenName);
  if (!token?.value) {
    return false;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("JWT secret not found in env");
    return false;
  }

  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(secret)
    );

    if (payload) {
    } else {
    }

    return Boolean(payload);
  } catch (err: any) {
    console.log(`failed to verify ${tokenName}`, err.message);
    return false;
  }
}
