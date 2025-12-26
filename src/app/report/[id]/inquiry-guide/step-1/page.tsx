"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ChevronRight,
    Home,
    BookOpen,
    Lightbulb,
    HelpCircle,
    Search,
    PenTool,
    Info,
    ArrowRight,
    ArrowLeft,
    Copy,
    Sparkles,
    Check,
    Library
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

interface GuideData {
    title: string;
    description: string;
    goal: string;
    checklist: string[];
    tips: string[];
    advancedConcepts?: { name: string; description: string }[];
    curriculumConcepts?: { name: string; description: string }[];
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

            // [Persistence Logic] Check LocalStorage first
            const storageKey = `inquiry_step_1_${id}_${topicParam}`;
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
                    body: JSON.stringify({ topic: topicParam, step: 1 })
                });

                if (!res.ok) throw new Error("Failed to fetch guide");

                const data = await res.json();
                setGuideData(data);

                // [Persistence Logic] Save to LocalStorage
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
                    <span className="font-medium text-gray-900 dark:text-gray-100">Step 1. 배경 이론</span>
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
                                    <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded">배경 이론</span>
                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">Step 1</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {guideData?.title || '주제 관련 개념 탄탄히 다기지'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {guideData?.description || "성공적인 탐구의 시작은 정확한 이론 이해부터입니다. 주제와 관련된 핵심 개념을 정리해보세요."}<br />
                                    선택하신 <span className="font-semibold text-blue-600">"{topicParam}"</span> 관련 이론을 조사합니다.
                                </p>
                            </div>
                            <div className="hidden sm:flex w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full items-center justify-center text-blue-600">
                                <BookOpen className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* 1. Advanced Concepts Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                            심화 개념 (대학/전공 내용)
                            <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">AI 추천</span>
                        </h3>

                        <div className="space-y-6 mb-6">
                            {guideData?.advancedConcepts?.map((concept, idx) => (
                                <div key={idx} className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <label className="block text-base font-bold text-indigo-900 dark:text-indigo-100">{concept.name}</label>
                                        <Copy className="w-4 h-4 text-indigo-400 cursor-pointer hover:text-indigo-600" />
                                    </div>
                                    <textarea
                                        className="w-full rounded-md border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-3 text-sm focus:ring-2 focus:ring-indigo-500 resize-none text-gray-700 dark:text-gray-300 leading-relaxed font-mono"
                                        defaultValue={concept.description}
                                        rows={12}
                                    />
                                </div>
                            )) || (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>심화 개념을 분석(생성) 중입니다...</p>
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* 2. High School Curriculum Concepts Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold mr-3">2</span>
                            관련 교과 과정 (고등학교)
                            <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">필수 포함</span>
                        </h3>

                        <div className="space-y-6 mb-6">
                            {guideData?.curriculumConcepts?.map((concept, idx) => (
                                <div key={idx} className="p-5 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <label className="block text-base font-bold text-green-900 dark:text-green-100">{concept.name}</label>
                                        <Copy className="w-4 h-4 text-green-400 cursor-pointer hover:text-green-600" />
                                    </div>
                                    <textarea
                                        className="w-full rounded-md border border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 p-3 text-sm focus:ring-2 focus:ring-green-500 resize-none text-gray-700 dark:text-gray-300 leading-relaxed font-mono"
                                        defaultValue={concept.description}
                                        rows={12}
                                    />
                                </div>
                            )) || (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>교과 연계 내용을 분석 중입니다...</p>
                                    </div>
                                )}
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 items-start">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold text-blue-600 block mb-1">Tip: 출처 기록하기</span>
                                개념을 인용한 교과서 페이지나 논문 제목을 함께 메모해두면 나중에 참고문헌 작성 시 편리합니다.
                            </div>
                        </div>
                    </div>

                    {/* My Theory Note Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-bold mr-3">3</span>
                            나만의 배경 이론 노트
                        </h3>

                        <div className="space-y-4 mb-6">
                            <p className="text-sm text-gray-500">
                                위에서 정리한 개념들을 바탕으로, 이번 탐구의 이론적 배경이 되는 내용을 서술형으로 작성해보세요. (보고서의 서론 부분에 활용됩니다.)
                            </p>
                            <textarea
                                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm p-4 h-48 resize-none leading-relaxed"
                                placeholder={`예시:\n이 탐구는 [핵심 개념]에 기반을 두고 있다. 교과서에서는 ...라고 설명하고 있으나, 실제 환경에서는 ...한 변수가 작용할 것으로 예상된다. 따라서 본 연구에서는 ... 이론을 적용하여 현상을 분석하고자 한다.`}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                이전 단계
                            </Link>
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
                                { step: 1, label: '배경 이론', status: 'current' },
                                { step: 2, label: '교과 연계', status: 'pending' },
                                { step: 3, label: '탐구 실습', status: 'pending' },
                                { step: 4, label: '보고서 작성', status: 'pending' },
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                                    <h4 className={`text-sm font-bold ${item.status === 'current' ? 'text-blue-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                        {item.step}. {item.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.status === 'current' ? '이론적 기반을 다지는 단계입니다.' : item.status === 'pending' ? '대기 중' : '완료됨'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Helper */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="text-yellow-300 w-5 h-5" />
                                <h3 className="font-bold text-sm">AI 이론 도우미</h3>
                            </div>
                            <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                                어떤 개념을 찾아야 할지 막막한가요? AI가 주제와 연관된 핵심 키워드를 추천해드립니다.
                            </p>
                            <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/20">
                                핵심 개념 추천받기
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
                                            <span>교과서에서 관련 단원을 찾았나요?</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>핵심 용어의 정의를 명확히 이해했나요?</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>선행 연구나 관련 자료를 2개 이상 찾았나요?</span>
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
