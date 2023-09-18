import { withAuth } from "next-auth/middleware";

// Middleware is applied to all routes, use conditionals to select

const publicRoutes = ["/", "/home", "/about", "/sign-in", "/sign-up"];

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (publicRoutes.indexOf(req.nextUrl.pathname) > -1) {
        return true;
      }
      return token !== null;
    },
  },
});
