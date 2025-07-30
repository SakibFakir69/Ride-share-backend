export enum Role {
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  DRIVER = "DRIVER",
}

export enum AvailabilityStatus {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
}

export enum AccountStatus {
  BLOCK = "BLOCK",
  UNBLOCK = "UNBLOCK",
}

export enum  Account_status {
  APPROVED = "APPROVED",
  SUSPEND = "SUSPEND",
}

export enum DriverStatus{
  REJECT="REJECT",
  ACCPET="ACCPET",
  PENDING="PENDING",
  NONE="NONE"

}

export enum Status {

}

export interface IUser {
  name?: string;
  email: string;
  phone?: number;
  password: string;
  role?: Role;

  // only for drivver

  availability_status?: AvailabilityStatus;

  account_status?: AccountStatus;

  driver_status?: DriverStatus;
 
}
