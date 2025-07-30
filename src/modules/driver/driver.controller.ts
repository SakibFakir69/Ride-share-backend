import express, { Request, Response } from "express";
import { Rides } from "../ride/ride.model";
import { DriverStatus, RideStatus } from "../ride/ride.interface";
import { User } from "../user/user.model";
import { availableMemory } from "process";
import { AvailabilityStatus } from "../user/user.interface";

const requestPermission = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    const { ACCPET, REJECT } = req.body;

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
    if (REJECT) {
      return res.status(400).json({
        status: false,
        message: "Request Reject",
      });
    }

    lastestDrive.driver_status = ACCPET;

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
  const user = req.user;

  try {
    const id = user.id;

    const status = await Rides.findOne({ driver_id: id }).sort({
      createdAt: -1,
    });

    if (!status) {
      return res.status(404).json({
        status: false,
        message: "No Drive founded",
      });
    }

    const { status_update } = req.body;

    if (!status_update) {
      return res.status(400).json({
        status: false,
        message: "Input Your Status",
      });
    }

    status.rider_status = status_update;
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
  const user = req.user;

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
  const user = req.user;

  try {
    const id = user.id;

    const user_data = await User.findById(id);

    if (!user_data) {
      return res.status(404).json({
        status: false,
        message: "User Not founded",
      });
    }
    const { user_status } = req.body;
    user_data.availability_status = user_status;

    await user_data.save();

    return res.status(201).json({
      status: false,
      message: "User Status Update",
      data: user_data,
    });
  } catch (error) {
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
