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
    Beaker,
    PlusCircle,
    Check,
    ArrowRight,
    ExternalLink,
    Play
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

export default function Step2Page() {
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
                    body: JSON.stringify({ topic: topicParam, step: 2 })
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
                    <Link href={`/report/${id}/inquiry-guide/step-1?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-blue-600">가설 설정</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">실험 설계 도우미</span>
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
                                    <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 rounded">실험 설계</span>
                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">Step 2</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {guideData?.title || '성공적인 실험을 위한 설계'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {guideData?.description || '앞서 세운 가설을 검증하기 위한 구체적인 방법을 설계합니다.'}<br />
                                    <span className="font-semibold text-blue-600">"{topicParam}"</span> 가설을 입증할 통제된 실험 환경을 구성하세요.
                                </p>
                            </div>
                            <div className="hidden sm:flex w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full items-center justify-center text-purple-600">
                                <Beaker className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Materials Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                            준비물 및 실험 도구
                        </h3>

                        <div className="space-y-4 mb-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">핵심 장비</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm py-3 px-4"
                                        placeholder="예: 소형 태양광 패널 (5V), 멀티미터"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">보조 도구</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm py-3 px-4"
                                        placeholder="예: 온도계, 자, 타이머"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">재료 및 기타</label>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm p-4 h-20 resize-none"
                                    placeholder="실험에 필요한 소모품이나 기타 준비물을 입력하세요."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Methodology Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-bold mr-3">2</span>
                            실험 과정 설계 (Methodology)
                        </h3>

                        <div className="space-y-6 mb-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 items-start mb-4">
                                <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold text-blue-600 block mb-1">Tip: 재현 가능성</span>
                                    다른 사람이 이 설명을 보고 똑같이 실험을 재현할 수 있을 정도로 구체적으로 작성해야 합니다.
                                </div>
                            </div>

                            <div className="relative pl-6 border-l-2 border-dashed border-gray-200 dark:border-gray-700 space-y-6">
                                <div className="relative">
                                    <span className="absolute -left-[33px] top-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">환경 설정</label>
                                        <textarea
                                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm p-3 h-24 resize-none"
                                            placeholder="실험 환경을 어떻게 세팅할지 설명하세요."
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[33px] top-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center text-sm font-bold">2</span>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">변인 조작 및 측정</label>
                                        <textarea
                                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm p-3 h-24 resize-none"
                                            placeholder="독립변수를 어떻게 변화시키고 종속변수를 어떻게 측정할지 설명하세요."
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[33px] top-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center text-sm font-bold">3</span>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">반복 수행</label>
                                        <textarea
                                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm p-3 h-24 resize-none"
                                            placeholder="데이터의 신뢰도를 높이기 위한 반복 실험 계획을 적어주세요."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline ml-6">
                                <PlusCircle className="w-5 h-5" />
                                단계 추가하기
                            </button>
                        </div>
                    </div>

                    {/* Data Collection Plan Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>
                        <h3 className="flex items-center text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
                            <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-bold mr-3">3</span>
                            데이터 수집 계획
                        </h3>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">기록할 데이터 테이블 예시</label>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
                                        <tr>
                                            <th className="px-6 py-3">온도 (°C)</th>
                                            <th className="px-6 py-3">전압 (V)</th>
                                            <th className="px-6 py-3">전류 (mA)</th>
                                            <th className="px-6 py-3">계산된 전력 (mW)</th>
                                            <th className="px-6 py-3">비고</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">25</td>
                                            <td className="px-6 py-4 text-gray-300 italic">입력 예정</td>
                                            <td className="px-6 py-4 text-gray-300 italic">입력 예정</td>
                                            <td className="px-6 py-4 text-gray-300 italic">자동 계산</td>
                                            <td className="px-6 py-4">기준 온도</td>
                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800">
                                            <td className="px-6 py-4">30</td>
                                            <td className="px-6 py-4 text-gray-300 italic">입력 예정</td>
                                            <td className="px-6 py-4 text-gray-300 italic">입력 예정</td>
                                            <td className="px-6 py-4 text-gray-300 italic">자동 계산</td>
                                            <td className="px-6 py-4">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-right">* 위 형식으로 엑셀 시트가 자동 생성됩니다.</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <Link href={`/report/${id}/inquiry-guide/step-1?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            이전 단계
                        </Link>
                        <Link href={`/report/${id}/inquiry-guide/step-3?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                            실험 설계 저장
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
                                { step: 2, label: '실험 설계', status: 'current' },
                                { step: 3, label: '데이터 분석', status: 'pending' },
                                { step: 4, label: '보고서 작성', status: 'pending' },
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                                    <h4 className={`text-sm font-bold ${item.status === 'current' ? 'text-blue-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                        {item.step}. {item.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.status === 'completed' ? '완료됨' : item.status === 'current' ? '현재 단계' : '대기 중'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reference Experiments */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm">참고 실험 레퍼런스</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">IEEE Paper</span>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">Temperature coefficients of photovoltaic modules</p>
                                <p className="text-xs text-gray-500">표준 실험 환경(STC)과 측정 방법에 대한 국제 표준 가이드라인 요약</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">실험 팁</span>
                                    <Lightbulb className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                </div>
                                <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">광원 거리와 조도 유지</p>
                                <p className="text-xs text-gray-500">램프 열이 패널 온도를 의도치 않게 높이지 않도록 거리를 유지하거나 팬을 사용하세요.</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 text-center text-sm text-blue-600 font-medium hover:underline">자료 더 찾아보기</button>
                    </div>

                    {/* Simulation Helper */}
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Beaker className="text-yellow-300 w-5 h-5" />
                                <h3 className="font-bold text-sm">실험 시뮬레이션</h3>
                            </div>
                            <p className="text-xs text-purple-100 mb-4 leading-relaxed">
                                실제 실험 전, 가상 시뮬레이터로 예상 데이터를 확인해보세요. 시행착오를 줄일 수 있습니다.
                            </p>
                            <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/20">
                                시뮬레이터 실행
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
