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

export interface IServiceDetails extends Omit<IService, 'category' | 'technician'> {
    category: {
        name: string;
        description: string;
    };
    technician: {
        bio: string;
        experience_year: number;
        hourly_rate: number;
        location: string;
        is_available: boolean;
        name: string;
        email: string;
        role: 'TECHNICIAN';
        user_status: 'ACTIVE' | 'INACTIVE' | string;
        photo_url: string | null;
    };
}

export interface IServiceDetailsResponse {
    success: boolean;
    message: string;
    data?: IServiceDetails;
    error?: any
}