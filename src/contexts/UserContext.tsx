"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { getCurrentUserAction } from "@/app/(auth)/_actions/userActions";

export interface ContextUser {
    id?: string;
    email?: string;
    name?: string;
    role?: "TECHNICIAN" | "CUSTOMER" | "ADMIN";
    [key: string]: unknown;
}
export interface UserContextValue {
    user: ContextUser | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserContextValue["user"]>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        const result = await getCurrentUserAction();

        if (result.success && result?.tokenPayload?.tokenData && result.token) {
            setUser(result.tokenPayload.tokenData as UserContextValue["user"]);
        } else {
            setUser(null);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const value = useMemo(
        () => ({
            user,
            loading,
            refreshUser: fetchUser,
        }),
        [user, loading]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}


