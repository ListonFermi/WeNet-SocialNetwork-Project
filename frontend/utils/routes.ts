const protectedRoutes = new Set([
  "/feed",
  "/createPost",
  "/forgotPassword/sendEmail",
  "/messages",
  "/notifications",
  "/search",
  "/settings",
]);

const profileRoutePattern = /^\/profile\/[^/]+\/?.*$/;
const postRoutePattern = /^\/post\/[^/]+\/?.*$/;

const changeToFeedRoutes = new Set(["/", "/login", "/signup"]);

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
