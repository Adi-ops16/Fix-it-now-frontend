import { IServiceDetailsResponse, IServiceResponse, serviceParams } from "../_types/serviceTypes";

export const getServices = async (params: serviceParams) => {

    const queryParams = new URLSearchParams();

    if (params.page) queryParams.set("page", String(params.page));
    if (params.limit) queryParams.set("limit", String(params.limit));
    if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);
    if (params.location) queryParams.set("location", params.location);
    if (params.searchTerms) queryParams.set("searchTerms", params.searchTerms);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services?${queryParams}`, {
            cache: "force-cache",
            next: {
                revalidate: 60 * 5,
                tags: ["services"]
            }
        })
        const result: IServiceResponse = await res.json()
        return result

    } catch (error) {
        console.log("couldn't fetch service data", error)
    }
}

export const getServiceDetails = async (id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services/${id}`, {
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 24,
                tags: ["service-details"]
            }
        })
        const result = (await res.json()) as IServiceDetailsResponse
        return result
    } catch (error: any) {
        console.log("couldn't fetch service details", error)
        return {
            success: false,
            message: error.message,
            error,
            data: undefined
        }
    }
}