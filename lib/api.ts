import { createClient } from "@/lib/supabase/server";
import type { components, operations } from "@/types/backend";

// Get the backend API URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

type ProfileRead = components["schemas"]["ProfileRead"];
type ProfileCreate = components["schemas"]["ProfileCreate"];

/**
 * API client for backend communication
 */
export class ApiClient {
    private baseUrl: string;
    private token: string | null;

    constructor(baseUrl: string = API_BASE_URL, token: string | null = null) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    /**
     * Set the authentication token
     */
    setToken(token: string) {
        this.token = token;
    }

    /**
     * Make an authenticated request to the backend
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(options.headers as Record<string, string>),
        };

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Not found");
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `API error: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Get the current user's profile
     * Returns null if profile doesn't exist (404)
     */
    async getMyProfile(): Promise<ProfileRead | null> {
        try {
            return await this.request<ProfileRead>("/profiles/me");
        } catch (error) {
            if (error instanceof Error && error.message === "Not found") {
                return null;
            }
            throw error;
        }
    }

    /**
     * Create a new profile for the current user
     */
    async createProfile(data: ProfileCreate): Promise<ProfileRead> {
        return this.request<ProfileRead>("/profiles/", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}

/**
 * Create an API client with the current user's access token
 */
export async function createApiClient(): Promise<ApiClient> {
    const supabase = await createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const token = session?.access_token || null;
    return new ApiClient(API_BASE_URL, token);
}
