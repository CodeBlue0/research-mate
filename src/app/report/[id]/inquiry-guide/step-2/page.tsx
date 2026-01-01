"use client";

import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    Home,
    Link as LinkIcon,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Check,
    BookOpen,
    Zap,
    Target,
    Quote
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface GuideData {
    title: string;
    description: string;
    goal: string;
    checklist: string[];
    tips: string[];
    corePrinciple?: string;
    applicationMechanism?: string;
    researchRelevance?: string;
}

export default function Step2Page() {
    const params = useParams();
    const id = params?.id as string;

    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [guideData, setGuideData] = useState<GuideData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuide = async () => {
            if (!topicParam) {
                setLoading(false);
                return;
            }

            // [Persistence Logic]
            const storageKey = `inquiry_step_2_${id}_${topicParam}`;
            const cached = localStorage.getItem(storageKey);
            if (cached) {
                try {
                    setGuideData(JSON.parse(cached));
                    setLoading(false);
                    return;
                } catch (e) {
                    localStorage.removeItem(storageKey);
                }
            }

            setLoading(true);
            try {
                const res = await fetch('/api/guide/step', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: topicParam, step: 2 })
                });

                if (!res.ok) throw new Error("Failed to fetch guide");

                const data = await res.json();
                setGuideData(data);

                // [Persistence Logic]
                localStorage.setItem(storageKey, JSON.stringify(data));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGuide();
    }, [topicParam, id]);

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <div className="relative w-full h-[350px] bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-slate-900 to-black/80 z-10" />
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12">
                    <nav className="flex items-center text-sm text-green-100/80 mb-6">
                        <Link href="/" className="hover:text-white transition-colors"><Home className="w-4 h-4" /></Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-white transition-colors">리포트 홈</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">Step 2. 교과 연계</span>
                    </nav>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-none px-3 py-1.5 text-sm">
                            Step 2
                        </Badge>
                        <span className="text-green-200 font-medium tracking-wide text-sm uppercase">Curriculum Connection</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg">
                        {guideData?.title || '주제 속 핵심 원리 파헤치기'}
                    </h1>
                    <p className="text-xl text-green-100 font-medium max-w-2xl text-shadow-sm mt-4">
                        {guideData?.description || "이론이 실제 현상에 어떻게 적용되는지 연결해보세요."}
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Principle Analysis Card - Clean & Visual */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                                <Sparkles className="w-5 h-5 text-green-500 mr-2" />
                                AI 심화 분석 (Deep Analysis)
                            </h3>

                            <div className="space-y-4">
                                {/* Layer 1: Core Principle */}
                                <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl border-l-4 border-blue-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className="w-4 h-4 text-blue-500" />
                                        <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400 uppercase tracking-wider">핵심 원리 (Core Principle)</h4>
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                                        {guideData?.corePrinciple || (loading ? "분석 중..." : "핵심 원리를 불러오는 중입니다.")}
                                    </p>
                                </div>

                                {/* Arrow Down */}
                                <div className="flex justify-center -my-2 opacity-50">
                                    <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                                </div>

                                {/* Layer 2: Mechanism */}
                                <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border-l-4 border-green-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap className="w-4 h-4 text-green-500" />
                                        <h4 className="font-bold text-sm text-green-600 dark:text-green-400 uppercase tracking-wider">작동 메커니즘 (Application Mechanism)</h4>
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
                                        {guideData?.applicationMechanism || (loading ? "분석 중..." : "적용 원리를 생성하고 있습니다.")}
                                    </p>
                                </div>

                                {/* Arrow Down */}
                                <div className="flex justify-center -my-2 opacity-50">
                                    <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                                </div>

                                {/* Layer 3: Relevance */}
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border-l-4 border-indigo-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4 text-indigo-500" />
                                        <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">탐구 연관성 (Research Relevance)</h4>
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm">
                                        {guideData?.researchRelevance || (loading ? "분석 중..." : "연구 연관성을 분석하고 있습니다.")}
                                    </p>
                                </div>
                            </div>
                        </div>


                        {/* My Application Note Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                            <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                                <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                나만의 원리 적용 노트
                            </h3>

                            <div className="space-y-4 mb-6">
                                <p className="text-sm text-gray-500">
                                    위 분석 내용을 바탕으로, 본인의 탐구 주제에 맞게 내용을 구체화하여 서술해보세요. (보고서의 이론적 배경 또는 연구 방법 서론으로 사용됩니다.)
                                </p>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm p-4 h-64 resize-none leading-relaxed font-mono"
                                    defaultValue={guideData ? `[핵심 원리]
${guideData.corePrinciple}

[작동 원리 및 적용]
${guideData.applicationMechanism}

[본 연구와의 연관성]
${guideData.researchRelevance}` : ""}
                                    placeholder={loading ? "AI 분석 결과를 기다리는 중입니다..." : "내용을 직접 작성해보세요."}
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Link href={`/report/${id}/inquiry-guide/step-1?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    이전 단계
                                </Link>
                                <Link href={`/report/${id}/inquiry-guide/step-3?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all flex items-center gap-2">
                                    다음 단계로
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Progress Tracker */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm uppercase tracking-wider">탐구 진행 상황</h3>
                            <div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-6">
                                {[
                                    { step: 1, label: '배경 이론', status: 'completed' },
                                    { step: 2, label: '교과 연계', status: 'current' },
                                    { step: 3, label: '탐구 실습', status: 'pending' },
                                    { step: 4, label: '보고서 작성', status: 'pending' },
                                ].map((item) => (
                                    <div key={item.step} className="relative">
                                        <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-green-600' : 'bg-gray-300'}`}></span>
                                        <h4 className={`text-sm font-bold ${item.status === 'current' ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                            {item.step}. {item.label}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.status === 'current' ? '이론 적용 논리를 구축합니다.' : item.status === 'pending' ? '대기 중' : '완료됨'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                                <Quote className="w-5 h-5 text-green-500" />
                                <h3 className="font-bold text-sm">성공적인 세특 작성 Tip</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                대학 입학사정관은 '단순 지식 나열'보다 <span className="font-bold text-green-600 underline decoration-green-300 decoration-2">"이 학생이 배운 지식을 어떻게 활용했는가?"</span>를 중요하게 봅니다.<br /><br />
                                이 파트에서 <b>'어떤 원리를', '왜', '어떻게'</b> 적용했는지 명확하게 드러내면 좋은 평가를 받을 수 있습니다.
                            </p>
                        </div>

                        {/* Check Points */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm">Check Points</h3>
                            <ul className="space-y-3">
                                {guideData?.checklist?.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                )) || (
                                        <>
                                            <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span>핵심 원리를 한 문장으로 정의했나요?</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span>원리가 적용되는 과정을 단계별로 서술했나요?</span>
                                            </li>
                                        </>
                                    )}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

function CheckCircle2({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
