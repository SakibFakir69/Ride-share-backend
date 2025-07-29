// error catch
// all env one folder
// server
// eslint

// stack error whice file comes error

import express, { Request, Response } from "express";
import { email, z } from "zod";
import { User } from "./user.model";
import {
  AccountStatus,
  AvailabilityStatus,
  DriverStatus,
  IUser,
  Role,
} from "./user.interface";
import { any } from "joi";

// user create

const userZodValidationTest = z.object({
  name: z.string().optional(),
  email: z.email().includes("@"),
  password: z.string().min(6),
  phone: z.number().optional(),
  role: z.enum(Object.values(Role)).default(Role.RIDER).optional(),
  availability_status: z
    .enum(Object.values(AvailabilityStatus))
    .default(AvailabilityStatus.ONLINE),
  account_status: z
    .enum(Object.values(AccountStatus))
    .default(AccountStatus.UNBLOCK),
  driver_status: z
    .enum(Object.values(DriverStatus))
    .default(DriverStatus.APPROVED),
});

const createUser = async (req: Request, res: Response) => {
  // haspassword ,
  // role
  // global error
  // complete user , driver

  try {
    const result = userZodValidationTest.parse(req.body);

    if (!result) {
      res.status(404).json({
        status: false,
        message: "faild to info validation",
      });
    }

    const user = await User.create(result);

    res.status(201).json({
      status: true,
      message: "User Created Successfully!",
      data: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Faild To Create User",
      error: error.message,
    });
  }
};







export const userControllers = {
  createUser,
};
