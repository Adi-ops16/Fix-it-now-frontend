'use server'
import { LoginPayload, RegisterPayload } from "@/lib/types"
import { RegisterSchema } from "../_schema/authSchema";

export const loginAction = async (payload: LoginPayload) => {

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json()
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
        const res = await fetch(`${process.env.BACKEND_API_URL}/customers`, {
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