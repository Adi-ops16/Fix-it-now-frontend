'use server'
import { getTokenDetails } from "@/service/getToken"
import { ICategoryRes } from "../_types/categoryTypes"
import { TCreateCategoryPayload, TUpdateCategoryPayload } from "../schema/categorySchema"
import { revalidateTag } from "next/cache"

export const getCategories = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`, {
            cache: "force-cache",
            next: { revalidate: 60 * 60, tags: ['categories'] }
        })
        const result = await res.json() as ICategoryRes
        return result
    } catch (error) {
        console.log("Couldn't fetch categories", error)
    }
}

export const createCategory = async (payload: TCreateCategoryPayload) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(payload)
        })
        const result = await res.json() as ICategoryRes
        if (result?.success) {
            revalidateTag("categories", { expire: 0 })
        }
        return result
    } catch (error) {
        console.log("Couldn't fetch categories", error)
    }
}

export const updateCategory = async (payload: TUpdateCategoryPayload, id: number) => {
    try {
        const { token } = await getTokenDetails()
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            },
            body: JSON.stringify(payload)
        })
        const result = await res.json() as ICategoryRes
        if (result?.success) {
            revalidateTag("categories", { expire: 0 })
        }
        return result
    } catch (error) {
        console.log("Couldn't update category", error)
    }
}

export const deleteCategory = async (id: number) => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Cookie: `accessToken=${token}`
            }
        })
        const result = await res.json() as { success: boolean; message: string }
        if (result?.success) {
            revalidateTag("categories", { expire: 0 })
        }
        return result
    } catch (error) {
        console.log("Couldn't delete category", error)
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete category"
        }
    }
}