"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Bookmark, ChevronRight, FileText, Loader2, Book, Sparkles, Lightbulb, Microscope } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/providers/auth-provider';

interface ReportData {
    title: string;
    subTitle: string;
    summary: string;
    mainImage?: string;
    coreConcepts: { name: string; description: string; image?: string }[];
    curriculum: { name: string; description: string }[];
    inquiryGuide: string[];
    references: string[];
}

function ReportPageContent() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [data, setData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchReport = async () => {
            // Simulate network delay for "AI Generation" feel
            setLoading(true);
            try {
                // If topicParam is empty, we still fetch to get the fallback
                const res = await fetch('/api/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: topicParam || '' })
                });

                if (!res.ok) throw new Error("Failed to fetch report");

                const result = await res.json();

                // Minimal artificial delay to show the loader if it happened too fast
                setTimeout(() => {
                    setData(result);
                    setLoading(false);
                }, 800);

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchReport();
    }, [topicParam]);

    const handleSaveProject = async () => {
        if (!user || !data) {
            router.push('/login');
            return;
        }

        setSaving(true);
        try {
            const { error } = await supabase
                .from('projects')
                .insert({
                    user_id: user.id,
                    title: data.title,
                    topic: topicParam || data.title,
                    subject: 'math', // Default for now
                    status: 'completed'
                });

            if (error) throw error;

            alert('프로젝트가 저장되었습니다!');
            router.push('/dashboard');
        } catch (error) {
            console.error('Error saving project:', error);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6 relative z-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">AI가 보고서를 생성하고 있습니다...</h2>
                <div className="flex gap-2 text-slate-500 text-sm animate-pulse">
                    <span>데이터 분석 중</span>
                    <span>•</span>
                    <span>개념 연결 중</span>
                    <span>•</span>
                    <span>시각화 생성 중</span>
                </div>
            </div>
        );
    }

    if (!data) return <div className="min-h-screen flex items-center justify-center">데이터를 불러오지 못했습니다.</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[400px] bg-slate-900 overflow-hidden">
                {data.mainImage && (
                    <>
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <img
                            src={data.mainImage}
                            alt={data.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                    </>
                )}
                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12">
                    <Badge className="w-fit mb-4 bg-blue-500/90 hover:bg-blue-600 border-none px-3 py-1 text-white backdrop-blur-sm shadow-sm">
                        <Sparkles className="w-3 h-3 mr-2 fill-current" /> AI Generated Insight
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-sm">
                        {data.title}
                    </h1>
                    <p className="text-xl text-blue-100 font-medium max-w-2xl text-shadow-sm">
                        {data.subTitle}
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* AI Insight Card (Summary) */}
                        <Card className="border-none shadow-xl bg-white overflow-hidden rounded-2xl ring-1 ring-slate-100">
                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-600" />
                                <span className="font-bold text-indigo-900">AI 심층 분석 결과</span>
                            </div>
                            <div className="p-8">
                                <p className="text-lg text-slate-700 leading-8 whitespace-pre-wrap font-medium">
                                    {data.summary.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line.includes('**') ? (
                                                <span className="font-bold text-slate-900 bg-yellow-50 px-1 rounded">
                                                    {line.replace(/\*\*/g, '')}
                                                </span>
                                            ) : (
                                                <span className={line.length === 0 ? "block h-4" : ""}>{line}</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </Card>

                        {/* Visual Concepts Grid */}
                        <section>
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 mb-6">
                                <Lightbulb className="w-6 h-6 text-yellow-500 fill-current" /> 핵심 개념 이해하기
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.coreConcepts.map((concept, idx) => (
                                    <Link key={idx} href={`/report/${id}/concept/${idx}?topic=${encodeURIComponent(topicParam || '')}`} className="block group">
                                        <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                                            <div className="h-40 overflow-hidden bg-slate-200">
                                                {concept.image ? (
                                                    <img src={concept.image} alt={concept.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-bold text-xl mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
                                                    {concept.name}
                                                </h3>
                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                                    {concept.description}
                                                </p>
                                                <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                    자세히 보기 <ChevronRight className="w-4 h-4 ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Inquiry Guide Steps */}
                        <section>
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 mb-6">
                                <Microscope className="w-6 h-6 text-green-600" /> 단계별 탐구 가이드
                            </h2>
                            <div className="space-y-4">
                                {data.inquiryGuide.map((step, idx) => (
                                    <Link key={idx} href={`/report/${id}/inquiry-guide/step-${idx + 1}?topic=${encodeURIComponent(topicParam || '')}`} className="block group">
                                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex gap-6 items-start hover:border-blue-200 transition-all group-hover:shadow-md">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 font-bold flex items-center justify-center text-xl shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
                                                    {idx === 0 ? "배경 이론 조사" : idx === 1 ? "교과 연결 고리 찾기" : idx === 2 ? "실험 및 활동 수행" : "보고서 작성"}
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed">{step}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Right Sticky Sidebar */}
                    <div className="space-y-6 sticky top-24 self-start">
                        <Card className="p-6 shadow-lg border-none bg-white/80 backdrop-blur">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Book className="w-5 h-5 text-blue-500" /> 교과 연계
                            </h3>
                            <div className="space-y-4">
                                {data.curriculum.map((curr, idx) => (
                                    <div key={idx} className="pl-4 border-l-2 border-blue-200">
                                        <div className="font-bold text-slate-800">{curr.name}</div>
                                        <div className="text-sm text-slate-600 mt-1">{curr.description}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6 shadow-md border-none">
                            <h3 className="font-bold text-slate-900 mb-4">참고 문헌</h3>
                            <ul className="space-y-3">
                                {data.references.map((ref, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                        <FileText className="w-4 h-4 mt-0.5 text-slate-400 flex-shrink-0" />
                                        <span>{ref}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                className="w-full bg-slate-900 hover:bg-slate-800 font-bold h-12"
                                onClick={handleSaveProject}
                                disabled={saving}
                            >
                                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Bookmark className="w-4 h-4 mr-2" />}
                                저장
                            </Button>
                            <Button variant="outline" className="w-full font-bold h-12 border-slate-300">
                                <Share2 className="w-4 h-4 mr-2" /> 공유
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function ReportPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportPageContent />
        </Suspense>
    );
}
