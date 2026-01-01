"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ChevronRight,
    Home,
    ArrowLeft,
    Sparkles,
    BookOpen,
    Video,
    FileText,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

interface CoreConcept {
    name: string;
    description: string;
    image?: string;
}

interface ReportData {
    coreConcepts: CoreConcept[];
}

function ConceptDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const conceptIdParam = params?.conceptId as string;
    const conceptIndex = parseInt(conceptIdParam, 10);

    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');
    const router = useRouter();

    const [concept, setConcept] = useState<CoreConcept | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConcept = async () => {
            if (!topicParam) return;

            setLoading(true);
            try {
                // We reuse the main report API to get the concept details
                // Optimally, we would have a specific API for this, but this works for the mock/mvp
                const res = await fetch('/api/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: topicParam })
                });

                if (!res.ok) throw new Error("Failed to fetch report");

                const result: ReportData = await res.json();

                if (result.coreConcepts && result.coreConcepts[conceptIndex]) {
                    setConcept(result.coreConcepts[conceptIndex]);
                } else {
                    // Handle invalid index
                    console.error("Invalid concept index");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchConcept();
    }, [topicParam, conceptIndex]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <h2 className="text-xl font-bold text-slate-800">개념 분석 중...</h2>
            </div>
        );
    }

    if (!concept) return <div className="min-h-screen flex items-center justify-center">개념을 찾을 수 없습니다.</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <div className="relative w-full h-[350px] bg-slate-900 overflow-hidden">
                {concept.image ? (
                    <>
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <img
                            src={concept.image}
                            alt={concept.name}
                            className="w-full h-full object-cover opacity-90"
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900" />
                )}

                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm text-blue-100/80 mb-6">
                        <Link href="/" className="hover:text-white transition-colors"><Home className="w-4 h-4" /></Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-white transition-colors">리포트 홈</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">핵심 개념 상세</span>
                    </nav>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-none px-3 py-1.5 text-sm">
                            Core Concept {conceptIndex + 1}
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg">
                        {concept.name}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 -mt-8 relative z-30">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-slate-100/50">

                    {/* Definition Section */}
                    <div className="p-8 md:p-10 border-b border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-yellow-500 fill-current" />
                            개념 정의
                        </h2>
                        <p className="text-lg text-slate-700 leading-9 font-medium">
                            {concept.description}
                        </p>
                    </div>

                    {/* Detailed Explanation (Mock Content for Visuals) */}
                    <div className="p-8 md:p-10 bg-slate-50/50">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                            심화 학습 내용
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-lg text-slate-800 mb-3">🎯 핵심 원리 파헤치기</h3>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    이 개념은 본 탐구 주제에서 가장 기초가 되는 이론입니다.
                                    교과서에서 배운 단순한 정의를 넘어서, 실제 현상에서 어떻게 적용되는지 이해하는 것이 중요합니다.
                                    특히 <strong>수학적/과학적 모델링</strong> 과정에서 변수 간의 관계를 설명하는 핵심 도구로 사용됩니다.
                                </p>
                                <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm font-medium">
                                    💡 Tip: 탐구 보고서 작성 시, 이 개념의 수식적 정의를 서론 부분에 반드시 포함시키세요.
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-lg text-slate-800 mb-3">📚 관련 교과 단원</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="text-slate-600 border-slate-300">확률과 통계</Badge>
                                    <Badge variant="outline" className="text-slate-600 border-slate-300">미적분</Badge>
                                    <Badge variant="outline" className="text-slate-600 border-slate-300">물리학 I</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Resources (Mock) */}
                    <div className="p-8 md:p-10 border-t border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Video className="w-6 h-6 text-red-500" />
                            추천 학습 자료
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 cursor-pointer group">
                                    <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Video className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">심화 개념 강의 영상 {i}</h4>
                                        <p className="text-sm text-slate-500">YouTube • 15분</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all font-bold shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> 리포트로 돌아가기
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function ConceptPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConceptDetailPage />
        </Suspense>
    );
}
