"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Plus,
    Search,
    FileText,
    Clock,
    ChevronRight,
    BookOpen,
    Sparkles,
    LayoutDashboard,
    FolderOpen
} from 'lucide-react';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    topic: string;
    subject: string;
    created_at: string;
    status: 'draft' | 'completed';
}

export default function DashboardPage() {
    const { user, profile, isLoading } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);

    useEffect(() => {
        // Project list specific timeout (2 seconds)
        const projectLoadingTimer = setTimeout(() => {
            setLoadingProjects(false);
        }, 2000);

        const fetchProjects = async () => {
            if (!user) {
                if (!isLoading) setLoadingProjects(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    if (error.code !== '42P01') {
                        console.error('Error fetching projects:', error);
                    }
                } else if (data) {
                    setProjects(data);
                }
            } catch (err) {
                console.error('Unexpected error fetching projects:', err);
            } finally {
                setLoadingProjects(false);
                clearTimeout(projectLoadingTimer);
            }
        };

        if (!isLoading) {
            fetchProjects();
        }

        return () => clearTimeout(projectLoadingTimer);
    }, [user, isLoading]);

    // Only show full-page loading if we're still checking auth and don't have a user yet
    if (isLoading && !user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-slate-500 font-medium">인증 정보를 확인하고 있습니다...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                            <LayoutDashboard className="w-5 h-5" />
                            <span>대시보드</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            {(profile?.name || user?.user_metadata?.full_name || '사용자')}님의 프로젝트
                        </h1>
                        <p className="text-slate-500 font-medium">
                            진행 중인 탐구 활동과 저장된 보고서를 한눈에 확인하세요.
                        </p>
                    </div>
                    <Link href="/search">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2 font-bold transition-all hover:-translate-y-1">
                            <Plus className="w-5 h-5" />
                            새 탐구 시작하기
                        </Button>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Card className="p-6 bg-white border-0 shadow-sm rounded-2xl flex items-center gap-4 group hover:shadow-md transition-all">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FolderOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">전체 프로젝트</p>
                            <p className="text-2xl font-bold text-slate-900">{projects.length}개</p>
                        </div>
                    </Card>
                    <Card className="p-6 bg-white border-0 shadow-sm rounded-2xl flex items-center gap-4 group hover:shadow-md transition-all">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">작성 완료 보고서</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {projects.filter(p => p.status === 'completed').length}개
                            </p>
                        </div>
                    </Card>
                    <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 border-0 shadow-sm rounded-2xl flex items-center gap-4 text-white">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium opacity-90">탐구 진행도</p>
                            <p className="text-2xl font-bold">상위 5%</p>
                        </div>
                    </Card>
                </div>

                {/* Projects List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            최근 탐구 활동
                        </h2>
                        {projects.length > 0 && (
                            <Button variant="ghost" className="text-slate-500 font-medium hover:text-blue-600">
                                전체 보기 <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        )}
                    </div>

                    {loadingProjects ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                            <p className="text-slate-500 font-medium">탐구 내역을 가져오고 있습니다...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <Card className="p-12 border-2 border-dashed border-slate-200 bg-white/50 rounded-[2rem] text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">아직 탐구 활동이 없어요</h3>
                                <p className="text-slate-500 mt-1">심화 탐구 주제를 찾고 나만의 보고서를 만들어보세요!</p>
                            </div>
                            <Link href="/search">
                                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 px-8 rounded-xl mt-4">
                                    첫 주제 탐색하기
                                </Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((project) => (
                                <Link key={project.id} href={`/report/${project.id}`}>
                                    <Card className="p-6 bg-white border-0 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all rounded-2xl group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col h-full space-y-4">
                                            <div className="flex items-start justify-between">
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-medium border-0 px-2.5 py-0.5 rounded-lg">
                                                    {project.subject === 'math' ? '수학' : project.subject}
                                                </Badge>
                                                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {new Date(project.created_at).toLocaleDateString('ko-KR')}
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                                    {project.title}
                                                </h3>
                                                <p className="text-slate-500 text-sm line-clamp-1 font-medium">
                                                    키워드: {project.topic}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-slate-50 mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <BookOpen className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700">심화 탐구 리포트</span>
                                                </div>
                                                <Badge className={project.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}>
                                                    {project.status === 'completed' ? '완료' : '작성 중'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
