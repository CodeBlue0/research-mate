"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ChevronRight,
    Home,
    Search,
    School,
    FileText,
    Lightbulb,
    Quote,
    Link as LinkIcon,
    Plus,
    Download,
    Check,
    FileType,
    Sparkles,
    BookOpen
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

export default function Step4Page() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [guideData, setGuideData] = useState<GuideData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('intro');

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
                    body: JSON.stringify({ topic: topicParam, step: 4 })
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
                    <span className="font-medium text-gray-900 dark:text-gray-100">보고서 작성 도우미</span>
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
                                    <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 rounded">보고서 작성</span>
                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">Step 4</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {guideData?.title || '성공적인 탐구 보고서 작성 가이드'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {guideData?.description || '연구 결과를 논리적으로 정리하고 설득력 있는 보고서를 완성해보세요.'}<br />
                                    <span className="font-semibold text-blue-600">"{topicParam}"</span>의 실험 결과를 바탕으로 작성을 시작합니다.
                                </p>
                            </div>
                            <div className="hidden sm:flex w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full items-center justify-center text-purple-600">
                                <FileText className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Writing Area */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 p-4">
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                <button
                                    onClick={() => setActiveTab('intro')}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm border transition-colors ${activeTab === 'intro' ? 'bg-white shadow-sm text-blue-600 border-gray-200' : 'text-gray-500 hover:bg-gray-100 border-transparent'}`}
                                >
                                    서론 (Introduction)
                                </button>
                                <button
                                    onClick={() => setActiveTab('method')}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm border transition-colors ${activeTab === 'method' ? 'bg-white shadow-sm text-blue-600 border-gray-200' : 'text-gray-500 hover:bg-gray-100 border-transparent'}`}
                                >
                                    연구 방법 (Method)
                                </button>
                                <button
                                    onClick={() => setActiveTab('results')}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm border transition-colors ${activeTab === 'results' ? 'bg-white shadow-sm text-blue-600 border-gray-200' : 'text-gray-500 hover:bg-gray-100 border-transparent'}`}
                                >
                                    결과 (Results)
                                </button>
                                <button
                                    onClick={() => setActiveTab('conclusion')}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm border transition-colors ${activeTab === 'conclusion' ? 'bg-white shadow-sm text-blue-600 border-gray-200' : 'text-gray-500 hover:bg-gray-100 border-transparent'}`}
                                >
                                    결론 (Conclusion)
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center text-sm font-bold">1</div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                                        {activeTab === 'intro' && '연구의 필요성 및 목적 서술하기'}
                                        {activeTab === 'method' && '연구 방법 및 절차 설명하기'}
                                        {activeTab === 'results' && '연구 결과 및 데이터 제시하기'}
                                        {activeTab === 'conclusion' && '결론 도출 및 제언 작성하기'}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {activeTab === 'intro' && '왜 이 주제를 선정했는지, 이 연구가 어떤 의미가 있는지 명확하게 밝혀주세요.'}
                                        {activeTab === 'method' && '실험 설계와 수행 과정을 구체적으로 기술하여 재현 가능성을 높이세요.'}
                                        {activeTab === 'results' && '수집된 데이터를 표와 그래프로 시각화하고 객관적으로 분석하세요.'}
                                        {activeTab === 'conclusion' && '연구 결과를 요약하고 한계점 및 향후 연구 방향을 제시하세요.'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        {activeTab === 'intro' && '연구 동기'}
                                        {activeTab === 'method' && '실험 환경 및 도구'}
                                        {activeTab === 'results' && '데이터 분석 결과'}
                                        {activeTab === 'conclusion' && '연구 요약'}
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm p-4 h-32 resize-none placeholder-gray-400"
                                        placeholder={activeTab === 'intro' ? "예: 최근 기후 변화로 인해..." : "내용을 입력하세요..."}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        {activeTab === 'intro' && '이론적 배경 (선행 연구)'}
                                        {activeTab === 'method' && '실험 절차'}
                                        {activeTab === 'results' && '결과 해석'}
                                        {activeTab === 'conclusion' && '제언'}
                                    </label>
                                    {activeTab === 'intro' && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-3 text-sm text-gray-500 dark:text-gray-400 flex gap-2">
                                            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                            <span>{guideData?.tips?.[0] || '관련된 핵심 이론이나 선행 연구를 인용하면 설득력이 높아집니다.'}</span>
                                        </div>
                                    )}
                                    <textarea
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm p-4 h-32 resize-none placeholder-gray-400"
                                        placeholder="내용을 입력하세요."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* References Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <Quote className="w-5 h-5 mr-2 text-gray-400" />
                            참고 문헌 및 인용 관리
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-gray-400" />
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900 dark:text-gray-100">Temperature coefficients of photovoltaic modules</p>
                                        <p className="text-xs text-gray-500">IEEE Paper • 2023</p>
                                    </div>
                                </div>
                                <button className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-md shadow-sm transition-colors">
                                    인용 추가
                                </button>
                            </div>
                            <button className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" />
                                직접 입력하여 추가하기
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">미리보기</button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            PDF로 내보내기
                        </button>
                        <Link href="/" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                            작성 완료
                            <Check className="w-4 h-4" />
                        </Link>
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
                                { step: 3, label: '데이터 분석', status: 'completed' },
                                { step: 4, label: '보고서 작성', status: 'current' },
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                                    <h4 className={`text-sm font-bold ${item.status === 'current' ? 'text-blue-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'completed' ? 'opacity-50' : ''}`}>
                                        {item.step}. {item.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.status === 'completed' ? '완료됨' : item.status === 'current' ? '현재 단계' : '대기 중'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Templates */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm">우수 보고서 템플릿</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group flex items-start gap-3">
                                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
                                    <FileText className="text-red-500 w-5 h-5" />
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">과학 탐구 보고서 표준 양식</h5>
                                    <p className="text-xs text-gray-500 mt-0.5">학교 제출용 표준 서식입니다.</p>
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group flex items-start gap-3">
                                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
                                    <BookOpen className="text-blue-500 w-5 h-5" />
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">소논문 형식 템플릿</h5>
                                    <p className="text-xs text-gray-500 mt-0.5">심화 연구를 위한 학술적 양식입니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Helper */}
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="text-yellow-300 w-5 h-5" />
                                <h3 className="font-bold text-sm">AI 윤문 도우미</h3>
                            </div>
                            <p className="text-xs text-purple-100 mb-4 leading-relaxed">
                                문장이 매끄럽지 않나요? AI가 문법 오류를 수정하고 더 학술적인 표현으로 다듬어 드립니다.
                            </p>
                            <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/20">
                                문장 다듬기 요청
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
