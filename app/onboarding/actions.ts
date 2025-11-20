"use server";

import { createClient } from "@/lib/supabase/server";
import { createApiClient } from "@/lib/api";
import { redirect } from "next/navigation";

export async function createProfile(prevState: any, formData: FormData) {
    try {
        const supabase = await createClient();

        // Check if user is authenticated
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return { error: "Not authenticated" };
        }

        // Get form data
        const displayName = formData.get("display_name") as string;
        const locale = formData.get("locale") as string;

        // Create API client
        const apiClient = await createApiClient();

        // Create profile via backend API
        await apiClient.createProfile({
            user_id: user.id,
            display_name: displayName || null,
            locale: locale || null,
            subscription_status: "free",
        });

    } catch (error) {
        console.error("Profile creation error:", error);
        return {
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create profile",
        };
    }

    // Success - redirect to studio
    redirect("/studio");
}
