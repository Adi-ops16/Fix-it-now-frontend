import { ICategory, Response } from "@/lib/types";

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

export interface ServiceUpdateFormValues {
    title?: string;
    description?: string;
    estimated_time?: number;
    price?: number;
    location?: string;
}

//     "success": true,
// "message": "Service updated successfully",
// "data": {
//     "id": 3,
//     "title": "AC Installation",
//     "description": "Installation of split and window air conditioners with proper testing and setup.",
//     "price": 8,
//     "estimated_time": 45,
//     "location": "Noakhal",
//     "created_at": "2026-07-07T23:23:14.113Z",
//     "updated_at": "2026-08-03T03:55:21.133Z",
//     "technician_id": "89627dd0-10f6-4cf2-afbd-ad0d9f58d2fa",
//     "category_id": 6
// }

export interface IServiceUpdateResponse {
    success: boolean;
    message: string;
    data?: {
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
    };
    error?: any;
}
