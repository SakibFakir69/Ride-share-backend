import { Request, Response } from "express";
import { Rides } from "../ride/ride.model";

import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import { floatSafeRemainder } from "zod/v4/core/util.cjs";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const requestPermission = async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user;

  try {
    const { driver_status } = req.body;

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
    if (!driver_status) {
      return res.status(400).json({
        status: false,
        message: "Accpet or Reject",
      });
    }

    lastestDrive.driver_status = driver_status;

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

// lasted request

const lastestRides = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const userId = req.user.id;
    const lastestRides = await Rides.findOne({
      driver_id: userId,
      isCompleteRide: false,
    }).sort({ createdAt: -1 });
    // bug here time related
    console.log(lastestRides);
    if (!lastestRides) {
      return res.status(404).json({
        status: false,
        message: "No Rides Founded",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Got new rides",
      data: lastestRides,
    });
  } catch (error: any) {
    return res.status(500).json({
      staus: false,
      message: "No Current Ride founded",
      error: error.stack,
    });
  }
};

const rideStatus = async (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user;

  try {
    const id = user?.id;

    const status = await Rides.findOne({ driver_id: id ,isCompleteRide:false}).sort({
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

    // Update fields if they exist
    if (status_update.rider_status) {
      status.rider_status = status_update.rider_status;

      // Automatically mark ride complete
      if (status_update.rider_status === "COMPLETED") {
        status.isCompleteRide = true;
      }
    }

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
    const totalRidesDriver = await Rides.find({ driver_id: id,  isCompleteRide: true});
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
// ride history 
const rideHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sortBy = req.query.sortBy === "asc" ? 1 : -1;
    const status = req.query.status; // optional filter

    const filter: any = { driver_id: userId, isCompleteRide: true };
    if (status) filter.driver_status = status;

    const totalDocument = await Rides.countDocuments(filter);
    const totalPages = Math.ceil(totalDocument / limit);

    const allRideByDriver = await Rides.find(filter)
      .sort({ createdAt: sortBy })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      status: true,
      message: "All Driver Ride History Fetched",
      data: allRideByDriver,
      meta: {
        totalPages,
        page,
        limit,
        totalDocument,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "No data found",
      error: error.stack,
    });
  }
};




export const driverController = {
  requestPermission,
  rideStatus,
  earningHistory,
  onlineStatus,
  lastestRides,
  rideHistory
};
