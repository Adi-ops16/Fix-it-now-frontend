export type { LoginPayload } from "@/app/(auth)/_schema/authSchema";
export type { RegisterPayload } from "@/app/(auth)/_schema/authSchema";

export type Response = {
    success: boolean;
    message: string;
    data?: unknown
    error?: unknown
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

