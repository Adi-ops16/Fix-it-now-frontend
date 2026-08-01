'use server'
import { IService } from "@/app/(public)/services/_types/serviceTypes";
import { ICategory, ITechnician } from "@/lib/types";

// We define raw response interfaces
export interface ApiListResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedData<T> {
    meta: {
        page: number;
        limit: number;
        totalDataCount: number;
        totalPages: number;
    };
    data: T[];
}


export const getHomeCategories = async (): Promise<ICategory[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json: ApiListResponse<ICategory[]> = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getHomeServices = async (limit = 4): Promise<IService[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services?limit=${limit}`, {
            next: { revalidate: 600 } // cache for 10 minutes
        });
        if (!res.ok) throw new Error("Failed to fetch services");
        const json: ApiListResponse<PaginatedData<IService>> = await res.json();
        return json.data?.data || [];
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }

};

export const getHomeTechnicians = async (limit = 4): Promise<ITechnician[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician?limit=${limit}`, {
            next: { revalidate: 600 } // cache for 10 minutes
        });
        if (!res.ok) throw new Error("Failed to fetch technicians");
        const json: ApiListResponse<PaginatedData<ITechnician>> = await res.json();
        return json.data?.data || [];
    } catch (error) {
        console.error("Error fetching technicians:", error);
        return [];
    }
};
