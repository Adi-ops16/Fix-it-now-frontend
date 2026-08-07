'use server'

import { getTokenDetails } from "@/service/getToken"
import { redirect } from "next/navigation"

export const createPayment = async (booking_id: string) => {
    let redirectUrl = ""

    try {
        const { token } = await getTokenDetails()

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${token}`,
            },
            body: JSON.stringify({ booking_id }),
            cache: "no-store",
        })

        const result = await res.json()

        if (!result.success) {
            return {
                success: false,
                message: result?.message || "Failed to initiate payment."
            }
        }

        if (result?.data?.url) {
            redirectUrl = result.data.url
        }
    } catch (error) {
        console.error("Payment action error:", error)
        return {
            success: false,
            message: "Something went wrong. Please try again."
        }
    }

    if (redirectUrl) {
        redirect(redirectUrl)
    }
}