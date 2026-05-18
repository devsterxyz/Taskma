const normalizeOrigin = (origin: string) => origin.trim().replace(/\/$/, "");

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
