import express, { Request, Response } from "express";
import { User } from "../user/user.model";
import { AccountStatus, DriverStatus, Role } from "../user/user.interface";
import { Rides } from "./ride.model";
import { PaymentStatus, RiderStatus } from "./ride.interface";
import { JwtPayload } from "jsonwebtoken";

const rideRequest = async (req: Request, res: Response) => {
  try {
    const { destination, pickup } = req.body;
    console.log(req.body, " req");

    // if (!destination || !pickup) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Fill The Input Right Way",
    //   });
    // }
    // driver match

    const oneDriver = await User.findOne({ role: Role.DRIVER });

    if (!oneDriver || oneDriver.account_status === AccountStatus.BLOCK) {
      return res.status(404).json({
        status: false,
        message: "Not Founded Driver",
      });
    }

    const id = req.user.id as string;
    console.log(id, " id ");

    // if driver staus .in tranis === not snd data and snd wating list

    //
    const rideRequest = await Rides.create({
      rider_id: id,

      driver_id: oneDriver._id, // match driver here
      fare: 100,
      location: pickup,
      destination: destination,
      pick_up_location: pickup,
      payment_status: PaymentStatus.UNPAID,
      rider_status: RiderStatus.REQUESTED,
      driver_status: DriverStatus.NONE,
    });

    return res.status(200).json({
      status: true,
      message: "Driver founded",
      data: oneDriver,
      deatils: rideRequest,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ride cancel

const rideCancel = async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(userId);

  try {
    const latestRide = await Rides.findOne({ rider_id: userId }).sort({
      createdAt: -1,
    });

    console.log(latestRide);

    if (!latestRide) {
      return res.status(404).json({
        status: false,

        message: "Ride not found",
      });
    }

    if (latestRide.rider_status === RiderStatus.CANCELLED) {
      return res.status(200).json({
        status: true,
        message: "Ride Allready Cancled",
      });
    }

    // if driver recive you can not cancel
  

    if(latestRide.driver_status===DriverStatus.ACCPET){
      return res.status(400).json({
        status:true,
        message:"You Can Not Cancel Ride"
      })
    }



    //  save
    latestRide.rider_status=RiderStatus.CANCELLED;



    return res.status(200).json({
      status: true,
      message: "Ride cancelled successfully",
      data: latestRide,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: false,
      messafe: error.message,
    });
  }
};

// my all ride

const allRide = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;

    console.log(id, " me ");

    const allData = await Rides.find({ rider_id: id });
    console.log(id, allData);

    if (!allData) {
      return res.status(404).json({
        status: false,
        messsage: "User Data Not Founded",
      });
    }

    const count = await Rides.countDocuments({ rider_id: id });

    const totalCost = await Rides.aggregate([
      { $match: { rider_id: id } },

      { $group: { _id: id, totalFare: { $sum: "$fare" } } },
      { $project: { _id: false, totalFare: true } },
    ]);

    return res.json({
      status: true,
      message: "Ride History",
      data: allData,
      meta: {
        count: count,
        totalCost: totalCost,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const rideControllers = {
  rideRequest,
  rideCancel,
  allRide,
};
