"use client";

import { signIn } from "./actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

export default function LoginPage() {
    const [state, action, pending] = useActionState(signIn, undefined);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Sign in
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to receive a magic link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        {state?.error && (
                            <p className="text-sm text-red-500">{state.error}</p>
                        )}
                        {state?.success && (
                            <p className="text-sm text-green-500">{state.success}</p>
                        )}
                        <Button type="submit" className="w-full" disabled={pending}>
                            {pending ? "Sending link..." : "Send Magic Link"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
