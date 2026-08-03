"use server"

import { IUser } from "@/lib/types";
import { getTokenDetails } from "@/service/getToken";
import { revalidateTag } from "next/cache";

export const getAllUsers = async () => {
    const { token } = await getTokenDetails();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers`, {
            headers: {
                Cookie: `accessToken=${token}`,
            },
            cache: "force-cache",
            next: { revalidate: 60 * 60, tags: ['users'] }
        })
        const result = await res.json() as { success: boolean; message: string; data: IUser[] }
        return result
    } catch (err: any) {
        console.error("Error fetching users:", err)
    }
}

export const toggleCustomerStatus = async (userId: string, currentStatus?: string) => {
    const { token } = await getTokenDetails();
    try {
        const newStatus = currentStatus === 'ACTIVE' ? 'BAN' : 'ACTIVE'
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `accessToken=${token}`,
            },
            body: JSON.stringify({ userId, userStatus: newStatus }),
        })

        const result = await res.json() as { success: boolean; message: string }
        revalidateTag("users", { expire: 0 })
        return result
    } catch (err: any) {
        console.error('Error toggling customer status:', err)
        return { success: false, message: 'Failed to update status' }
    }
}

export async function toggleCustomerStatusAction(formData: FormData) {
    'use server'
    const userId = formData.get('userId') as string
    const currentStatus = formData.get('currentStatus') as string | undefined
    if (!userId) {
        return { success: false, message: 'Missing userId' }
    }
    return await toggleCustomerStatus(userId, currentStatus)
}