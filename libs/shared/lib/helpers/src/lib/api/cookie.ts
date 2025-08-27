export function parseCookieHeader(cookieString?: string) {
  const cookies: any = {};
  if (!cookieString) {
    return cookies;
  }

  cookieString.split(";").forEach((cookiePair) => {
    const parts = cookiePair.split("=");
    if (parts.length === 2) {
      const name = decodeURIComponent(parts[0].trim());
      const value = decodeURIComponent(parts[1].trim());
      cookies[name] = value;
    }
  });
  return cookies;
}
