"use client";

import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    Home,
    Beaker,
    ListChecks,
    ClipboardList,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Check,
    Microscope,
    Table2
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

export default function Step3Page() {
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
            const storageKey = `inquiry_step_3_${id}_${topicParam}`;
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
                    body: JSON.stringify({ topic: topicParam, step: 3 })
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
                    <span className="font-medium text-gray-900 dark:text-gray-100">Step 3. 탐구 실습</span>
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
                                    <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 rounded">실천 활동</span>
                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">Step 3</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {guideData?.title || '직접 실험하고 데이터 모으기'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {guideData?.description || "이론을 증명하기 위한 실제 활동을 수행합니다. 실험, 설문, 코딩 등 다양한 방식으로 접근해보세요."}<br />
                                    설계한 내용을 바탕으로 <span className="font-semibold text-purple-600">데이터를 수집</span>하는 단계입니다.
                                </p>
                            </div>
                            <div className="hidden sm:flex w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full items-center justify-center text-purple-600">
                                <Beaker className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Activity Checklist Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                            활동 체크리스트
                        </h3>

                        <div className="space-y-3 mb-6">
                            {/* Placeholder Checkboxes */}
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="w-5 h-5 rounded border border-gray-300 bg-white flex items-center justify-center"></div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">준비물(데이터셋, 실험 기구) 확보하기</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="w-5 h-5 rounded border border-gray-300 bg-white flex items-center justify-center"></div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">변인 통제 조건 확인하기 (환경, 시간 등)</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="w-5 h-5 rounded border border-gray-300 bg-white flex items-center justify-center"></div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">1차 데이터 수집 수행</span>
                            </div>
                        </div>
                    </div>

                    {/* Data/Observation Log Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-bold mr-3">2</span>
                            관찰 및 결과 기록
                        </h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                <span>주요 관찰 내용이나 실험 수치를 기록하세요.</span>
                                <button className="flex items-center gap-1 text-purple-600 text-xs font-bold hover:underline">
                                    <Table2 className="w-3 h-3" /> 표 만들기
                                </button>
                            </div>
                            <textarea
                                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm p-4 h-48 resize-none leading-relaxed font-mono"
                                placeholder={`[2024-05-20 1회차 실험]\n- 온도: 24도, 습도: 45%\n- 결과값: 15.4cm\n- 특이사항: 예상보다 반응 속도가 느림.`}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Link href={`/report/${id}/inquiry-guide/step-2?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                이전 단계
                            </Link>
                            <Link href={`/report/${id}/inquiry-guide/step-4?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2">
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
                                { step: 2, label: '교과 연계', status: 'completed' },
                                { step: 3, label: '탐구 실습', status: 'current' },
                                { step: 4, label: '보고서 작성', status: 'pending' },
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-purple-600' : 'bg-gray-300'}`}></span>
                                    <h4 className={`text-sm font-bold ${item.status === 'current' ? 'text-purple-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                        {item.step}. {item.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.status === 'current' ? '결과물을 만들어내는 핵심 단계입니다.' : item.status === 'pending' ? '대기 중' : '완료됨'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Helper */}
                    <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="text-yellow-300 w-5 h-5" />
                                <h3 className="font-bold text-sm">AI 실험 도우미</h3>
                            </div>
                            <p className="text-xs text-purple-100 mb-4 leading-relaxed">
                                실험 결과가 예상과 다르게 나왔나요? 오차 원인을 분석하거나 데이터를 해석하는 데 도움을 드릴 수 있어요.
                            </p>
                            <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/20">
                                데이터 분석 팁 보기
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
                                            <span>사진이나 동영상으로 과정을 기록했나요?</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>실패한 데이터도 버리지 않고 기록했나요?</span>
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
