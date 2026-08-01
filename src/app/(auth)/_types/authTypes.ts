import { Response } from "@/lib/types";

export interface LoginFormErrors {
    email?: string;
    password?: string;
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