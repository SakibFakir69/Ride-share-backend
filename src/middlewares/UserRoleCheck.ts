import { NextFunction, Request, Response } from "express";
import { any } from "joi";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AccountStatus, Role } from "../modules/user/user.interface";

interface AuthRequest extends Request {
  user?: {
    id?: string;
    email: string;
    role: Role;
    account_status: AccountStatus;
  };
}

const riderCheck = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user;
  console.log(user , " user");

  if (!user) {
   return res.status(401).json({
      status: false,
      message: "Unauthorized: No user info found.",
    });
  }

  if (user?.role !== Role.RIDER) {
    return res.status(401).json({
      status: false,
      message: "Access denied: Only riders can access this route.",
    });
  }

  if (user?.account_status === AccountStatus.BLOCK) {
    return res.status(401).json({
      status: false,
      message: "Your account is blocked. Please contact support.",
    });
  }

  next();

};

// driver check

const driverCheck = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user;



  console.log(user , " user");

  if (!user) {
   return res.status(401).json({
      status: false,
      message: "Unauthorized: No user info found.",
    });
  }

  if (user?.role !== Role.DRIVER) {
    return res.status(401).json({
      status: false,
      message: "Access denied: Only Driver can access this route.",
    });
  }

  if (user?.account_status === AccountStatus.BLOCK) {
    return res.status(401).json({
      status: false,
      message: "Your account is blocked. Please contact support.",
    });
  }

  next();
};

// admin check
const adminCheck = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user;
};



export const userRoleCheck = {
    riderCheck,driverCheck
}