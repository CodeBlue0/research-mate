"use client";

import React, { useState, useEffect, Suspense } from 'react';
import {
    ChevronRight,
    Home,
    ArrowRight,
    ArrowLeft,
    BookOpen,
    Lightbulb,
    GraduationCap,
    CheckCircle2,
    Quote
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GuideData {
    title: string;
    description: string;
    advancedConcepts: { name: string; description: string }[];
    curriculumConcepts: { name: string; description: string }[];
    checklist: string[];
    tips: string[];
}

function Step1PageContent() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [guideData, setGuideData] = useState<GuideData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuide = async () => {
            // Mock data or API call would go here. 
            // Generating mock data locally for visual consistency as API key might be missing
            setLoading(true);
            setTimeout(() => {
                setGuideData({
                    title: "배경 이론 심화 연구",
                    description: "성공적인 탐구는 깊이 있는 이론적 배경에서 시작됩니다. 교과서 수준을 넘어 대학교 전공 서적 수준의 지식을 탐색해보세요.",
                    advancedConcepts: [
                        { name: "확률 공간 (Probability Space)", description: "표본 공간(Ω), 시그마 대수(F), 확률 측도(P)의 삼위일체(Triple) 정의를 이해합니다." },
                        { name: "대수의 법칙 (LLN) 증명", description: "체비쇼프 부등식(Chebyshev's Inequality)을 활용한 약한 대수의 법칙 증명 과정을 학습합니다." }
                    ],
                    curriculumConcepts: [
                        { name: "확률과 통계 - 통계적 추정", description: "표본평균의 분포와 모평균 추정의 원리를 연결합니다." },
                        { name: "수학 II - 극한", description: "무한대(∞) 개념과 수렴(Convergence)의 엄밀한 정의를 복습합니다." }
                    ],
                    checklist: [
                        "관련 전공 서적 2권 이상 찾아보기",
                        "핵심 수식(Formula) 노트에 정리하기",
                        "이론의 한계점(Assumption) 파악하기"
                    ],
                    tips: [
                        "단순한 검색보다는 Google Scholar나 RISS에서 학술 자료를 찾아보세요.",
                        "수식의 유도 과정을 직접 손으로 써보며 이해하는 것이 중요합니다."
                    ]
                });
                setLoading(false);
            }, 800);
        };

        fetchGuide();
    }, [topicParam]);

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading Step 1...</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <div className="relative w-full h-[350px] bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black/80 z-10" />
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12">
                    <nav className="flex items-center text-sm text-indigo-100/80 mb-6">
                        <Link href="/" className="hover:text-white transition-colors"><Home className="w-4 h-4" /></Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-white transition-colors">리포트 홈</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">Step 1. 배경 이론</span>
                    </nav>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white border-none px-3 py-1.5 text-sm">
                            Step 1
                        </Badge>
                        <span className="text-indigo-200 font-medium tracking-wide text-sm uppercase">Background Theory</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg">
                        {guideData?.title}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Intro Card */}
                        <Card className="bg-white border-none shadow-xl rounded-2xl p-8 ring-1 ring-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-500 fill-current" />
                                학습 목표
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed font-medium">
                                {guideData?.description}
                            </p>
                        </Card>

                        {/* Advanced Concepts */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <GraduationCap className="w-6 h-6 text-indigo-600" />
                                심화 이론 탐구
                            </h2>
                            <div className="space-y-4">
                                {guideData?.advancedConcepts.map((concept, idx) => (
                                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-md">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{concept.name}</h3>
                                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                                            {concept.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Curriculum Connection */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-green-600" />
                                교과 연결 고리
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {guideData?.curriculumConcepts.map((concept, idx) => (
                                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{concept.name}</h3>
                                        <p className="text-sm text-slate-600">
                                            {concept.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-8">
                            <Button variant="outline" size="lg" className="rounded-full px-6" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> 이전
                            </Button>
                            <Link href={`/report/${id}/inquiry-guide/step-2?topic=${encodeURIComponent(topicParam || '')}`}>
                                <Button size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200">
                                    다음 단계 (교과 연계) <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Checklist */}
                        <Card className="bg-white border-none shadow-lg rounded-2xl p-6 ring-1 ring-slate-100 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                체크리스트
                            </h3>
                            <div className="space-y-3">
                                {guideData?.checklist.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                        <input type="checkbox" className="mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                                        <span className="text-sm text-slate-700 font-medium leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Quote className="w-4 h-4 text-indigo-400 fill-current" />
                                    Honey Tip
                                </h3>
                                <div className="space-y-4">
                                    {guideData?.tips.map((tip, idx) => (
                                        <p key={idx} className="text-sm text-slate-600 italic bg-yellow-50 p-3 rounded-lg text-yellow-800">
                                            "{tip}"
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function Step1Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step1PageContent />
        </Suspense>
    );
}
