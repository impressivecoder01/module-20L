import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { auth } from "../../auth/auth";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            user?:{
                email: string,
                name: string,
                id: string,
                role: Role
            }
        }
    }
}

router.post("/register",userController.registerUser)

router.get("/me",
//     (req: Request, res: Response,next: NextFunction)=> {
//     const{accessToken} = req.cookies;
//     const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);

    
//     // if(typeof verifiedToken === 'string'){
//     //     throw new Error(verifiedToken)
//     // }
//     if(!verifiedToken.success){
//         throw new Error(verifiedToken.error)
//     }
//     const {email, name, id, role} = verifiedToken.data as JwtPayload
//     const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER]
//     if(!requiredRoles.includes(role)){
//         return res.status(httpStatus.FORBIDDEN).json({
//             success: false,
//             statusCode: httpStatus.FORBIDDEN,
//             message: "Forbidden. You don't have permission to access this resource."
//         })
//     }
//     req.user = {
//         id,
//         name,
//         email,
//         role
//     }
//     next();
// }, 
auth(Role.ADMIN, Role.AUTHOR, Role.USER) ,
userController.getMyProfile)

router.put("/my-profile", auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.updateMyProfile)

export const userRouter = router;