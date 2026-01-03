"use client";

import React, { useState, useEffect, Suspense } from 'react';
import {
    ChevronRight,
    Home,
    ArrowRight,
    ArrowLeft,
    Beaker,
    ListChecks,
    ClipboardList,
    Microscope,
    Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GuideData {
    title: string;
    description: string;
    experiment: {
        hypothesis: string;
        variables: {
            independent: string;
            dependent: string;
            controlled: string;
        };
        materials: string[];
        procedure: string[];
    };
    goal: string;
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
            setLoading(true);
            try {
                const response = await fetch('/api/guide/step', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topic: topicParam || "Research Topic",
                        step: 3
                    })
                });
                const data = await response.json();

                if (data) {
                    setGuideData(data);
                }
            } catch (error) {
                console.error("Failed to fetch Step 3 guide:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGuide();
    }, [topicParam]);

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading Step 3...</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <div className="relative w-full h-[300px] bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-slate-900 to-black/80 z-10" />
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-10">
                    <nav className="flex items-center text-sm text-amber-100/80 mb-6">
                        <Link href="/" className="hover:text-white transition-colors"><Home className="w-4 h-4" /></Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-white transition-colors">리포트 홈</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">Step 3. 탐구 실험 실습</span>
                    </nav>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-3 py-1.5 text-sm">
                            Step 3
                        </Badge>
                        <span className="text-amber-200 font-medium tracking-wide text-sm uppercase">Practical Activity</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg">
                        {guideData?.title || "탐구 실험 설계"}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 -mt-12 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left: Experiment Guide */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Intro */}
                        <Card className="bg-white border-none shadow-xl rounded-2xl p-8 ring-1 ring-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Microscope className="w-5 h-5 text-amber-500" />
                                실험 설계 가이드
                            </h2>
                            <p className="text-lg text-slate-700 leading-relaxed font-medium">
                                {guideData?.description}
                            </p>

                            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                    핵심 가설 (Hypothesis)
                                </h3>
                                <p className="text-amber-800 text-lg font-serif italic">
                                    "{guideData?.experiment.hypothesis}"
                                </p>
                            </div>
                        </Card>

                        {/* Variables & Materials */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-white p-6 shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <ListChecks className="w-5 h-5 text-blue-500" />
                                    변인 설정
                                </h3>
                                <ul className="space-y-4">
                                    <li>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">독립 변인 (Independent)</div>
                                        <div className="text-slate-700 font-medium">{guideData?.experiment.variables.independent}</div>
                                    </li>
                                    <li>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">종속 변인 (Dependent)</div>
                                        <div className="text-slate-700 font-medium">{guideData?.experiment.variables.dependent}</div>
                                    </li>
                                    <li>
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">통제 변인 (Controlled)</div>
                                        <div className="text-slate-700 font-medium">{guideData?.experiment.variables.controlled}</div>
                                    </li>
                                </ul>
                            </Card>

                            <Card className="bg-white p-6 shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Beaker className="w-5 h-5 text-purple-500" />
                                    준비물 (Materials)
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-700">
                                    {guideData?.experiment.materials.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        {/* Procedure */}
                        <Card className="bg-white border-none shadow-md rounded-2xl p-8 ring-1 ring-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <ClipboardList className="w-5 h-5 text-green-500" />
                                실험 과정 (Procedure)
                            </h2>
                            <div className="space-y-6">
                                {guideData?.experiment.procedure.map((step, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex-none w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center border border-slate-200">
                                            {idx + 1}
                                        </div>
                                        <p className="text-lg text-slate-700 leading-relaxed pt-1">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Navigation */}
                        <div className="flex justify-between items-center py-6">
                            <Button variant="outline" size="lg" className="rounded-full px-6" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> 이전
                            </Button>
                            <Link href={`/report/${id}/inquiry-guide/step-4?topic=${encodeURIComponent(topicParam || '')}`}>
                                <Button size="lg" className="rounded-full px-8 bg-amber-600 hover:bg-amber-700 font-bold shadow-lg shadow-amber-200 text-white">
                                    실험 수행 완료 & 보고서 작성 <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-white border-none shadow-lg rounded-2xl p-6 ring-1 ring-slate-100 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-4">체크리스트</h3>
                            <div className="space-y-3">
                                {guideData?.checklist.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                                        <input type="checkbox" className="mt-1 w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500" />
                                        <span className="text-sm text-slate-700 font-medium leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4">전문가 Tip</h3>
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
