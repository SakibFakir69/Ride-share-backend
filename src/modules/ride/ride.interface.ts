// ja ride request diba tr collection id

import { number } from "joi";

export enum VehicleType {
  CAR = "CAR",
  BIKE = "BIKE",
  SCOOTER = "SCOOTER",
  CNG = "CNG",
  OTHER = "OTHER",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export enum RideStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  CANCELLED = "CANCELLED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
  PENDING="  PENDING"
}

export enum DriverStatus {
  REJECT = "REJECT",
  ACCPET = "ACCPET",
  PENDING = "PENDING",
  NONE = "NONE",
}

export interface ILocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface IRiderRequest {
  rider_id: string;
  driver_id?: string;
  fare: number;
  location?: ILocation;
  destination?: ILocation;
  vehicle?: VehicleType;
  payment_status?: PaymentStatus;
  rider_status: RideStatus;
  driver_status?: DriverStatus;
  pick_up_location?: number | string;
  isCompleteRide: boolean;
}
