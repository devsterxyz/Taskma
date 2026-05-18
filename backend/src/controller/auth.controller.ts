import type { Request, Response } from "express";
import { oauthLogin } from "../services/auth.service.js";
import { getCookieOptions } from "../utils/http.utils.js";

const getFrontendUrl = () => {
  return (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.redirect(`${getFrontendUrl()}/?oauth=failed`);
    }

    const { accessToken, refreshToken } = await oauthLogin(req.user);
    const cookieOptions = getCookieOptions(req);

    return res
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect(`${getFrontendUrl()}/?oauth=success`);
  } catch (error) {
    console.error("Google callback error:", error);

    return res.redirect(`${getFrontendUrl()}/?oauth=failed`);
  }
};
