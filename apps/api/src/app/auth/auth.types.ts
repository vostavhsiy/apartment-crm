export interface JwtPayload {
  sub: string; // User ID
  role: string; // User role
  iat?: number; // Issued at
  exp?: number; // Expiration time
}
