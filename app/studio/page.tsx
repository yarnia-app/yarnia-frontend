import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "../login/actions";
import { Button } from "@/components/ui/button";

export default async function StudioPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold">Hello, {user.email}</h1>
                <form action={signOut}>
                    <Button variant="outline" type="submit">
                        Log out
                    </Button>
                </form>
            </div>
        </div>
    );
}
