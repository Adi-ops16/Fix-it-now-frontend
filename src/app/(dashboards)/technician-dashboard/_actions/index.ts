'use server'
import { getTokenDetails } from "@/service/getToken";
import { TechnicianUpdateResponse, UpdateTechnicianPayload } from "../_types";
import { cookies } from "next/headers";
import { IServiceResponse, IServiceUpdateResponse, ServiceUpdateFormValues } from "@/app/(public)/services/_types/serviceTypes";
import { revalidateTag } from "next/cache";

export const updateTechnician = async (data: UpdateTechnicianPayload) => {
    const { token } = await getTokenDetails()
    const cookieStore = await cookies()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician/profile`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(data)
        })
        const result = (await res.json()) as TechnicianUpdateResponse
        cookieStore.set("access_token", result.data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24
        })
        return result
    } catch (error: any) {
        console.log("failed to update", error)
        return {
            success: false,
            message: "Failed to update profile",
            data: undefined,
            error
        }
    }
}

export const getMyServices = async () => {
    try {
        const { token } = await getTokenDetails()
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services/my-services`, {
            headers: {
                Cookie: `accessToken=${token}`
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 24 * 7,
                tags: ["my-services"]
            }
        })
        const result = await res.json() as IServiceResponse
        return result
    } catch (error) {
        console.log("couldn't fetch service data", error)
    }
}

export const updateService = async (data: ServiceUpdateFormValues, id: number) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(data)
        })

        const result = await res.json() as IServiceUpdateResponse
        if (result.success) {
            revalidateTag("my-services", {
                expire: 0
            })
        }
        return result
    } catch (error) {
        console.log("couldn't update service", error)
    }

}

export const deleteService = async (id: number) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services/${id}`, {
            method: "DELETE",
            headers: {
                Cookie: `accessToken=${token}`
            }
        })
        const result = await res.json() as { success: boolean, message: string }
        revalidateTag("my-services", { expire: 0 })
        return result
    } catch (error: any) {
        console.log("Failed to delete service", error)
        return {
            success: false,
            message: error.message
        }
    }
}