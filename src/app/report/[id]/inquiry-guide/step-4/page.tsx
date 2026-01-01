"use client";

import React, { useState, useEffect, Suspense } from 'react';
import {
    ChevronRight,
    Home,
    ArrowRight,
    ArrowLeft,
    FileText,
    Download,
    Wand2,
    Save,
    Check,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';

interface ReportSection {
    id: string;
    title: string;
    content: string;
    placeholder: string;
}

function Step4PageContent() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [activeSection, setActiveSection] = useState("introduction");
    const [isGenerating, setIsGenerating] = useState(false);

    // Initial Draft State
    const [sections, setSections] = useState<Record<string, string>>({
        introduction: "",
        methods: "",
        results: "",
        conclusion: ""
    });

    const handleGenerateDraft = () => {
        setIsGenerating(true);
        // Mock AI Generation
        setTimeout(() => {
            setSections({
                introduction: "본 연구는 '큰 수의 법칙'이 실제 물리적 실험(동전 던지기)에서도 성립하는지를 확인하기 위해 수행되었다. 확률론적 관점에서 독립 시행의 횟수(n)가 증가함에 따라 통계적 확율이 수학적 확률에 수렴한다는 것을 가설로 설정하였다.",
                methods: "Python 및 JavaScript 기반의 가상 실험 도구를 사용하여 동전 던지기 시뮬레이션을 수행하였다. 시행 횟수 n을 10회부터 10,000회까지 10배씩 증가시키며 앞면이 나온 횟수와 비율을 기록하였다. 변인 통제를 위해 동전의 앞/뒤 확률은 0.5로 고정하였다.",
                results: "1. n=10일 때, 앞면 비율은 0.6(60%)로 수학적 확률(0.5)과 큰 오차를 보였다.\n2. n=100일 때, 비율은 0.54(54%)로 오차가 줄어들었다.\n3. n=10,000일 때, 비율은 0.501(50.1%)로 0.5에 매우 근접하였다.\n\n이는 그래프상에서도 0.5를 중심으로 진동폭이 줄어드는 형태로 관찰되었다.",
                conclusion: "실험 결과, 시행 횟수가 증가함에 따라 상대도수는 수학적 확률 0.5에 수렴함을 확인하였다. 이는 큰 수의 법칙을 실험적으로 입증한 것이며, 오차 발생의 원인은 시행 횟수의 부족에 있음을 알 수 있다."
            });
            setIsGenerating(false);
        }, 1500);
    };

    const handleContentChange = (value: string) => {
        setSections(prev => ({
            ...prev,
            [activeSection]: value
        }));
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Hero Section - Compact Version for Editor */}
            <div className="w-full bg-slate-900 border-b border-white/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-slate-400 hover:text-white transition-colors"><Home className="w-5 h-5" /></Link>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                        <span className="text-slate-200 font-bold">탐구 보고서 에디터</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="text-slate-400 hover:text-white">
                            <Save className="w-4 h-4 mr-2" /> 저장
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Download className="w-4 h-4 mr-2" /> PDF 내보내기
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-8 h-[calc(100vh-64px)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

                    {/* Left: Navigation & Preview */}
                    <div className="lg:col-span-3 h-full flex flex-col gap-4">
                        <Card className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex-1">
                            <h3 className="font-bold text-slate-900 mb-4 px-2">목차</h3>
                            <nav className="space-y-1">
                                {['introduction', 'methods', 'results', 'conclusion'].map((sec) => (
                                    <button
                                        key={sec}
                                        onClick={() => setActiveSection(sec)}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${activeSection === sec
                                                ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className="capitalize">{sec}</span>
                                        {sections[sec] && <Check className="w-3 h-3 text-blue-500" />}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-8 px-2">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Completion</h4>
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="bg-blue-500 h-full transition-all duration-500"
                                            style={{ width: `${(Object.values(sections).filter(v => v.length > 0).length / 4) * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-right text-xs text-slate-500 mt-1">
                                        {Object.values(sections).filter(v => v.length > 0).length} / 4 Sections
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Editor Area */}
                    <div className="lg:col-span-9 h-full flex flex-col">
                        <Card className="bg-white flex-1 shadow-lg border-slate-200 overflow-hidden flex flex-col relative">

                            {/* Toolbar */}
                            <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50">
                                <h2 className="text-lg font-bold text-slate-800 capitalize">
                                    {activeSection}
                                </h2>

                                {sections[activeSection] === "" && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                                        onClick={handleGenerateDraft}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? (
                                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 작성 중...</>
                                        ) : (
                                            <><Wand2 className="w-4 h-4 mr-2" /> AI 초안 생성</>
                                        )}
                                    </Button>
                                )}
                            </div>

                            {/* Text Area */}
                            <div className="flex-1 p-8 bg-white overflow-y-auto">
                                <Textarea
                                    value={sections[activeSection]}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                    placeholder={`Write your ${activeSection} here...`}
                                    className="w-full h-full min-h-[500px] resize-none border-none focus-visible:ring-0 text-lg leading-relaxed text-slate-700 p-0 placeholder:text-slate-300"
                                />
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute bottom-6 right-6 text-xs text-slate-300 pointer-events-none">
                                {sections[activeSection].length} characters
                            </div>
                        </Card>

                        {/* Navigation Footer */}
                        <div className="flex justify-between items-center pt-8 mt-2">
                            <Button variant="outline" size="lg" className="rounded-full px-6 bg-white border-slate-200" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> 이전 단계
                            </Button>
                            <Link href={`/report/${id}/inquiry-guide/complete?topic=${encodeURIComponent(topicParam || '')}`}>
                                <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200 text-white">
                                    보고서 최종 완성 <Check className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function Step4Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step4PageContent />
        </Suspense>
    );
}
