import { Request, Response } from "express";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { Rides } from "../ride/ride.model";

// Get all drivers
const allDriver = async (req: Request, res: Response) => {
  try {
    const allData = await User.find({ role: Role.DRIVER });

    if (allData.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No drivers found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "All driver data fetched",
      data: allData,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Get all users (riders)
const allUser = async (req: Request, res: Response) => {
  try {
    const allData = await User.find({ role: Role.RIDER });

    if (allData.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No riders found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "All rider data fetched",
      data: allData,
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
    const allRide = await Rides.find({});

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

const updateDriverStatus =async (req: Request, res: Response)=>{

  try{

    const userId = req.params.id as string;
    const {status }= req.body;
    if(!userId)
    {
      return res.status(404).json({
        status:false,
        message:"Enter User Id"
      })

    }
    if(!status){
      return res.status(404).json({
        status:false,
        message:"Enter your status"
      })
    }

    const userupdateStatus = await User.findByIdAndUpdate(userId,{account_status:status},{
      new:true
    } )

    return res.status(201).json({
      status:true,
      message:"User Account Status Update",
      data:userupdateStatus,
    })



  }catch(error:any)
  {
    return res.status(500).json({
      status:false,
      message:error.message
    })

  }




}
// Block/unblock user accounts

const update_Account =async (req: Request, res: Response)=>{

  try{

    const userId = req.params.id as string;
    const {status }= req.body;
    if(!userId)
    {
      return res.status(404).json({
        status:false,
        message:"Enter User Id"
      })

    }
    if(!status){
      return res.status(404).json({
        status:false,
        message:"Enter your status"
      })
    }

    const userupdateStatus = await User.findByIdAndUpdate(userId,{account:status},{
      new:true
    } )

    return res.status(201).json({
      status:true,
      message:"User Account Status Update",
      data:userupdateStatus,
    })



  }catch(error:any)
  {
    return res.status(500).json({
      status:false,
      message:error.message
    })

  }




}


export const adminController =  { allDriver, allUser, allRides ,updateDriverStatus,update_Account};
