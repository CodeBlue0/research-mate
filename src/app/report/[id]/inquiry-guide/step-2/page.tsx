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
            // Mock data for Step 2
            setLoading(true);
            setTimeout(() => {
                setGuideData({
                    title: "교과 연결의 논리 완성",
                    description: "이론을 내 주제에 억지로 끼워 맞추는 것이 아니라, 자연스러운 논리적 연결 고리를 찾아야 합니다.",
                    learningModules: [
                        {
                            title: "연결의 타당성 (Logical Validity)",
                            content: "많은 학생들이 범하는 오류는 '그냥 관련 있어 보여서'입니다. **'A 원리에 의해 B 현상이 발생하고, 이를 C 문제 해결에 적용한다'**는 인과관계가 명확해야 합니다.",
                            quiz: {
                                question: "'큰 수의 법칙'을 '동전 던지기' 주제에 연결할 때 가장 적절한 논리는?",
                                options: [
                                    "동전은 금속이라서 물리 법칙을 따른다.",
                                    "동전 던지기는 독립 시행이며, 시행 횟수가 늘어날수록 통계적 확률이 수학적 확률에 수렴함을 실험으로 보일 수 있다.",
                                    "동전을 많이 던지면 손이 아프므로 생물학적 한계를 실험한다.",
                                    "동전의 앞면과 뒷면 디자인이 다르므로 공기 저항이 다르다."
                                ],
                                correctAnswer: "동전 던지기는 독립 시행이며, 시행 횟수가 늘어날수록 통계적 확률이 수학적 확률에 수렴함을 실험으로 보일 수 있다.",
                                explanation: "정확한 수학적 정의(독립 시행, 수렴)를 기반으로 실험의 목적(이론 검증)을 연결해야 합니다."
                            }
                        },
                        {
                            title: "심화 확장 (Evolution)",
                            content: "단순히 교과서 내용을 확인하는 수준을 넘어, **'만약 조건이 바뀐다면?'**이라는 질문을 던져보세요. 예를 들어, '동전의 무게 중심이 쏠려 있다면 큰 수의 법칙은 어떻게 달라질까?'와 같은 가정이 훌륭한 탐구 주제가 됩니다.",
                            quiz: {
                                question: "다음 중 '심화 탐구'로 발전시키기에 가장 좋은 질문은?",
                                options: [
                                    "교과서에 나온 동전 던지기 예제를 그대로 따라해본다.",
                                    "동전 대신 주사위를 던져본다.",
                                    "무게 중심이 51:49로 치우친 동전을 시뮬레이션하여, 수렴하는 값이 0.5가 아님을 확인한다.",
                                    "동전을 더 빨리 던지는 기계를 만든다."
                                ],
                                correctAnswer: "무게 중심이 51:49로 치우친 동전을 시뮬레이션하여, 수렴하는 값이 0.5가 아님을 확인한다.",
                                explanation: "기존 이론(0.5 수렴)을 비틀어보는 변수(편향된 동전)를 도입하여 새로운 결론을 도출하는 것이 심화 탐구입니다."
                            }
                        }
                    ],
                    checklist: [
                        "교과서 개념과 내 주제의 연결 고리를 한 문장으로 쓸 수 있다",
                        "단순 확인을 넘어 '변형'이나 '심화' 요소를 넣었다"
                    ],
                    tips: [
                        "선생님은 '이걸 왜 했어?'라고 물으실 것입니다. 그 대답이 바로 이 단계의 핵심입니다.",
                        "논리가 약하다면 주제를 조금 수정하는 것도 방법입니다."
                    ]
                });
                setLoading(false);
            }, 800);
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
