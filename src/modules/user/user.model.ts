import { string } from "joi";
import mongoose, { model, Schema } from "mongoose";
import {
  AccountStatus,
  AvailabilityStatus,
  DriverStatus,
  IUser,
  Role,
} from "./user.interface";


// add another model store , history , earn, status , rate , 
// rider , driver


const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, "To small"],
    },
    phone: {
      type: Number,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.RIDER,
    },
    availability_status: {
      type: String,
      enum: Object.values(AvailabilityStatus),
      default: AvailabilityStatus.ONLINE,
    },
    account_status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.UNBLOCK,
    },

    // deleete
    driver_status: {
      type: String,
      enum: Object.values(DriverStatus),
      default: DriverStatus.PENDING,
    },
    account:{
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.UNBLOCK,

    }
  },

  { timestamps: true }
);


export const User = model<IUser>("users", UserSchema);
