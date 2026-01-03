"use client";

import React, { useState, useEffect, Suspense } from 'react';
import {
    ChevronRight,
    Home,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    CheckCircle2,
    Quote
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/ui/quiz-card';

interface GuideData {
    title: string;
    description: string;
    learningModules: {
        title: string;
        content: string;
        quiz: {
            question: string;
            options: string[];
            correctAnswer: string;
            explanation: string;
        }
    }[];
    checklist: string[];
    tips: string[];
}

function Step2PageContent() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [guideData, setGuideData] = useState<GuideData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuide = async () => {
            // Fetch Guide Data
            setLoading(true);
            try {
                const response = await fetch('/api/guide/step', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topic: topicParam || "Research Topic",
                        step: 2
                    })
                });
                const data = await response.json();

                if (data) {
                    setGuideData({
                        title: data.title,
                        description: data.description,
                        learningModules: [
                            {
                                title: "핵심 원리 (Core Principle)",
                                content: `**${data.corePrinciple}**\n\n${data.researchRelevance}`,
                                quiz: {
                                    question: "이 원리를 적용할 때 가장 주의해야 할 점은?",
                                    options: ["변인 통제", "계산 실수", "장비 가격", "실험 시간"],
                                    correctAnswer: "변인 통제",
                                    explanation: "과학적 원리를 적용할 때는 다른 변인이 결과에 영향을 주지 않도록 통제하는 것이 핵심입니다."
                                }
                            },
                            {
                                title: "원리 적용 메커니즘 (Application Logic)",
                                content: data.applicationMechanism || "",
                                quiz: {
                                    question: "내 주제에 이 원리를 적용하는 논리적 근거는?",
                                    options: ["교과서에 나와서", "선생님이 시켜서", "원인과 결과의 인과관계가 명확해서", "쉬워 보여서"],
                                    correctAnswer: "원인과 결과의 인과관계가 명확해서",
                                    explanation: "논리적 타당성이 확보되어야 올바른 적용이라 할 수 있습니다."
                                }
                            }
                        ],
                        checklist: data.checklist || [],
                        tips: data.tips || []
                    });
                }
            } catch (error) {
                console.error("Failed to fetch Step 2 guide:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGuide();
    }, [topicParam]);

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading Step 2...</div>;

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
                                <Sparkles className="w-5 h-5 text-green-500 fill-current" />
                                학습 가이드
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed font-medium">
                                {guideData?.description}
                            </p>
                        </Card>

                        {/* Learning Modules */}
                        <div className="space-y-12">
                            {guideData?.learningModules.map((module, idx) => (
                                <section key={idx} className="scroll-mt-24">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 font-bold flex items-center justify-center">
                                            {idx + 1}
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-800">
                                            {module.title}
                                        </h2>
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6 leading-relaxed text-slate-700 text-lg">
                                        {module.content}
                                    </div>

                                    {/* Interactive Quiz */}
                                    <QuizCard
                                        question={module.quiz.question}
                                        options={module.quiz.options}
                                        correctAnswer={module.quiz.correctAnswer}
                                        explanation={module.quiz.explanation}
                                        className="border-green-100"
                                    />
                                </section>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-8 border-t border-slate-200 mt-12">
                            <Button variant="outline" size="lg" className="rounded-full px-6" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> 이전
                            </Button>
                            <Link href={`/report/${id}/inquiry-guide/step-3?topic=${encodeURIComponent(topicParam || '')}`}>
                                <Button size="lg" className="rounded-full px-8 bg-green-600 hover:bg-green-700 font-bold shadow-lg shadow-green-200 text-white">
                                    다음 단계 (실험 설계) <ArrowRight className="w-4 h-4 ml-2" />
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
                                학습 체크리스트
                            </h3>
                            <div className="space-y-3">
                                {guideData?.checklist.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                        <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500" />
                                        <span className="text-sm text-slate-700 font-medium leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Quote className="w-4 h-4 text-green-400 fill-current" />
                                    AI 선생님의 팁
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

export default function Step2Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step2PageContent />
        </Suspense>
    );
}
