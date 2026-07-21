import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";



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

const auth = () => {
    return catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
        const token = req.cookies.accessToken || (req.headers.authorization?.startsWith("Bearer")? req.headers.authorization?.split(" ")[1]: req.headers.authorization)
        if(!token){
            throw new Error("you are not logged in. Please log in to access this resource.")
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret)
    })
}


router.get("/me",(req: Request, res: Response,next: NextFunction)=> {
    const{accessToken} = req.cookies;
    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);

    
    // if(typeof verifiedToken === 'string'){
    //     throw new Error(verifiedToken)
    // }
    if(!verifiedToken.success){
        throw new Error(verifiedToken.error)
    }
    const {email, name, id, role} = verifiedToken.data as JwtPayload
    const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER]
    if(!requiredRoles.includes(role)){
        return res.status(httpStatus.FORBIDDEN).json({
            success: false,
            statusCode: httpStatus.FORBIDDEN,
            message: "Forbidden. You don't have permission to access this resource."
        })
    }
    req.user = {
        id,
        name,
        email,
        role
    }
    next();
}, userController.getMyProfile)

export const userRouter = router;