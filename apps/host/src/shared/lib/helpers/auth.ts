import { PublicRoutes } from "@/shared/config/routes/routes.public";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "@apartment-crm/constants";
import { NextRequest, NextResponse } from "next/server";

import { refreshAccessToken, verifyToken } from "./jwt";

export function getTokens(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_NAME)?.value;
  return { accessToken, refreshToken };
}

export const isAuthorized = async (request: NextRequest) => {
  const { accessToken, refreshToken } = getTokens(request);

  const payload = await verifyToken(String(accessToken));

  if (payload) return true;

  if (!refreshToken) return false;

  const newAccessToken = await refreshAccessToken(refreshToken);

  if (newAccessToken) return true;

  return false;
};

export function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL(PublicRoutes.SIGN_IN, request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}
