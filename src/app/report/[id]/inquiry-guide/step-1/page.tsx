"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ChevronRight,
    Home,
    Search,
    School,
    Lightbulb,
    HelpCircle,
    Thermometer,
    Zap,
    Info,
    ArrowRight,
    Copy,
    Sparkles,
    Check,
    Wand2,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

interface GuideData {
    title: string;
    description: string;
    goal: string;
    checklist: string[];
    example: string;
    tips: string[];
}

export default function Step1Page() {
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

            setLoading(true);
            try {
                const res = await fetch('/api/guide/step', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: topicParam, step: 1 })
                });

                if (!res.ok) throw new Error("Failed to fetch guide");

                const data = await res.json();
                setGuideData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGuide();
    }, [topicParam]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">
            {/* Header Removed */}

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/" className="hover:text-blue-600"><Home className="w-4 h-4" /></Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-blue-600">주제 상세</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">가설 설정 도우미</span>
                </nav>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Hero Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-2">
                                <div className="flex gap-2 mb-2">
                                    <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded">가설 설정</span>
                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">Step 1</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {guideData?.title || '좋은 가설을 세우는 방법'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {guideData?.description || "가설은 연구의 나침반입니다. '만약 ~한다면, ~할 것이다'라는 명확한 인과관계를 설정해보세요."}<br />
                                    선택하신 <span className="font-semibold text-blue-600">"{topicParam}"</span> 주제에 맞춰 가설을 구체화합니다.
                                </p>
                            </div>
                            <div className="hidden sm:flex w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full items-center justify-center text-blue-600">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Variable Setting Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                            변수 설정하기
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                    독립 변수 (원인)
                                    <HelpCircle className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Thermometer className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input
                                        className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm py-3"
                                        placeholder="예: 온도, 시간, 농도 등"
                                        type="text"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">실험자가 의도적으로 변화시키는 값입니다.</p>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                    종속 변수 (결과)
                                    <HelpCircle className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Zap className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input
                                        className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm py-3"
                                        placeholder="예: 성장률, 속도, 효율 등"
                                        type="text"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">관찰하거나 측정하고자 하는 결과값입니다.</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 items-start">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold text-blue-600 block mb-1">Tip: 변수 통제하기</span>
                                실험의 정확성을 위해 독립 변수 외에 결과에 영향을 줄 수 있는 '통제 변수'를 일정하게 유지해야 합니다.
                            </div>
                        </div>
                    </div>

                    {/* Hypothesis Statement Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-bold mr-3">2</span>
                            가설 문장 만들기
                        </h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                                <div className="flex-1 text-center sm:text-left w-full">
                                    <span className="text-xs font-medium text-gray-500 block mb-1">만약 (If)</span>
                                    <div className="font-medium text-blue-600">독립 변수가 변화한다면</div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 sm:rotate-0" />
                                <div className="flex-1 text-center sm:text-left w-full">
                                    <span className="text-xs font-medium text-gray-500 block mb-1">그러면 (Then)</span>
                                    <div className="font-medium text-blue-600">종속 변수는 어떻게 될 것이다.</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">나의 가설 작성하기</label>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm p-4 h-32 resize-none"
                                    placeholder="위의 변수들을 활용하여 '만약 ~한다면, ~할 것이다' 형태의 문장으로 작성해보세요."
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">임시 저장</button>
                            <Link href={`/report/${id}/inquiry-guide/step-2?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
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
                                { step: 1, label: '가설 설정', status: 'current' },
                                { step: 2, label: '실험 설계', status: 'pending' },
                                { step: 3, label: '데이터 분석', status: 'pending' },
                                { step: 4, label: '보고서 작성', status: 'pending' },
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                                    <h4 className={`text-sm font-bold ${item.status === 'current' ? 'text-blue-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                        {item.step}. {item.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.status === 'current' ? '연구의 방향성을 잡는 단계입니다.' : item.status === 'pending' ? '대기 중' : '완료됨'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Example Hypotheses */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm">참고할 만한 가설 예시</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">물리학</span>
                                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">"빛의 입사각이 90도에 가까울수록 태양광 패널의 발전량은 증가할 것이다."</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">환경과학</span>
                                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">"패널 표면의 먼지 농도가 높을수록 발전 효율은 비선형적으로 감소할 것이다."</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 text-center text-sm text-blue-600 font-medium hover:underline">더 보기</button>
                    </div>

                    {/* AI Helper */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="text-yellow-300 w-5 h-5" />
                                <h3 className="font-bold text-sm">AI 가설 도우미</h3>
                            </div>
                            <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                                작성이 어려우신가요? AI가 주제를 분석하여 적절한 가설을 제안해드립니다.
                            </p>
                            <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/20">
                                AI 제안 받기
                            </button>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100 text-lg">
                        <School className="w-6 h-6" />
                        Scholarly
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-blue-600">이용약관</Link>
                        <Link href="#" className="hover:text-blue-600">개인정보처리방침</Link>
                        <Link href="#" className="hover:text-blue-600">고객센터</Link>
                    </div>
                    <div>
                        © 2024 Scholarly Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
