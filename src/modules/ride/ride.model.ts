import { model, Schema } from "mongoose";
import {
  DriverStatus,
  IRiderRequest,
  PaymentStatus,
  RideStatus,
} from "./ride.interface";

const LocationSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
  },
  { _id: false } // prevent separate _id for nested object
);

const rideSchema = new Schema<IRiderRequest>(
  {
    rider_id: {
      type: String,
      ref: "user",
      required: true,
    },
    driver_id: {
      type: String,
      ref: "user",
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    location: {
      type: LocationSchema,
      required: true,
    },
    destination: {
      type: LocationSchema,
      required: true,
    },
    payment_status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.UNPAID,
    },
    rider_status: {
      type: String,
      enum: Object.values(RideStatus),
    },
    driver_status: {
      type: String,
      enum: Object.values(DriverStatus),
    },
    pick_up_location: {
      type: LocationSchema,
      required: true,
    },
    isCompleteRide: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);



// pre save 
// function driver ar details







export const Rides = model<IRiderRequest>("ride", rideSchema);
