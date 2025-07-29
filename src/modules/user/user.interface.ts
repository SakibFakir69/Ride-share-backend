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

export enum DriverStatus {
  APPROVED = "APPROVED",
  SUSPEND = "SUSPEND",
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
