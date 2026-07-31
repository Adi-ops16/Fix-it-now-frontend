export type { LoginPayload } from "@/app/(auth)/_schema/authSchema";
export type { RegisterPayload } from "@/app/(auth)/_schema/authSchema";

export interface LoginFormErrors {
    email?: string;
    password?: string;
}

export type Response = {
    success: boolean;
    message: string;
    data?: unknown
    error?: unknown
}

export interface LoginResponse extends Response {
    data: {
        accessToken: string;
    },
    error?: {
        message: string;
    }
}

export interface RegisterResponse extends Response {
    data: {
        id: string;
        name: string;
        email: string;
        role: "CUSTOMER" | "TECHNICIAN";
        user_status: "ACTIVE" | "BAN" | "DEACTIVATED";
        photo_url: string | null;
        created_at: Date;
        updated_at: Date;
    },
    error?: {
        message: string;
    }
}

export interface ProfileResponse extends Response {
    data: IUser | null;
    error?: {
        message: string;
    }
}

interface ITechnicianProfile {
    bio: string;
    experience_year: number;
    hourly_rate: number;
    location: string;
    is_available: boolean;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    user_status: "ACTIVE" | "BAN" | "DEACTIVATED";
    photo_url: string | null;
    created_at: Date;
    updated_at: Date;
    technician_profile?: ITechnicianProfile | null;
}

export interface ICategory {
    id: number;
    name: string;
    description: string;
    created_at?: string;
    updated_at?: string;
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
    };
}

export interface ITechnician {
    user_id: string;
    bio: string;
    experience_year: number;
    hourly_rate: number;
    location: string;
    is_available: boolean;
    customer: {
        name: string;
        email: string;
        role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
        user_status: "ACTIVE" | "BAN" | "DEACTIVATED";
        photo_url: string | null;
    };
}

