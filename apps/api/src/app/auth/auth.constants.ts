export const jwtConstants = {
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
};

export const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 1000; // 1 hour
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

export const CLIENT_URL = process.env.CLIENT_URL;
