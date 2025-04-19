import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // This function will be called after the JWT is validated
    // req.nextUrl.pathname is the path of the request
    // req.nextauth.token is the JWT token

    // Example: Only allow admin users to access /admin
    // if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }

    // Example: Redirect authenticated users from /login to /dashboard
    // if (req.nextUrl.pathname === "/login" && req.nextauth.token) {
    //   return NextResponse.redirect(new URL("/dashboard", req.url));
    // }

    // Default behavior: If authenticated, allow access. Otherwise, next-auth redirects to login.
    return NextResponse.next();
  },
  {
    callbacks: {
      // This callback is called before the middleware function
      authorized: ({ token, req }) => {
        // Check if user is authenticated
        if (!token) return false;
        
        // Admin routes require ADMIN role
        if (req.nextUrl.pathname.startsWith('/dashboard/admin') && token.role !== 'ADMIN') {
          return false;
        }

        // User routes require at least NORMAL role
        if (req.nextUrl.pathname.startsWith('/dashboard') && !['NORMAL', 'ADMIN'].includes(token.role)) {
          return false;
        }

        return true;
      },
    },
    // Specify the pages that should not be protected by the middleware
    // This should include your login page
    pages: {
      signIn: '/login',
    },
    // Add a matcher to specify which routes the middleware should run on
    matcher: [
      '/dashboard/:path*', // Protect dashboard and its sub-routes
      '/api/users/:path*', // Protect user-related API routes
      // Add other protected routes here as needed
    ],
  }
);