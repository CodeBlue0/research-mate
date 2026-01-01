"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import { User, Session } from '@supabase/supabase-js';

type AuthContextType = {
    user: User | null;
    session: Session | null;
    profile: any | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Profile fetch error:', error);
            }
            return data;
        } catch (error) {
            console.error('Unexpected error fetching profile:', error);
            return null;
        }
    };

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            try {
                const { data: { session: currentSession } } = await supabase.auth.getSession();

                if (!mounted) return;

                if (currentSession?.user) {
                    setSession(currentSession);
                    setUser(currentSession.user);
                    const userProfile = await fetchProfile(currentSession.user.id);
                    if (mounted) setProfile(userProfile);
                } else {
                    if (mounted) {
                        setSession(null);
                        setUser(null);
                        setProfile(null);
                    }
                }
            } catch (error) {
                console.error('Auth Init Error:', error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (!mounted) return;

            setSession(newSession);
            setUser(newSession?.user ?? null);

            if (newSession?.user) {
                const userProfile = await fetchProfile(newSession.user.id);
                if (mounted) setProfile(userProfile);
            } else {
                if (mounted) setProfile(null);
            }

            if (mounted) setIsLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!isLoading && user && !profile && !pathname?.startsWith('/auth') && !pathname?.startsWith('/login')) {
            router.push('/auth/signup');
        }
    }, [isLoading, user, profile, pathname, router]);


    const signOut = async () => {
        try {
            // 1. Clear local state immediately for fast UI response
            setUser(null);
            setSession(null);
            setProfile(null);

            // 2. Sign out from Supabase (clears cookies/session)
            await supabase.auth.signOut();

            // 3. Force a full reload to the home page.
            // This is the most reliable way to clear all memory states and 
            // ensure the middleware/server-side state is synchronized.
            window.location.href = '/';
        } catch (error) {
            console.error('Sign out error:', error);
            window.location.href = '/';
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, profile, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
