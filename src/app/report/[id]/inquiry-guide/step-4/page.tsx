"use client";

import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    Home,
    FileText,
    Download,
    Printer,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Check,
    PenTool,
    Layout
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

interface GuideData {
    title: string;
    description: string;
    goal: string;
    checklist: string[];
    tips: string[];
}

export default function Step4Page() {
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
            const storageKey = `inquiry_step_4_${id}_${topicParam}`;
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
                    body: JSON.stringify({ topic: topicParam, step: 4 })
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/" className="hover:text-blue-600"><Home className="w-4 h-4" /></Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-blue-600">주제 상세</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">Step 4. 보고서 작성</span>
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
                                    <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-300 rounded">최종 정리</span>
                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">Step 4</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {guideData?.title || '나만의 탐구 보고서 완성하기'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {guideData?.description || "지금까지 수행한 모든 과정을 논리정연하게 정리합니다. 서론, 본론, 결론의 구조를 갖춰 작성해보세요."}<br />
                                    활동의 가치를 증명하는 <span className="font-semibold text-red-600">최종 결과물</span>을 만듭니다.
                                </p>
                            </div>
                            <div className="hidden sm:flex w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full items-center justify-center text-red-600">
                                <FileText className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Report Drafting Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                            구조 잡기 (Drafting)
                        </h3>

                        <div className="space-y-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">1. 서론 (탐구 동기 및 목적)</label>
                                <p className="text-xs text-gray-500 mb-2">Step 1에서 작성한 '배경 이론'과 '교과 연계성'을 녹여내세요.</p>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3 text-sm h-32 resize-none"
                                    placeholder="이 주제를 선정하게 된 이유와, 이 탐구를 통해 알아보고자 하는 바를 명확히 적습니다."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">2. 본론 (탐구 과정 및 결과)</label>
                                <p className="text-xs text-gray-500 mb-2">Step 3에서 수집한 데이터와 분석 내용을 구체적으로 기술하세요.</p>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3 text-sm h-32 resize-none"
                                    placeholder="어떤 방식으로 실험을 진행했는지, 그 결과 어떤 데이터가 나왔는지 객관적으로 서술합니다."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">3. 결론 (고찰 및 제언)</label>
                                <p className="text-xs text-gray-500 mb-2">결과가 갖는 의미와 아쉬웠던 점, 더 발전시킬 방향을 적으세요.</p>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3 text-sm h-32 resize-none"
                                    placeholder="가설이 검증되었는지 판단하고, 이 탐구가 가지는 의의를 마무리합니다."
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Link href={`/report/${id}/inquiry-guide/step-3?topic=${encodeURIComponent(topicParam || '')}`} className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                                <ArrowLeft className="w-5 h-5" />
                                이전 단계
                            </Link>
                            <button className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/30">
                                <Download className="w-5 h-5" />
                                PDF로 저장하기
                            </button>
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
                                { step: 2, label: '교과 연계', status: 'completed' },
                                { step: 3, label: '탐구 실습', status: 'completed' },
                                { step: 4, label: '보고서 작성', status: 'current' },
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-red-600' : 'bg-gray-300'}`}></span>
                                    <h4 className={`text-sm font-bold ${item.status === 'current' ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                        {item.step}. {item.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.status === 'current' ? '대장정을 마무리하는 단계입니다!' : item.status === 'pending' ? '대기 중' : '완료됨'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Helper */}
                    <div className="bg-gradient-to-br from-red-600 to-orange-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="text-yellow-300 w-5 h-5" />
                                <h3 className="font-bold text-sm">AI 첨삭 도우미</h3>
                            </div>
                            <p className="text-xs text-red-100 mb-4 leading-relaxed">
                                문장이 매끄럽지 않거나 논리적 비약이 걱정되나요? AI가 보고서 초안을 검토하고 피드백을 제공합니다.
                            </p>
                            <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/20">
                                보고서 초안 검토받기
                            </button>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
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
                                            <span>맞춤법과 띄어쓰기를 확인했나요?</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>인용한 자료의 출처를 빠짐없이 표기했나요?</span>
                                        </li>
                                    </>
                                )}
                        </ul>
                    </div>

                </div>
            </main>
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
