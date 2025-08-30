// error catch
// all env one folder
// server
// eslint

// stack error whice file comes error

import  { Request, Response } from "express";
import {  regex, z } from "zod";
import { User } from "./user.model";
import {
  Account_status,
  AccountStatus,
  AvailabilityStatus,
  DriverStatus,

  Role,
} from "./user.interface";
import bcrpytjs from "bcryptjs";
import { Rides } from "../ride/ride.model";
import { SortOrder } from "mongoose";


// user create

const userZodValidationTest = z.object({
  name: z.string().optional(),
  email: z.email().includes("@"),
  password: z.string().min(6),
  phone: z.number().optional(),
  role: z.enum(Object.values(Role)).default(Role.RIDER).optional(),
  availability_status: z
    .enum(Object.values(AvailabilityStatus))
    .default(AvailabilityStatus.ONLINE),
  account_status: z
    .enum(Object.values(AccountStatus))
    .default(AccountStatus.UNBLOCK),
  driver_status: z
    .enum(Object.values(DriverStatus))
    .default(DriverStatus.NONE),
});

const createUser = async (req: Request, res: Response) => {
  // haspassword ,
  // role
  // global error
  // complete user , driver

  try {
    const result = userZodValidationTest.parse(req.body);
    // already check account

    const isUserxits = await User.findOne({ email: result.email });

    if (isUserxits) {
      res.status(400).json({
        status: false,
        message: "User Already Exits",
      });
    }

    if (!result) {
      res.status(404).json({
        status: false,
        message: "faild to info validation",
      });
    }

    const hashPassword = await bcrpytjs.hash(result.password, 10);

    const newUser = {
      ...result,
      password: hashPassword,
    };

    const user = await User.create(newUser);

    res.status(201).json({
      status: true,
      message: "User Created Successfully!",
      data: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Faild To Create User",
      error: error.message,
    });
  }
};

// update profile

interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role?: string;
  }
}

const updateProfile = async(req:AuthRequest, res:Response)=>{

  try{

    if(!req.user)
    {
      return res.status(404).json({
        status:false,
        message:"user not founed"
      })
    }

    const userId = req?.user.id;

    const data = await User.findById(userId);


    // check condition 

    if(data?.account==="BLOCK" || data?.account==="SUSPEND" ){
      return res.status(400).json({
        status:false,
        message:"You can not update profile"
      })
    }

  


    const updateUser = await User.findByIdAndUpdate(userId, req.body,{new:true});

    



    


    return res.status(200).json({
      status:true,
      message:"User update succesfully",
      data:updateUser,
      
    })



  }catch(error:any){


    console.log(error.message);

    return res.status(500).json({
      status:false,
      message:"failded to user update",
      error:error.stack

    })



  }

}

// ride history 


// const rideHistory = async(request:AuthRequest, response:Response)=>{


//   try {
//     const userId = request?.user?.id;
//     const page =Number(request.query.page) || 1;
//     const limit = Number(request.query.limit )|| 10;
//     const sortBy = request.query.sortBy || "ASC"
//     const search = request.query.search as string;
//     const fare = request.query.fare ;
//     const destination = request.query.destination;


    

//     console.log(page, limit, search)



//     const filter :any= {rider_id:userId};


//     if(search)
//     {
//       filter.$or=[
//         {destination:{$regex:
//           search
//         }, $options:"i"},
//         {fare:{$regex:search},$options:"i"}
//       ]
//     }


//     // order 

//     let order:number = request.query.sortBy==='asc' ? 1 : -1;





//     const rideHistory = await Rides.find({rider_id:userId}).sort({createdAt:order}).skip((page-1)*limit).limit(limit);

//     const totalDocument = await Rides.countDocuments();


//     if(!rideHistory){
//       return response.status(404).json({
//         status:false,
//         message:"No Ride Founded"
//       })
//     }

//     return response.json({
//       status:true,
//       message:"Ride History Fetched Succesfully",
//       data:rideHistory , 
//       meta:{
//         total:Math.ceil(totalDocument/limit),
//         page,
//         limit,
//       }
//     })

    
//   } catch (error:any) {

//     return response.status(500).json({
//       status:false,
//       message:"Failed to data fetch",
//       error:error.stack
//     })
    
//   }





// }


const rideHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ status: false, message: "Unauthorized" });

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Search & filters
    const search = (req.query.search as string) || "";
    const status = req.query.status as string;
    const minFare = req.query.minFare ? Number(req.query.minFare) : undefined;
    const maxFare = req.query.maxFare ? Number(req.query.maxFare) : undefined;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

    // Sorting
    const sortBy = (req.query.sortBy as string)?.toLowerCase() || "desc";
    const order: SortOrder = sortBy === "asc" ? "asc" : "desc";

    // Build filter
    let filter: any = { rider_id: userId };

    // Search by string fields and fare
    if (search) {
      const fareSearch = isNaN(Number(search)) ? undefined : Number(search);
      filter.$or = [
        { current: { $regex: search, $options: "i" } },
        { destination: { $regex: search, $options: "i" } },
        { payment_status: { $regex: search, $options: "i" } },
        { rider_status: { $regex: search, $options: "i" } },
        ...(fareSearch !== undefined ? [{ fare: fareSearch }] : []),
      ];
    }

    // Status filter
    if (status) filter.rider_status = status;

    // Fare range
    if (minFare !== undefined || maxFare !== undefined) {
      filter.fare = {};
      if (minFare !== undefined) filter.fare.$gte = minFare;
      if (maxFare !== undefined) filter.fare.$lte = maxFare;
    }

    // Date range
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = startDate;
      if (endDate) filter.createdAt.$lte = endDate;
    }

    // Query database
    const rides = await Rides.find(filter)
      .sort({ createdAt: order })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalDocs = await Rides.countDocuments(filter);

    if (rides.length === 0) {
      return res.status(404).json({ status: false, message: "No rides found" });
    }

    return res.json({
      status: true,
      message: "Ride history fetched successfully",
      data: rides,
      meta: {
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit),
        page,
        limit,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ status: false, message: "Failed to fetch ride history", error: error.message });
  }
};

export default rideHistory;


// ride deatils

interface re extends Request{

  user?:{
    id:string
  }
}

const rideDetails =async (req:AuthRequest, res:Response)=>{

  try {

    const userId = req.user?.id;

    const data = await Rides.find({rider_id:userId});

    if(!data)
    {
      return res.status(400).json({
        status:false,
        message:"Data not founed"
      })
    }



    return res.status(200).json({
      status:true,
      message:"Data Fetched Succesfully",
      data:data,
      meta:{
        totalRide:data.length,

      }
    })

    
  } catch (error) {
    
  }


}



// 












export const userControllers = {
  createUser,updateProfile,rideHistory,rideDetails

};
