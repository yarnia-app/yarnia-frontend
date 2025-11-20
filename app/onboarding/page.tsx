"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { createProfile } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating profile..." : "Continue to Studio"}
        </Button>
    );
}

export default function OnboardingPage() {
    const [state, formAction] = React.useActionState(createProfile, null);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Welcome to Yarnia! 🎉
                    </CardTitle>
                    <CardDescription>
                        Let's set up your profile to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="display_name">
                                Display Name
                            </Label>
                            <Input
                                id="display_name"
                                name="display_name"
                                type="text"
                                placeholder="Enter your display name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="locale">
                                Language Preference (Optional)
                            </Label>
                            <Select name="locale">
                                <SelectTrigger id="locale">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="it">Italian</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {state?.error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {state.error}
                            </div>
                        )}

                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
