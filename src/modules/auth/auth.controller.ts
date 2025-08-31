// error catch
// all env one folder
// server
// eslint

// stack error whice file comes error

import { Request, Response } from "express";

import { User } from "../user/user.model";

import bcrpytjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { setAuthCookie } from "../../utils/setCookies";

// const logINUser = async (req: Request, res: Response) => {
//   // clear cookies
//   const { email, password } = req.body;

//   const isUserxits = await User.findOne({ email: email });

//   if (!isUserxits) {
//     res.status(404).json({
//       status: false,
//       message: "User Not founded",
//     });
//   }

//   const isHaspassword = bcrpytjs.compare(
//     isUserxits?.password as string,
//     password
//   ) as JwtPayload;

//   if (!isHaspassword) {
//     res.status(400).json({
//       status: false,
//       message: "Password Not Match",
//     });
//   }

//   // genrate token

//   const payload = {
//     id: isUserxits?._id,
//     email: isUserxits?.email,
//     role: isUserxits?.role,
  
//   };

//   console.log(payload, " auth payload ");

//   const accessToken = jwt.sign({ payload }, "secrect_key", {
//     expiresIn: "1d",
//   });
//   const refreshToken = jwt.sign({ payload }, "refresh_key", {
//     expiresIn: "1d",
//   });

//   const token = {
//     accessToken,
//     refreshToken,
//   };

//   console.log(token, " auth token ");
//   setAuthCookie(res, token);

//   /// res.cookies("acces".{});


//   console.log("set cookies");

//   res.status(201).json({
//     status: true,
//     message: "User Login Successfull and Token Created",
//     accessToken: token.accessToken,
//     refreshToken: token.refreshToken,
//   });
// };



// user info



const logINUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    const isHaspassword = await bcryptjs.compare(password, isUserExists.password);
    if (!isHaspassword) {
      return res.status(400).json({
        status: false,
        message: "Password Not Match",
      });
    }

    const payload = {
      id: isUserExists._id,
      email: isUserExists.email,
      role: isUserExists.role,
    };

    const accessToken = jwt.sign(payload, "secrect_key", { expiresIn: "1d" });
    const refreshToken = jwt.sign(payload, "refresh_key", { expiresIn: "7d" });

    const token = { accessToken, refreshToken };

    setAuthCookie(res, token); // sets HTTP-only cookies

    res.status(200).json({
      status: true,
      message: "User Login Successful and Token Created",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Failed to login user",
      error: error.message,
    });
  }
};


interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role?: string;
  };
}

const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    console.log(user, " user ");

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User unAuthorize" });
    }

    const userInfo = await User.findById(user?.id);

    return res.status(200).json({
      status: true,
      message: "User info fetch successfully",
      data: userInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

// logout


const logoutUser = async(req:Request, res:Response)=>{

  try{


    res.clearCookie("accessToken" ,{
      httpOnly:true,
      secure:true,
      sameSite:"none"
    })
    res.clearCookie("refreshToken",{
      httpOnly:true,
      secure:true,
      sameSite:"none"
    })
    

    return res.status(200).json({
      status:true,
      message:"Log out successfully"
    })


  }catch(error)
  {

    return res.status(500).json({
      status:false,
      message:"Faild to logout"
    })

  }

}


// create new password 

// const createNewPassword = async (req:AuthRequest , res:Response)=>{

//   try {
//     const {oldPassword , newpassword } = req.body;

//     const user= req.user?.id;

//     if(!user)
//     {
//       return res.status(401).json({
//         status:false,
//         message:"Unauthorize"
//       })
//     }

//     // current password 
//     const currentUser=await User.findOne({id:user});
    

//     const isPasswordMatch = await bcrpytjs.compare(oldPassword, currentUser?.password) as JwtPayload;


//     if(!isPasswordMatch)
//     {
//       return res.status(400).json({
//         status:false,
//         message:"Password do not match"
//       })
//     }
//     const hashPassword = await bcrpytjs.hash(newpassword,10);

//     currentUser?.password=hashPassword;

//     await currentUser?.save();


//     return res.status(201).json({
//       staus:true,
//       message:"Passowrd updated"
//     })


  







    
//   } catch (error) {
    
//   }

// }


const createNewPassword = async (req: AuthRequest, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // ✅ find user by _id
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // ✅ check old password
    const isPasswordMatch = await bcrpytjs.compare(oldPassword, currentUser.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        status: false,
        message: "Old password is incorrect",
      });
    }

    // ✅ hash new password
    const hashedPassword = await bcrpytjs.hash(newPassword, 10);
    currentUser.password = hashedPassword;

    await currentUser.save();

    return res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const authController = {
  logINUser,
  getMe,logoutUser,createNewPassword
};
