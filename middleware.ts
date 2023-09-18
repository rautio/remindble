import { withAuth } from "next-auth/middleware";
import { publicRoutes } from "@/lib/constants";

// Middleware is applied to all routes, use conditionals to select

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
