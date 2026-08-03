'use server'

import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

interface IJwtPayload {
    name: string;
    email: string;
    user_id: string;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    [key: string]: unknown;
}

const verifyToken = async (accessToken: string) => {
    try {
        const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as IJwtPayload
        return {
            success: true,
            tokenData: decode
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Token expired,please login again",
            error
        }
    }
}

export const getTokenDetails = async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value as string

    if (!accessToken) {
        return {
            success: false,
            message: "User is not authenticated"
        }
    }

    const decodedToken = await verifyToken(accessToken)

    if (!decodedToken.success) {
        return {
            success: false,
            message: decodedToken.message
        }
    }

    return {
        success: true,
        token: accessToken,
        tokenPayload: decodedToken
    }

}