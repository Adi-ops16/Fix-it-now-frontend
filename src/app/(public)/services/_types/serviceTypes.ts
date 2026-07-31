import { ICategory } from "@/lib/types";

export interface serviceParams {
    limit?: number;
    page?: number;
    sortOrder?: "asc" | "desc";
    location?: string;
    searchTerms?: string;
}

export interface IServiceQueryProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        searchTerms?: string;
        location?: string;
        sortOrder?: "asc" | "desc";
    }>;
}

export interface IServiceResponse extends Response {
    data: IService[];
    meta: {
        page: number;
        limit: number;
        totalPages: number;
        totalDataCount: number;
    };
}

export interface IService {
    id: number;
    title: string;
    description: string;
    price: number;
    estimated_time: number;
    location: string | null;
    created_at?: string;
    updated_at?: string;
    technician_id: string;
    category_id: number;
    category?: ICategory;
    technician?: {
        user_id: string;
        experience_year: number;
        is_available: boolean;
        hourly_rate: number;
        location: string;
        name: string;
    };
}