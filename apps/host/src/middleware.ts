import { type NextRequest, NextResponse } from "next/server";

import { isAuthorized, redirectToLogin } from "./shared/lib/helpers/auth";

export async function middleware(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
