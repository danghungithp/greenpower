"use client";

import { AuthProvider } from "@/context/auth-context";
import { AppShell } from "./app-shell";
import { Toaster } from "../ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AppShell>
                {children}
            </AppShell>
            <Toaster />
        </AuthProvider>
    )
}