'use server'
import { getTokenDetails } from "@/service/getToken"
import { ICreateReviewPayload, IReview } from "../_types"
import { revalidateTag } from "next/cache"

export const createReview = async (payload: ICreateReviewPayload) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(payload)
        })
        const result = await res.json() as { success: boolean; message: string }
        if (result.success) {
            revalidateTag(`booking-${payload.booking_id}`, { expire: 0 })
        }
        return result
    } catch (error) {
        console.log("error on creating service token", error)
    }

}

export const getReviewByBookingId = async (bookingId: string) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews/booking/${bookingId}`, {
            headers: {
                Cookie: `accessToken=${token}`
            }
        })
        const result = await res.json() as {
            success: boolean;
            message: string;
            data: IReview
        }
        return result
    } catch (error) {
        console.log("error on creating service token", error)
    }
}