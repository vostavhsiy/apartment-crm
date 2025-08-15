import { REFRESH_TOKEN_NAME } from "@apartment-crm/constants";
import { JwtPayload } from "@apartment-crm/types";
import { jwtVerify } from "jose";

import { ROUTES } from "../api/routes";
import { publicInstance } from "../axios";
import { settings } from "../env";

const secret = new TextEncoder().encode(settings.JWT_SECRET);

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify<JwtPayload>(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
};

export async function refreshAccessToken(refreshToken: string) {
  try {
    if (!refreshToken) return null;

    const response = await publicInstance.get<{ accessToken: string }>(
      ROUTES.auth.refreshAccessToken.path,
      {
        headers: {
          Cookie: `${REFRESH_TOKEN_NAME}=${refreshToken}`,
        },
      },
    );
    if (!response.data?.accessToken) {
      return null;
    }

    const newAccessToken = response.data.accessToken;
    if (!newAccessToken) {
      return null;
    }

    return newAccessToken;
  } catch (error) {
    return null;
  }
}
