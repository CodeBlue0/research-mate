"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        school_level: '',
        grade: '',
        career_interest: ''
    });
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // If not logged in even via OAuth, redirect to login
                router.push('/login');
                return;
            }
            setUser(user);

            // Check if profile already exists
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profile) {
                router.push('/'); // Already has profile, go home
            } else {
                setLoading(false); // Needs profile
            }
        };

        checkUser();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                    name: formData.name,
                    school_level: formData.school_level,
                    grade: parseInt(formData.grade),
                    career_interest: formData.career_interest
                });

            if (error) throw error;

            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Error creating profile:', error);
            alert('프로필 생성 중 오류가 발생했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    // Dynamic grade options based on school level
    const maxGrade = formData.school_level === 'elementary' ? 6 : 3;
    const gradeOptions = Array.from({ length: maxGrade }, (_, i) => i + 1);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900">환영합니다! 👋</h1>
                    <p className="text-slate-500">원활한 서비스 이용을 위해 추가 정보를 입력해주세요.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">이름</Label>
                        <Input
                            id="name"
                            placeholder="홍길동"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>학교급</Label>
                            <Select
                                value={formData.school_level}
                                onValueChange={(val) => setFormData({ ...formData, school_level: val, grade: '' })} // Reset grade on school change
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="elementary">초등학교</SelectItem>
                                    <SelectItem value="middle">중학교</SelectItem>
                                    <SelectItem value="high">고등학교</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>학년</Label>
                            <Select
                                value={formData.grade}
                                onValueChange={(val) => setFormData({ ...formData, grade: val })}
                                disabled={!formData.school_level} // Disable if school not selected
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    {gradeOptions.map((g) => (
                                        <SelectItem key={g} value={g.toString()}>{g}학년</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="career">희망 진로 / 관심 분야</Label>
                        <Input
                            id="career"
                            placeholder="예: 생명공학 연구원, 인공지능 개발자"
                            value={formData.career_interest}
                            onChange={(e) => setFormData({ ...formData, career_interest: e.target.value })}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-lg" disabled={submitting}>
                        {submitting ? '저장 중...' : '시작하기'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
