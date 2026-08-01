"use server"

import { ProfileResponse } from "@/lib/types"
import { getTokenDetails } from "./getToken"

export const getMyProfile = async () => {
    const { token } = await getTokenDetails()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers/me`, {
        headers: {
            Cookie: `accessToken=${token}`
        },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["my-profile"]
        }
    })
    const result: ProfileResponse = await res.json()

    return result
}