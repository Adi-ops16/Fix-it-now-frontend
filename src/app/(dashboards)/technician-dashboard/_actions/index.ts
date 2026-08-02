'use server'
import { getTokenDetails } from "@/service/getToken";
import { TechnicianUpdateResponse, UpdateTechnicianPayload } from "../_types";
import { cookies } from "next/headers";

export const updateTechnician = async (data: UpdateTechnicianPayload) => {
    const { token } = await getTokenDetails()
    const cookieStore = await cookies()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/profile`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(data)
        })
        const result = (await res.json()) as TechnicianUpdateResponse
        cookieStore.set("access_token", result.data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24
        })
        return result
    } catch (error: any) {
        console.log("failed to update", error)
        return {
            success: false,
            message: "Failed to update profile",
            data: undefined,
            error
        }
    }
}

export const getMyServices = async () => {
    
}