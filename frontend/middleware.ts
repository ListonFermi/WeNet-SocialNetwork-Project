import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/feed"]; //removed settings route
const toBeRedirectedRoutes = ["/", "/login", "/signup"];
const profileRoutePattern = /^\/profile\/[^/]+\/?.*$/;

const adminRoutes = /^\/admin\/.+/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Improved matcher for static assets
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  if (adminRoutes.test(pathname)) {
    const tokenVerified = await verifyToken("adminToken", req);
    if (tokenVerified) return NextResponse.next();
    else return NextResponse.redirect(new URL("/admin", req.url));
  }

  const tokenVerified = await verifyToken("token", req);

  // Protected Routes logic - redirect to home if it doesn't have token in cookies
  const isProtectedRoute =
    protectedRoutes.includes(pathname) || profileRoutePattern.test(pathname);

  if (isProtectedRoute && !tokenVerified) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ToBeRedirected Routes logic - redirect to feed if it has token in cookies
  const isToBeRedirectedRoute = toBeRedirectedRoutes.includes(pathname);

  if (isToBeRedirectedRoute && tokenVerified) {
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
  console.log({ token });
  if (!token?.value) {
    console.log(`${tokenName} not found in cookies`);
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

    console.log({payload})
    
    if(payload){

    }else{

    }


    return Boolean(payload);
  } catch (err: any) {
    console.log(`failed to verify ${tokenName}`, err.message);
    return false;
  }
}
