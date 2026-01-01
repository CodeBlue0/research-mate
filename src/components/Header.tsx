"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, User, LogOut } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
    const { user, profile, signOut } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ml-2">
                        Research Mate
                    </span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">홈</Link>
                    {user && (
                        <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">내 프로젝트</Link>
                    )}

                    <div className="flex items-center space-x-4 border-l pl-6">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Moon className="h-4 w-4" />
                        </Button>

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-slate-100 p-0 overflow-hidden">
                                        <div className="flex items-center justify-center w-full h-full bg-primary/10 text-primary font-bold">
                                            {user.email?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{profile?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || '사용자'}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>로그아웃</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    로그인
                                </Button>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
