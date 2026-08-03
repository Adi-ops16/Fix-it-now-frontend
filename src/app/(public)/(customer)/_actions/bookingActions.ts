import { getTokenDetails } from "@/service/getToken"
import { revalidateTag } from "next/cache"

interface IBookingStatus {
    status: "CONFIRMED" | "CANCELLED" | "COMPLETED" | "IN_PROGRESS"
}

export const updateBookingStatus = async (bookingId: number, status: IBookingStatus) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/status`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify({ booking_id: bookingId, status })
        })
        const result = await res.json() as { success: boolean, message: string }
        revalidateTag("my-bookings", { expire: 0 })
        return result
    } catch (error: any) {
        console.log("Failed to update booking status", error)
    }
}