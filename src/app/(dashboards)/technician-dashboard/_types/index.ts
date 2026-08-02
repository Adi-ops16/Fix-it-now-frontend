import { IUser } from "@/lib/types";

export interface TechnicianProfileFormProps {
    user: IUser
}

export interface TechnicianUpdateResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        user_id: string,
        bio: string;
        experience_year: number;
        hourly_rate: number;
        location: string;
        is_available: boolean;
        customer: {
            id: string;
            name: string;
            email: string;
            role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
            user_status: "ACTIVE" | "BAN" | "DEACTIVATED";
            photo_url: string | null;
            created_at: Date;
            updated_at: Date;
        }
    },
    error: unknown
}

export interface UpdateTechnicianPayload {
    name?: string
    photo_url?: string
    bio?: string
    experience_year?: number
    hourly_rate?: number
    location?: string
    is_available?: boolean
}

export interface ITechnicianProfile {
    bio: string;
    experience_year: number;
    hourly_rate: number;
    location: string;
    is_available: boolean;
}