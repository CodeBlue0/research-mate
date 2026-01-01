"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Chrome, Mail, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // Client-side validation could go here

        try {
            // We invoke the server action dynamically to handle the response
            // or we could use useFormState/useActionState in standard Next.js
            // But for now, let's keep it simple with explicit fetch or just calling the action wrapper
            // Wait, directly calling the async action from event handler is fine in Next.js

            // However, we need to handle the return value (error)
            // We can't use `action={login}` directly if we want custom loading/error states easily without hooks
            // Let's import the action
            const { login } = await import('./actions');
            const result = await login(formData); // This might redirect on success

            if (result?.error) {
                setError(result.error);
                setLoading(false);
            }
            // If success, the action redirects, so we don't need to do anything here
        } catch (err: any) {
            setError('로그인 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    const handleOAuthLogin = async (provider: 'google' | 'kakao') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900">Research Mate</h1>
                    <p className="text-slate-500">로그인하여 탐구 활동을 시작하세요</p>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                    <Button
                        variant="outline"
                        className="w-full h-11 relative font-medium border-slate-200 hover:bg-slate-50"
                        onClick={() => handleOAuthLogin('google')}
                    >
                        <Chrome className="w-5 h-5 absolute left-4" />
                        Google로 계속하기
                    </Button>
                    <Button
                        className="w-full h-11 relative font-medium bg-[#FEE500] hover:bg-[#FEE500]/90 text-black border-none"
                        onClick={() => handleOAuthLogin('kakao')}
                    >
                        <MessageCircle className="w-5 h-5 absolute left-4 fill-current" />
                        카카오톡으로 계속하기
                    </Button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500">Or continue with</span>
                    </div>
                </div>

                {/* Email Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                        {loading ? '로그인 중...' : '이메일로 로그인'}
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-500">
                    계정이 없으신가요?{' '}
                    <Button variant="link" className="p-0 h-auto font-semibold text-blue-600" onClick={() => router.push('/auth/signup')}>
                        회원가입
                    </Button>
                </p>
            </Card>
        </div>
    );
}
