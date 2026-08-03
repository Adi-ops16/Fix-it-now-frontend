import { ICategory } from "@/lib/types"
import { ICategoryRes } from "../_types"

export const getCategories = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`)
        const result = await res.json() as ICategoryRes
        return result
    } catch (error) {
        console.log("Couldn't fetch categories", error)
    }
}