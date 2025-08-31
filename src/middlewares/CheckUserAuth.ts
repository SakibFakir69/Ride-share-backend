import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization ||
      req.cookies.accessToken ||
      req.headers.authorization?.split(" ")[1];
    console.log("Cookies received:", req.cookies);

    console.log(token, " token aklnsdlk;ans");

    console.log(token, " token");

    if (!token) {
  return res.status(401).json({
    status: false,
    message: "Token required",
  });
}

    const decodeToken = jwt.verify(
      token as string,
      "secrect_key"
    ) as JwtPayload;

    (req as any).user = decodeToken;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Forbidden: Invalid or expired token",
    });
  }
};
