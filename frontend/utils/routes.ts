const protectedRoutes = new Set([
  "/feed",
  "/createPost",
  "/messages",
  "/notifications",
  "/search",
  "/settings",
]);

const profileRoutePattern = /^\/profile\/[^/]+\/?.*$/;
const postRoutePattern = /^\/post\/[^/]+\/?.*$/;

const changeToFeedRoutes = new Set([
  "/",
  "/login",
  "/signup",
]);

export function isProtectedRoute(pathname: string): boolean {
  return (
    protectedRoutes.has(pathname) ||
    profileRoutePattern.test(pathname) ||
    postRoutePattern.test(pathname)
  );
}

export function toBeRedirectedRoutes(pathname: string): boolean {
  return changeToFeedRoutes.has(pathname);
}

const adminRoutes = /^\/admin(\/.*)?$/;
const changeToAdminDashboardRoutes = new Set(["/admin"]);

export function isProtectedAdminRoute(pathname: string): boolean {
  return !changeToAdminDashboardRoutes.has(pathname);
}

export function toBeRedirectedAdminRoutes(pathname: string): boolean {
  return changeToAdminDashboardRoutes.has(pathname);
}
