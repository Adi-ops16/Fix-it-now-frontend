'use server'

import { getTokenDetails } from "@/service/getToken";
import { IAvailability, IAvailabilityPayload } from "../_types";
import { revalidateTag } from "next/cache";

export const getAvailability = async () => {
    const { token } = await getTokenDetails();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/availability`, {
            headers: {
                Cookie: `accessToken=${token}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60,
                tags: ['availability']
            }
        })
        const result = await res.json() as { success: boolean; message: string; data: IAvailability[] }
        return result
    } catch (error) {
        console.log("Error retrieving availability", error)
    }
}

export const createOrUpdateAvailability = async (payload: IAvailabilityPayload[]) => {
    const { token } = await getTokenDetails()
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/availability`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify({ availability: payload })
        })
        const result = await res.json() as
            { success: true; message: string; data: { count: number } }

        if (result.success) revalidateTag("availability", { expire: 0 })
        return result

    } catch (error) {
        console.log("Couldn't update availability", error)
    }
}
