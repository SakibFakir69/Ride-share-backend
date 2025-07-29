import { NextFunction, Request, Response } from "express";




export const notFoundRoute = (req:Request, res:Response, next:NextFunction)=>{

    res.status(404).json({
        status:false,
        messsage: `${req.url} This Route Not Founded`
    })

}