'use server'
import { LoginPayload, RegisterPayload } from "@/lib/types"
import { RegisterSchema } from "../_schema/authSchema";
import { cookies } from "next/headers";
import { LoginResponse } from "../_types/authTypes";
import { revalidateTag } from "next/cache";

export const loginAction = async (payload: LoginPayload) => {
    const cookieStore = await cookies()

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result: LoginResponse = await res.json()

        if (result.success) {
            cookieStore.set("access_token", result.data.accessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24
            })
            revalidateTag("my-profile", { expire: 0 })
        }
        return result

    } catch (error) {
        console.error("Error during login:", error);
        return {
            success: false,
            message: "An error occurred during login. please try again later.",
            error: error,
        };
    }
}

export const registerAction = async (payload: RegisterPayload) => {

    const parsedData = RegisterSchema.parse(payload)

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsedData)
        })
        const result = await res.json()
        return result

    } catch (error) {
        console.error("Error during register:", error);
        return {
            success: false,
            message: "An error occurred during login. please try again later.",
            error: error,
        };
    }
}

export const logOut = async () => {
    const cookieStore = await cookies()
    cookieStore.delete("access_token")
}