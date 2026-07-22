import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import catchAsync from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
        const token = req.cookies.accessToken || (req.headers.authorization?.startsWith("Bearer")? req.headers.authorization?.split(" ")[1]: req.headers.authorization)
        if(!token){
            throw new Error("you are not logged in. Please log in to access this resource.")
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    
    // if(typeof verifiedToken === 'string'){
    //     throw new Error(verifiedToken)
    // }
    if(!verifiedToken.success){
        throw new Error(verifiedToken.error)
    }
        const {email, name, id, role} = verifiedToken.data as JwtPayload
        if(requiredRoles.length && !requiredRoles.includes(role)){
            throw new Error("Forbidden. You do not have permission to  access this resource")
        }

        const user = await prisma.user.findUnique({
            where: {
                id, 
                email,
                name,
                role
            }
        })

        if(!user){
            throw new Error("User not found. Please log in again")
        }

        if(user.activeStatus==="BLOCKED"){
            throw new Error ("Your account has been blocked. Please contact  support")
        }

        req.user={
            email,
            name,
            id,
            role
        }
        next()

    })
}