import { Request, RequestHandler, Response } from "express";
import { User } from "../user/user.model";
import {
  AccountStatus,
  AvailabilityStatus,
  DriverStatus,
  IUser,
  Role,
} from "../user/user.interface";
import { Rides } from "./ride.model";
import { PaymentStatus, RideStatus } from "./ride.interface";
export interface AuthenticatedRequest extends Request {
  user?: IUser;   // <-- make it optional
}

// const rideRequest = async (req:AuthenticatedRequest, res: Response) => {

//   try {
//     const { destination, pickup } = req.body;
//     console.log(req.body, " req");

//     if (!destination || !pickup) {
//       return res.status(400).json({
//         status: false,
//         message: "Fill The Input Right Way",
//       });
//     }

//     const oneDriver = await User.findOne({ role: Role.DRIVER });

//     if (!oneDriver || oneDriver.account_status === AccountStatus.BLOCK) {
//       return res.status(404).json({
//         status: false,
//         message: "Not Founded Driver",
//       });
//     }

//     const id = req.user.id ;
//     console.log(id, " id ");
//     // if driver staus .in tranis === not snd data and snd wating list

//     //
//     const rideRequest = await Rides.create({
//       rider_id: id,

//       driver_id: oneDriver._id, // match driver here
//       fare: 100,
//       location: pickup,
//       destination: destination,
//       pick_up_location: pickup,
//       payment_status: PaymentStatus.UNPAID,
//       rider_status:RideStatus.PENDING,
//       driver_status: DriverStatus.NONE,
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Driver founded",
//       data: oneDriver,
//       deatils: rideRequest,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// ride cancel

const rideRequest = async (req: Request, res: Response) => {
  const authReq = req as Request & { user: IUser };

  try {
    console.log(req.body);
    const { current, destination } = req.body;

    if (!destination || !current) {
      return res.status(400).json({
        status: false,
        message: "Fill The Input Right Way",
      });
    }

    const oneDriver = await User.findOne({
      role: Role.DRIVER,
      availability_status: AvailabilityStatus.ONLINE,
    }).sort({ createdAt: -1 });

    console.log(oneDriver);

    if (!oneDriver) {
      return res.status(404).json({
        status: false,
        message: "Not Founded Driver",
        data: oneDriver,
      });
    }

    const id = authReq.user.id; // Now no TS error

    const rideRequest = await Rides.create({
      rider_id: id,
      driver_id: oneDriver._id,
      fare: 100,
      current: current,
      destination: destination,

      payment_status: PaymentStatus.UNPAID,
      rider_status: RideStatus.PENDING,
      driver_status: DriverStatus.NONE,
    });

    return res.status(200).json({
      status: true,
      message: "Driver founded",
      data: oneDriver,
      details: rideRequest,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const rideCancel = async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(userId);

  try {
    const latestRide = await Rides.findOne({ rider_id: userId }).sort({
      createdAt: -1,
    });

    console.log(latestRide, " ride ");

    if (!latestRide) {
      return res.status(404).json({
        status: false,

        message: "Ride not found",
      });
    }

    if (latestRide.rider_status === RideStatus.CANCELLED) {
      return res.status(200).json({
        status: true,
        message: "Ride Allready Cancled",
      });
    }

    // if driver recive you can not cancel

    if (latestRide.driver_status === DriverStatus.ACCEPT) {
      return res.status(400).json({
        status: true,
        message: "You Can Not Cancel Ride",
      });
    }

    //  save
    latestRide.rider_status = RideStatus.CANCELLED;

    await latestRide.save();

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

// const allRide = async (req:AuthenticatedRequest, res: Response) => {
//   try {
//     const id = req.user.id;

//     console.log(id, " me ");

//     const allData = await Rides.find({ rider_id: id , rider_status:{$ne:RideStatus.CANCELLED} });

//     console.log(id, allData);

//     if (!allData) {
//       return res.status(404).json({
//         status: false,
//         messsage: "User Data Not Founded",
//       });
//     }

//     const count = await Rides.countDocuments({ rider_id: id });

//     const totalCost = await Rides.aggregate([
//       { $match: { rider_id: id } },

//       { $group: { _id: id, totalFare: { $sum: "$fare" } } },
//       { $project: { _id: false, totalFare: true } },
//     ]);

//     return res.json({
//       status: true,
//       message: "Ride History",
//       data: allData,
//       meta: {
//         count: count,
//         totalCost: totalCost,
//       },
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

const allRide = async (req: Request, res: Response) => {
  try {
    // Cast here to assert `user` exists on req
    const authReq = req as Request & { user: IUser };

    const id = authReq.user.id;

    console.log(id, " me ");

    const allData = await Rides.find({
      rider_id: id,
      rider_status: { $ne: RideStatus.CANCELLED },
    });

    console.log(id, allData);

    if (!allData) {
      return res.status(404).json({
        status: false,
        messsage: "User Data Not Found",
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
        count,
        totalCost,
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

// payment
const payment:RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { payment_status } = req.body;
    const userID = req.user?.id;

    if (!userID) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized request",
      });
    }

    if (!Object.values(PaymentStatus).includes(payment_status)) {
      return res.status(400).json({
        status: false,
        message: "Invalid payment status",
      });
    }

    const newRide = await Rides.findOne({ rider_id: userID })
  .sort({ createdAt: -1 })
  .exec();
    console.log(newRide , userID ,payment_status, "new ride");

    if (!newRide) {
      return res.status(404).json({
        status: false,
        message: "No ride found for user",
      });
    }

    if (newRide.payment_status === PaymentStatus.UNPAID) {
      newRide.payment_status = payment_status;
      await newRide.save();

      return res.status(201).json({
        status: true,
        message: "Payment successful",
      });
    }

    return res.status(400).json({
      status: false,
      message: "Payment already completed or invalid status update",
    });

  } catch (error: any) {
    console.error("Payment Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const rideControllers = {
  rideRequest,
  rideCancel,
  allRide,
  payment
};
