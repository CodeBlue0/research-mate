import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, User } from 'lucide-react';

import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/app/auth/actions';

export const Header = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ml-2">
                        TopicGen
                    </span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">홈</Link>
                    <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">내 프로젝트</Link>
                    <div className="flex items-center space-x-2 border-l pl-6">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Moon className="h-4 w-4" />
                        </Button>
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-100">
                                    <User className="h-4 w-4" />
                                </Button>
                                <form action={signOut}>
                                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                                        Sign out
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button size="sm">Login</Button>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
