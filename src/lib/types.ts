export interface LoginFormErrors {
    email?: string;
    password?: string;
}

export type { LoginPayload } from "@/app/(auth)/_schema/authSchema";
export type { RegisterPayload } from "@/app/(auth)/_schema/authSchema";

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
