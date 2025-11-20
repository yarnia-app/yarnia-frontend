import { createClient } from "@/lib/supabase/server";
import { createApiClient } from "@/lib/api";
import { redirect } from "next/navigation";
import { StudioHeader } from "@/components/studio/header";

export default async function StudioPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Check if user has a profile
    const apiClient = await createApiClient();
    const profile = await apiClient.getMyProfile();

    if (!profile) {
        return redirect("/onboarding");
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <StudioHeader user={user} profile={profile} title="Dashboard" />
            <main className="flex-1 p-8">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                    <p className="text-muted-foreground">
                        This is your studio dashboard.
                    </p>
                </div>
            </main>
        </div>
    );
}

