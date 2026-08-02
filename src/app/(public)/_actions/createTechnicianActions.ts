'use server'
import { ITechnician, Response } from "@/lib/types";
import { TechnicianFormValues } from "../_schema";
import { cookies } from "next/headers";
import { getTokenDetails } from "@/service/getToken";

interface ITechnicianResponseData extends ITechnician {
    accessToken: string
}

export const createTechnician = async (payload: TechnicianFormValues) => {
    const cookieStore = await cookies()
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(payload)
        })
        const result: Response = await res.json()
        console.log(result)
        const data = result.data as ITechnicianResponseData
        const accessToken = data.accessToken

        cookieStore.set("access_token", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: 'lax'
        })

        return result
    }
    catch (error: any) {
        console.error("Error creating technician:", error)
        return {
            success: false,
            message: error.message,
            error: error
        }
    }
} 