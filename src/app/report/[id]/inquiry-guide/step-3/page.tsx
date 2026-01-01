"use client";

import React, { useState, useEffect, Suspense } from 'react';
import {
    ChevronRight,
    Home,
    ArrowRight,
    ArrowLeft,
    Beaker, // Changed icon for Experiment
    Lightbulb,
    Microscope, // Changed icon
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
    experiments: { title: string; method: string }[]; // Changed structure for Step 3
    expectedResults: string;
    checklist: string[];
    tips: string[];
}

function Step3PageContent() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [guideData, setGuideData] = useState<GuideData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuide = async () => {
            // Mock data for Step 3
            setLoading(true);
            setTimeout(() => {
                setGuideData({
                    title: "탐구 실험 설계 및 수행",
                    description: "가설을 검증하기 위한 구체적인 실험을 설계하고 데이터를 수집하는 단계입니다. 변수 통제에 유의하세요.",
                    experiments: [
                        { title: "변수 설정 (Variables)", method: "조작 변수(던지는 횟수 n)와 종속 변수(상대도수)를 명확히 정의합니다." },
                        { title: "데이터 수집 (Data Collection)", method: "Python 시뮬레이션 코드(NumPy)를 실행하여 n=10, 100, 1000일 때의 앞면 비율을 기록합니다." }
                    ],
                    expectedResults: "이론적으로 n이 커질수록 상대도수는 0.5에 수렴해야 하며, 오차는 1/√n 에 비례하여 감소하는 경향을 보여야 합니다.",
                    checklist: [
                        "실험 준비물(노트북, Python 환경) 점검",
                        "변수 통제 계획 수립",
                        "3회 이상 반복 시행 계획"
                    ],
                    tips: [
                        "실험 중간에 예상치 못한 데이터가 나오면 기록해두세요. 오차 원인 분석의 좋은 재료가 됩니다.",
                        "사진이나 스크린샷을 최대한 많이 남겨두세요."
                    ]
                });
                setLoading(false);
            }, 800);
        };

        fetchGuide();
    }, [topicParam]);

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading Step 3...</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <div className="relative w-full h-[350px] bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-slate-900 to-black/80 z-10" />
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12">
                    <nav className="flex items-center text-sm text-amber-100/80 mb-6">
                        <Link href="/" className="hover:text-white transition-colors"><Home className="w-4 h-4" /></Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-white transition-colors">리포트 홈</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">Step 3. 탐구 실습</span>
                    </nav>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-3 py-1.5 text-sm">
                            Step 3
                        </Badge>
                        <span className="text-amber-200 font-medium tracking-wide text-sm uppercase">Practical Activity</span>
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
                                <Lightbulb className="w-5 h-5 text-amber-500 fill-current" />
                                실험 목표
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed font-medium">
                                {guideData?.description}
                            </p>
                        </Card>

                        {/* Experiment Design */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Beaker className="w-6 h-6 text-amber-600" />
                                실험 설계 및 과정
                            </h2>
                            <div className="space-y-4">
                                {guideData?.experiments.map((exp, idx) => (
                                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:border-amber-200 transition-all hover:shadow-md">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{exp.title}</h3>
                                        <p className="text-slate-600 leading-relaxed bg-amber-50/50 p-4 rounded-lg border border-amber-100/50">
                                            {exp.method}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Expected Results */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Microscope className="w-6 h-6 text-blue-600" />
                                예상 결과 분석
                            </h2>
                            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
                                <p className="text-slate-700 leading-relaxed font-medium">
                                    {guideData?.expectedResults}
                                </p>
                            </div>
                        </section>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-8">
                            <Button variant="outline" size="lg" className="rounded-full px-6" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> 이전
                            </Button>
                            <Link href={`/report/${id}/inquiry-guide/step-4?topic=${encodeURIComponent(topicParam || '')}`}>
                                <Button size="lg" className="rounded-full px-8 bg-amber-600 hover:bg-amber-700 font-bold shadow-lg shadow-amber-200 text-white">
                                    다음 단계 (보고서 작성) <ArrowRight className="w-4 h-4 ml-2" />
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
                                        <input type="checkbox" className="mt-1 w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500" />
                                        <span className="text-sm text-slate-700 font-medium leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Quote className="w-4 h-4 text-amber-400 fill-current" />
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

export default function Step3Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step3PageContent />
        </Suspense>
    );
}
