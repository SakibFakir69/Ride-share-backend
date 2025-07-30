// error catch
// all env one folder
// server
// eslint

// stack error whice file comes error

import express, { Request, Response } from "express";
import { email, json, z } from "zod";
import { User } from "./user.model";
import {
  AccountStatus,
  AvailabilityStatus,
  DriverStatus,
  IUser,
  Role,
} from "./user.interface";
import bcrpytjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

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
    .default(DriverStatus.NONE),
});

const createUser = async (req: Request, res: Response) => {
  // haspassword ,
  // role
  // global error
  // complete user , driver

  try {
    const result = userZodValidationTest.parse(req.body);
    // already check account

    const isUserxits = await User.findOne({ email: result.email });

    if (isUserxits) {
      res.status(400).json({
        status: false,
        message: "User Already Exits",
      });
    }

    if (!result) {
      res.status(404).json({
        status: false,
        message: "faild to info validation",
      });
    }

    const hashPassword = await bcrpytjs.hash(result.password, 10);

    const newUser = {
      ...result,
      password: hashPassword,
    };

    const user = await User.create(newUser);

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
