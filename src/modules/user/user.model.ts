import { model, Schema } from "mongoose";
import {
  AccountStatus,
  Account_status, 
  AvailabilityStatus,
  DriverStatus,
  IUser,
  Role,
} from "./user.interface";


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
      min: [6, "Too short"],
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
      enum: Object.values(AccountStatus), // ✅ fixed enum
      default: Account_status.APPROVED,
    },
    driver_status: {
      type: String,
      enum: Object.values(DriverStatus),
      default: DriverStatus.PENDING,
    },
    account: {
      type: String,
      enum: Object.values(Account_status),
      default: AccountStatus.UNBLOCK,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("user",UserSchema);