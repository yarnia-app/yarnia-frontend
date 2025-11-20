"use client";

import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon } from "lucide-react";
import { signOut } from "@/app/login/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { components } from "@/types/backend";

type ProfileRead = components["schemas"]["ProfileRead"];

interface StudioHeaderProps {
    user: User;
    profile: ProfileRead;
    title?: string;
}

export function StudioHeader({ user, profile, title = "Dashboard" }: StudioHeaderProps) {
    // Get initials from email
    const initials = user.email
        ? user.email.substring(0, 2).toUpperCase()
        : "U";

    // Use display_name from backend profile, fallback to email
    const displayName = profile.display_name || user.email || "User";

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="hidden sm:flex">
                        12 stories left this month
                    </Badge>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 cursor-pointer transition-opacity hover:opacity-80">
                                <AvatarImage src={user.user_metadata?.avatar_url} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {displayName}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <UserIcon className="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
