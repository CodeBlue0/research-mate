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

function Step1PageContent() {
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
                        step: 1
                    })
                });
                const data = await response.json();

                if (data) {
                    // Map API response to UI State
                    setGuideData({
                        title: data.title,
                        description: data.description,
                        learningModules: [
                            {
                                title: "심화 이론 (Advanced Concepts)",
                                content: data.advancedConcepts?.map((c: any) => `**${c.name}**: ${c.description}`).join('\n\n') || "",
                                quiz: {
                                    question: "이 이론의 핵심 전제는 무엇인가요?",
                                    options: ["전제 A", "전제 B", "전제 C", "전제 D"], // API doesn't return quiz yet, keeping placeholder or generic
                                    correctAnswer: "전제 A",
                                    explanation: "심화 이론을 이해했는지 스스로 점검해보세요."
                                }
                            },
                            {
                                title: "교과 연결 (High School Curriculum)",
                                content: data.curriculumConcepts?.map((c: any) => `**${c.name}**: ${c.description}`).join('\n\n') || "",
                                quiz: {
                                    question: "관련된 고교 교과는?",
                                    options: ["수학", "과학", "사회", "정보"],
                                    correctAnswer: "과학",
                                    explanation: "교과서에서 배운 내용이 심화 이론의 기초가 됩니다."
                                }
                            }
                        ],
                        checklist: data.checklist || [],
                        tips: data.tips || []
                    });
                }
            } catch (error) {
                console.error("Failed to fetch Step 1 guide:", error);
            } finally {
                setLoading(false);
            }
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
                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
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
                                    />
                                </section>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-8 border-t border-slate-200 mt-12">
                            <Button variant="outline" size="lg" className="rounded-full px-6" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> 이전
                            </Button>
                            <Link href={`/report/${id}/inquiry-guide/step-2?topic=${encodeURIComponent(topicParam || '')}`}>
                                <Button size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200">
                                    다음 단계 (교과 연계 풀기) <ArrowRight className="w-4 h-4 ml-2" />
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
                                        <input type="checkbox" className="mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                                        <span className="text-sm text-slate-700 font-medium leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Quote className="w-4 h-4 text-indigo-400 fill-current" />
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

export default function Step1Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step1PageContent />
        </Suspense>
    );
}
