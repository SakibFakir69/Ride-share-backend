import { NextFunction, Request, Response } from "express";
import { any } from "joi";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log(token, " token");

  if (!token) {
    res.status(401).json({
      status: false,
      message: "Token required",
    });
  }

  try {
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
