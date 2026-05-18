import type { CookieOptions, Request } from "express";

const normalizeOrigin = (origin: string) => origin.trim().replace(/\/$/, "");

const getHeaderValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const isLocalhost = (hostname: string) => {
  return hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1";
};

export const getAllowedOrigins = () => {
  const origins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGIN,
  ]
    .flatMap(origin => origin?.split(",") ?? [])
    .map(origin => normalizeOrigin(origin))
    .filter(Boolean);

  return Array.from(new Set(origins));
};

export const isOriginAllowed = (origin?: string) => {
  if (!origin) {
    return true;
  }

  const allowedOrigins = getAllowedOrigins();

  return allowedOrigins.includes("*") ||
    allowedOrigins.includes(normalizeOrigin(origin));
};

export const getCookieOptions = (req: Request): CookieOptions => {
  const forwardedProto = getHeaderValue(req.headers["x-forwarded-proto"]);
  const requestIsLocalhost = isLocalhost(req.hostname);
  const isHttpsRequest = req.secure || forwardedProto === "https";
  const requiresCrossSiteCookie = !requestIsLocalhost;
  const cookieDomain = process.env.COOKIE_DOMAIN?.trim();

  return {
    httpOnly: true,
    secure: requiresCrossSiteCookie || isHttpsRequest,
    sameSite: requiresCrossSiteCookie || isHttpsRequest ? "none" : "lax",
    path: "/",
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  };
};
