import { AccountStatus } from "./../user/user.interface";
import { Request, Response } from "express";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { Rides } from "../ride/ride.model";
import { start } from "repl";
import { createSecretKey } from "crypto";
import { $ZodCheckMinLength } from "zod/v4/core/checks.cjs";

// get all driver
// export const allDriver = async (req: Request, res: Response) => {
//   try {
//     // Get query params
//     const search = req.query.search as string;
// const availability_status = req.query.availability_status as string;
// const account_status = req.query.account_status as string; // ✅ fix this

//     //  drivers object , here we can add more object and search from here
//     const query: any = { role: Role.DRIVER };

//     console.log(search, "djfoksdnfl");
//     console.log(availability_status, "av");
//     console.log(account_status, "acc");

//     // Add availability filter if provided
//     if (availability_status) {
//       query.availability_status = availability_status;
//       // if true add to object
//     }

//     // Add account status filter if provided
//     if (account_status) {
//       query.account_status= account_status;
//       // if true add to object
//     }

//     if (search) {
//       const terms = search.split(" ");
//       console.log(terms, " terms");
//       // ["John", "Doe"]
//       query.$and = terms.map((term) => ({
//         $or: [
//           { name: { $regex: term, $options: "i" } },
//           { email: { $regex: term, $options: "i" } },
//         ],
//       }));
//     }

//     // Fetch data from MongoDB
//     const allData = await User.find(query);

//     if (allData.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: "No drivers found",
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       message: "All driver data fetched",
//       data: allData,
//     });
//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//       error: error.stack,
//     });
//   }
// };

export const allDriver = async (req: Request, res: Response) => {
  try {
    // Get query params and normalize
    let { search, availability_status, account_status } = req.query;

    const query: any = { role: Role.DRIVER };

    // Clean up params
    if (availability_status)
      availability_status = availability_status.toString().trim().toUpperCase();
    if (account_status)
      account_status = account_status.toString().trim().toUpperCase();
    if (search) search = search.toString().trim();

    // Apply filters
    if (availability_status) query.availability_status = availability_status;
    if (account_status) query.account_status = account_status;

    // Flexible search
    if (search) {
      const terms = search
        .split(" ")
        .map((t) => t.trim())
        .filter(Boolean);
      query.$and = terms.map((term) => ({
        $or: [
          { name: { $regex: term, $options: "i" } },
          { email: { $regex: term, $options: "i" } },
        ],
      }));
    }

    // Fetch from DB
    const allData = await User.find(query);

    if (!allData || allData.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No drivers found",
        query,
      });
    }

    return res.status(200).json({
      status: true,
      message: "All driver data fetched",
      data: allData,
      query,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: error.message,
      error: error.stack,
    });
  }
};

// Get all users (riders)
const allUser = async (req: Request, res: Response) => {
  try {
    const { search, account } = req.query;
    console.log(search, account);

    const query: any = { role: Role.RIDER };

    if (account) {
      query.account = account;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const allData = await User.find(query);

    if (allData.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No riders found",
        query: query,
      });
    }

    return res.status(200).json({
      status: true,
      message: "All rider data fetched",
      data: allData,
      query: query,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Get all rides
const allRides = async (req: Request, res: Response) => {
  try {
    const { createdAt, isCompleteRide, ride_status } = req.query;


    const query: any = {};

    if (isCompleteRide !== undefined) {
      query.isCompleteRide = isCompleteRide === "true"; // cast string to boolean
    }

    console.log({createdAt , isCompleteRide, ride_status})

 

    if (createdAt) {
      query.createdAt = {
        $gte: new Date(createdAt as string),
       
      };
    }


    const allRide = await Rides.find(query)
      .populate("driver_id", "name email")
      .populate("rider_id", "name email")
      .sort({ createdAt: -1 }); // newest first

    if (allRide.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No rides found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "All rides fetched",
      data: allRide,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Approve/suspend driver

const updateDriverStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const { account_status } = req.body;
    console.log(req.body);

    if (!userId) {
      return res.status(404).json({
        status: false,
        message: "Enter User Id",
      });
    }
    if (!account_status) {
      return res.status(404).json({
        status: false,
        message: "Enter your status",
      });
    }

    const userupdateStatus = await User.findByIdAndUpdate(
      userId,
      { account_status: account_status },
      {
        new: true,
      }
    );

    return res.status(201).json({
      status: true,
      message: "User Account Status Update",
      data: userupdateStatus,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
// Block/unblock user accounts

const update_Account = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const { account } = req.body;
    if (!userId) {
      return res.status(404).json({
        status: false,
        message: "Enter User Id",
      });
    }
    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Enter your status",
      });
    }

    const userupdateStatus = await User.findByIdAndUpdate(
      userId,
      { account: account },
      {
        new: true,
      }
    );

    return res.status(201).json({
      status: true,
      message: "User Account Status Update",
      data: userupdateStatus,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};



// driver count , user count 
// total revenue , ride voloum


const totalDetails = async (req:Request , res:Response)=>{

  try {
    const riderCount = await User.aggregate([

      {$match:{role:
        Role.RIDER
      }},
      // find all rider account 
      {$group:{_id:null , totalRider:{$sum:1}}},
    
    ])
    // total driver
    const driverCount = await User.aggregate([
      {$match:{role:Role.DRIVER}},
      {$group:{_id:null, totalDriver:{$sum:1}}},
    

    ])

        return res.status(200).json({
      status: true,
      message: "Successfully data fetched",
      rider: riderCount[0]?.totalRider || 0,
      driver: driverCount[0]?.totalDriver || 0,
    });

    
  } catch (error:any) {

    return res.status(500).json({
      status:false,
      message:`${error.message}`,
      error:error.stack
    })
    
  }
}


// rider voloum 

const rideVolume =async (req:Request , res:Response)=>{

  try {

    // kon month koto rider hoyeca tai bar korta hobba 

    const rideStats = await Rides.aggregate([

      {$group:{_id:{$month:"$createdAt"} , totalRide:{$sum:1}}},
      {$sort:{"_id":1}}



    ])



    return res.status(200).json({
      status:true,
      message:"Successfully fetched data",
      totalVoloum:rideStats,

    })

    
  } catch (error) {
    
  }
}

const revenuTrend = async (req:Request, res:Response)=>{

  try {

    const  revenueStats= await Rides.aggregate([

      {$group:{_id:{$month:"$createdAt" } ,totalRevenue:{$sum:"$fare"} }},
      {$sort:{"_id":1}}
    ])

    return res.status(200).json({
      status: true,
      message: "Successfully fetched revenue data",
      revenue: revenueStats,
    })


    
  } catch (error:any) {
      return  res.status(500).json({
      status: false,
      message: error.message,
      error:error.stack
    });
    
  }
}

const driverActivity = async (req: Request, res: Response) => {
  try {
    const stats = await Rides.aggregate([
      {
        $group: {
          _id: "$driver_id",       // group by driver
          totalRides: { $sum: 1 } // count rides
        }
      },
      { $sort: { totalRides: -1 } }, // most active first
      { $limit: 10 } // top 10 drivers
    ]);

    res.status(200).json({
      status: true,
      message: "Fetched driver activity",
      activity: stats,
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
};



export const adminController = {
  allDriver,
  allUser,
  allRides,
  updateDriverStatus,
  update_Account,
  totalDetails,
  driverActivity,
  rideVolume,
  revenuTrend
};
