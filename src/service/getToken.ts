'use server'

import { cookies } from "next/headers"
import jwt, { JwtPayload } from 'jsonwebtoken'

export const getTokenDetails = async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value as string

    if (!accessToken) {
        return {
            success: false,
            message: "User is not authenticated"
        }
    }

    const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as JwtPayload

    return {
        success: true,
        token: accessToken,
        tokenPayload: decodedToken
    }

}