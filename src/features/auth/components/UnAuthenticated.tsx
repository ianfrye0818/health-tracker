import React from "react";
import { useAuth } from "../hooks";

export function UnAuthenticated({ children}: { children: React.ReactNode}) {
    const { user } = useAuth();

    if (user) return null;

    return children;
}