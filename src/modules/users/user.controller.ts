import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response} from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";




// const registerUser =  async(req: Request, res: Response)=> {
    // try {
    //     const payload = req.body;
    // const user = await userService.registerUserIntoDB(payload)
    // // console.log(req.body);
    
    // // console.log(payload);
    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     statusCode: httpStatus.CREATED,
    //     message: "User registered successfully",
    //     data: {
    //         user
    //     }
    // })
    // } catch (error) {
        
    // }

// }


const registerUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload)
    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     statusCode: httpStatus.CREATED,
    //     message: "User registered successfully",
    //     data: {
    //         user
    //     }
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {user}
    })
})

const getMyProfile = catchAsync (async(req:  Request, res: Response, next: NextFunction)=> {

})

export const userController = {
    registerUser,
    getMyProfile
}