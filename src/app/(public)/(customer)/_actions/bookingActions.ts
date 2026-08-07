'use server'
import { getTokenDetails } from "@/service/getToken"
import { revalidateTag } from "next/cache"
import { IBooking, IBookingCancelPayload } from "../_types";


interface ICreateBookingPayload {
    service_id: number;
    work_date: string;
    work_startTime: string;
}

export const updateBookingStatus = async (bookingId: string, status: string) => {
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

export const createBooking = async (payload: ICreateBookingPayload) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(payload)
        })
        const result = await res.json() as { success: boolean, message: string, data: IBooking }
        revalidateTag("my-bookings", { expire: 0 })
        return result
    } catch (error: any) {
        console.log("Failed to create booking", error)
    }
}

export const getMyBookings = async () => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/`, {
            cache: "force-cache",
            headers: {
                Cookie: `accessToken=${token}`
            },
            next: {
                revalidate: 60 * 60 * 24,
                tags: ["my-bookings"]
            }
        })
        const result = await res.json() as { success: boolean; message: string, data: IBooking[] }
        return result
    } catch (error: any) {
        console.log("Failed to fetch my bookings", error)
    }
}

export const getBookingDetails = async (id: string) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/${id}`, {
            cache: "force-cache",
            headers: {
                Cookie: `accessToken=${token}`
            },
            next: {
                revalidate: 60 * 60 * 24,
                tags: ["my-bookings", `booking-${id}`]
            }
        })
        const result = await res.json() as { success: boolean; message: string; data?: IBooking }
        return result
    } catch (error: any) {
        console.log("Failed to fetch booking details", error)
        return {
            success: false,
            message: error.message,
            data: undefined
        }
    }
}

export const cancelBooking = async (payload: IBookingCancelPayload) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/status/cancel`, {
            method: "PATCH",
            headers: {
                Cookie: `accessToken=${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const result = await res.json() as
            { success: true, message: string, data?: { status: string } }
        if (result.success) {
            revalidateTag("my-bookings", { expire: 0 })
        }
        return result
    } catch (err) {
        console.log("Failed to cancel the booking", err)
    }
}