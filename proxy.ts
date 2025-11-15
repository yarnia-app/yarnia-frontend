import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

// Renamed from middleware.ts -> proxy.ts per Next.js deprecation notice.
// Mirrors previous behavior: keeps Supabase session in sync and applies auth redirect.
export async function proxy(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
