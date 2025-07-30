// error catch
// all env one folder
// server
// eslint

// stack error whice file comes error

import express, { Request, Response } from "express";
import { email, json, z } from "zod";
import { User } from "../user/user.model";

import bcrpytjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { log } from "console";


 const logINUser = async (req: Request, res: Response) => {
  // clear cookies
  const { email, password } = req.body;

  const isUserxits = await User.findOne({ email: email });

  if (!isUserxits) {
    res.status(404).json({
      status: false,
      message: "User Not founded",
    });
  }

  const isHaspassword = bcrpytjs.compare(
    isUserxits?.password as string,
    password
  ) as JwtPayload;

  if (!isHaspassword) {
    res.status(400).json({
      status: false,
      message: "Password Not Match",
    });
  }

  // genrate token

  const payload = {
    id:isUserxits?._id,
    email: isUserxits?.email,
    role: isUserxits?.role,
    password: isUserxits?.password,
  };

  const token = jwt.sign({ payload }, "secrect_key", {
    expiresIn: "1d",
  });

  res.status(201).json({
    status: true,
    message: "User Login Successfull and Token Created",
    token: token,
  });
};


export const authController = {

  logINUser

}