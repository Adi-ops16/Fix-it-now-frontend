"use server"
import { getTokenDetails } from "@/service/getToken";
import { UpdateFormValues } from "../_components/CustomerProfileForm";
import { IUser, Response } from "@/lib/types";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

interface IUpdateUserData extends IUser {
    accessToken: string
}

export const updateCustomer = async (payload: UpdateFormValues, userId: string) => {
    const { token } = await getTokenDetails()
    const cookieStore = await cookies()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(payload),
        })
        const result: Response = await res.json()
        const userData = result.data as IUpdateUserData
        cookieStore.set("access_token", userData.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: 'lax'
        })
        revalidateTag("my-profile", "max")
        return result

    } catch (error) {
        console.log("Profile update failed", error)
        return {
            success: false,
            message: "Couldn't update profile, please try again",
            error: error
        }
    }
}