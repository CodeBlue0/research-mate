"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ChevronRight,
    Home,
    Search,
    School,
    LineChart,
    Table,
    AlertTriangle,
    CheckCircle,
    Circle,
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Bot,
    Upload,
    ScatterChart
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
                    <Link href={`/report/${id}/inquiry-guide/step-2?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-blue-600">실험 설계</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">데이터 분석 가이드</span>
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
                                    <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 rounded">데이터 분석</span>
                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">Step 3</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {guideData?.title || '실험 데이터 분석 및 시각화'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {guideData?.description || '수집된 데이터를 의미 있는 정보로 변환하는 단계입니다.'} <br />
                                    <span className="font-semibold text-blue-600">"{topicParam}"</span> 실험 결과를 바탕으로 결론을 도출해보세요.
                                </p>
                            </div>
                            <div className="hidden sm:flex w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full items-center justify-center text-purple-600">
                                <LineChart className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Data Organization Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold mr-3">1</span>
                            데이터 정리 및 전처리
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-4">
                                    <Table className="w-6 h-6 text-purple-600 mt-1" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm mb-1 text-gray-900 dark:text-gray-100">데이터 테이블 구조화</h4>
                                        <p className="text-xs text-gray-500 mb-3">
                                            엑셀(Excel)이나 구글 시트 등을 활용하여 변수별로 열(Column)을 구분하세요.
                                        </p>
                                        <div className="grid grid-cols-3 gap-2 text-xs text-center border-t border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded overflow-hidden">
                                            <div className="bg-gray-100 dark:bg-gray-800 p-2 font-semibold border-b border-r border-gray-200 dark:border-gray-700">온도 (°C)</div>
                                            <div className="bg-gray-100 dark:bg-gray-800 p-2 font-semibold border-b border-r border-gray-200 dark:border-gray-700">전압 (V)</div>
                                            <div className="bg-gray-100 dark:bg-gray-800 p-2 font-semibold border-b border-r border-gray-200 dark:border-gray-700">전류 (A)</div>
                                            <div className="p-2 border-b border-r border-gray-200 dark:border-gray-700">25</div>
                                            <div className="p-2 border-b border-r border-gray-200 dark:border-gray-700">18.5</div>
                                            <div className="p-2 border-b border-r border-gray-200 dark:border-gray-700">3.2</div>
                                            <div className="p-2 border-b border-r border-gray-200 dark:border-gray-700">35</div>
                                            <div className="p-2 border-b border-r border-gray-200 dark:border-gray-700">17.2</div>
                                            <div className="p-2 border-b border-r border-gray-200 dark:border-gray-700">3.1</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg items-start border border-yellow-100 dark:border-yellow-900/30">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                                <div className="text-sm">
                                    <span className="font-bold text-yellow-800 dark:text-yellow-200 block mb-1">이상치(Outlier) 확인</span>
                                    <p className="text-yellow-700 dark:text-yellow-300 text-xs">
                                        측정 중 실수로 인해 다른 값들과 현저하게 차이나는 데이터가 있는지 확인하고, 필요하다면 재측정하거나 제외해야 합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Graph Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-bold mr-3">2</span>
                            그래프 시각화 추천
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-600 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                        <LineChart className="w-5 h-5" />
                                    </div>
                                    <CheckCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">꺾은선 그래프 (Line Chart)</h4>
                                <p className="text-xs text-gray-500">
                                    온도 변화에 따른 전압/효율의 <span className="text-blue-600 font-medium">추세</span>를 보여주기에 가장 적합합니다.
                                </p>
                            </div>
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-600 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg text-green-600 dark:text-green-400">
                                        <ScatterChart className="w-5 h-5" />
                                    </div>
                                    <Circle className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">산점도 (Scatter Plot)</h4>
                                <p className="text-xs text-gray-500">
                                    데이터의 분포와 두 변수 간의 <span className="text-blue-600 font-medium">상관관계</span>를 파악할 때 유용합니다.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-dashed border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">무료 도구 추천</p>
                            <div className="flex justify-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Excel / Google Sheets</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Python (Matplotlib)</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> R Studio</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-4">
                        <Link href={`/report/${id}/inquiry-guide/step-2?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            이전 단계: 실험 설계
                        </Link>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">임시 저장</button>
                            <Link href={`/report/${id}/inquiry-guide/step-4?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                                결과 보고서 작성
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
                                { step: 1, label: '가설 설정', status: 'completed' },
                                { step: 2, label: '실험 설계', status: 'completed' },
                                { step: 3, label: '데이터 분석', status: 'current' },
                                { step: 4, label: '보고서 작성', status: 'pending' },
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-purple-600' : 'bg-gray-300'}`}></span>
                                    <h4 className={`text-sm font-bold ${item.status === 'completed' ? 'text-gray-900 dark:text-gray-100' : item.status === 'current' ? 'text-purple-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                        {item.step}. {item.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.status === 'completed' ? '완료됨' : item.status === 'current' ? '현재 진행 중' : '대기 중'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Concept Review */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm">관련 개념 복습</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border border-transparent hover:border-blue-600 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">P-V 곡선</span>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">전압과 전류의 곱으로 전력을 계산하여 최대 전력점(MPP)을 찾는 방법.</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border border-transparent hover:border-blue-600 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">온도 계수</span>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">온도가 1도 상승할 때마다 효율이 감소하는 비율을 나타내는 지표.</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Tool Helper */}
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Bot className="text-yellow-300 w-5 h-5" />
                                <h3 className="font-bold text-sm">AI 데이터 분석기</h3>
                            </div>
                            <p className="text-xs text-purple-100 mb-4 leading-relaxed">
                                엑셀 파일을 업로드하면 AI가 자동으로 추세선을 그리고 주요 통계값을 분석해드립니다.
                            </p>
                            <div className="flex flex-col gap-2">
                                <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/20 flex items-center justify-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    데이터 파일 업로드
                                </button>
                            </div>
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
