'use server'
import { ICategory } from "@/app/(dashboards)/_types/categoryTypes";
import { IService } from "@/app/(public)/services/_types/serviceTypes";
import { ITechnician } from "@/lib/types";

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
        return json.data.splice(0, 6) || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getHomeServices = async (limit = 4): Promise<IService[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/services?limit=${limit}`, {
            next: { revalidate: 600 }
        });
        const result = await res.json() as ApiListResponse<IService[]>;
        return result.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
};

export const getHomeTechnicians = async (limit = 5): Promise<ITechnician[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/technician?limit=${limit}`, {
            next: { revalidate: 600 }
        });
        const result = await res.json() as ApiListResponse<ITechnician[]>;
        return result.data.reverse() || [];
    } catch (error) {
        console.error("Error fetching technicians:", error);
        return [];
    }
};
