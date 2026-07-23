import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";


const loginUser = catchAsync(async(req: Request, res: Response, next:NextFunction)=> {
    const payload  = req.body;
    const {accessToken,refreshToken} = await authService.loginUser(payload);

    res.cookie("accessToken",accessToken,{
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000*60*60*24*7
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000*60*60*24*7
    })

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in Successfully",
        data: {accessToken,refreshToken}
    })
})

const refreshToken  = catchAsync(async(req: Request, res: Response,  next: NextFunction)=> {
    const refreshToken = req.cookies.refreshToken;
    const result = authService.refreshToken(refreshToken);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token refresh successfully.",
        data: result
    })

})


export const authController = {
    loginUser,
    refreshToken
}
