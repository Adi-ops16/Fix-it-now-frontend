import { getTokenDetails } from "@/service/getToken"
import { IPayment } from "../_types"

export const getMyPayments = async () => {
    const { token } = await getTokenDetails()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/history`, {
            headers: {
                Cookie: `accessToken=${token}`
            },
            cache: "force-cache",
            next: {
                revalidate: 24 * 60 * 60,
            }
        })
        const result = await res.json() as { success: boolean, message: string, data: IPayment[] }
        return result
    } catch (error: any) {
        console.log("Failed to create booking", error)
    }
}