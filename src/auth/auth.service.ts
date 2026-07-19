import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { ILoginUser } from "./auth.interface"
import jwt from "jsonwebtoken"

const loginUser = async(payload: ILoginUser)=> {
    const {email, password} = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {email}
    })

    const isPasswordMatched = await bcrypt.compare(password,user.password)
    if(!isPasswordMatched){
        throw new Error("Password is incorrect")
    }
    const accessToken = jwt.sign({
        id:user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }, "accessecret", {
        expiresIn: "5d"
    })
    const refreshToken = jwt.sign({
        id:user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }, "refreshsecret", {
        expiresIn: "7d"
    })

    return {accessToken,refreshToken}
}


export const authService = {
    loginUser
}