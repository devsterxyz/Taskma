import type { Request, Response } from "express";
import { oauthLogin } from "../services/auth.service.js";

const getFrontendUrl = () => {
  return (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.redirect(`${getFrontendUrl()}/?oauth=failed`);
    }

    const { accessToken, refreshToken } = await oauthLogin(req.user);
    const params = new URLSearchParams({
      accessToken,
      refreshToken,
    });

    return res.redirect(`${getFrontendUrl()}/oauth-success?${params.toString()}`);
  } catch (error) {
    console.error("Google callback error:", error);

    return res.redirect(`${getFrontendUrl()}/?oauth=failed`);
  }
};
