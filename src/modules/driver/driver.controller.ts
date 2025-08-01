import { Request, Response } from "express";
import { Rides } from "../ride/ride.model";

import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const requestPermission = async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user;

  try {
    const status = req.body;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = user.id;

    const lastestDrive = await Rides.findOne({ driver_id: id }).sort({
      createdAt: -1,
    });

    if (!lastestDrive) {
      return res.status(404).json({
        status: false,
        message: "No Drive founded",
      });
    }
    // mangae reject on rider
    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Accpet or Reject",
      });
    }

    lastestDrive.driver_status = status.driver_status;

    await lastestDrive.save();

    return res.status(201).json({
      status: true,
      message: "Drive Status Update",
      data: lastestDrive,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const rideStatus = async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user;

  try {
    const id = user?.id ;

    const status = await Rides.findOne({ driver_id: id }).sort({
      createdAt: -1,
    });
    console.log(id, status);
    if (!status) {
      return res.status(404).json({
        status: false,
        message: "No Drive founded",
      });
    }

    const { status_update } = req.body;
    console.log(status_update, status, " status ");

    if (!status_update) {
      return res.status(400).json({
        status: false,
        message: "Input Your Status",
      });
    }

    status.rider_status = status_update.rider_status;
    await status.save();

    return res.status(201).json({
      status: true,
      message: "Ride Status Update",
      data: status,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const earningHistory = async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const id = user.id;
    const totalRidesDriver = await Rides.find({ driver_id: id });
    const earning_history = await Rides.aggregate([
      { $match: { driver_id: id } },
      { $group: { _id: id, totalEarning: { $sum: "$fare" } } },
      { $project: { _id: false, totalEarning: true } },
    ]);
    const count = await Rides.countDocuments({ driver_id: id });

    return res.status(200).json({
      status: true,
      meta: {
        totalEarning: earning_history,
        totalRide: count,
        data: totalRidesDriver,
      },
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      staus: false,
      message: error.message,
    });
  }
};

const onlineStatus = async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { user_status } = req.body;
  try {
    const id = user.id;

    const user_data = await User.findByIdAndUpdate(
      id,
      {
        availability_status: user_status,
      },
      { new: true }
    );

    if (!user_data) {
      return res.status(404).json({
        status: false,
        message: "User Not founded",
      });
    }

    console.log(user_status);

    // user_data.availability_status = user_status;

    await user_data.save();

    return res.status(201).json({
      status: true,
      message: "User Status Update",
      data: user_data,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const driverController = {
  requestPermission,
  rideStatus,
  earningHistory,
  onlineStatus,
};
