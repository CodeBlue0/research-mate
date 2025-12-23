import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, User } from 'lucide-react';

export const Header = () => {
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
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">내 프로젝트</Link>
                    <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">가이드</Link>
                    <div className="flex items-center space-x-2 border-l pl-6">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Moon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-100">
                            <User className="h-4 w-4" />
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
};
