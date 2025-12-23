"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ChevronRight,
    Home,
    BarChart3,
    Table,
    AlertTriangle,
    TrendingUp,
    ScatterChart, // Replaced ScatterPlot (not in lucide) with ScatterChart (if avail) or generic Chart
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    UploadCloud,
    Bot
} from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Step3Page() {
    const params = useParams();
    const id = params?.id as string;

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-slate-500 mb-8">
                    <Link href={`/report/${id}`} className="hover:text-blue-600 transition-colors">
                        <Home className="w-4 h-4" />
                    </Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link href={`/report/${id}/inquiry-guide`} className="hover:text-blue-600 transition-colors">주제 상세</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link href={`/report/${id}/inquiry-guide/step-2`} className="hover:text-blue-600 transition-colors">실험 설계</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-bold text-slate-900">데이터 분석 가이드</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Header Section */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                            <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2">
                                    <div className="flex gap-2 mb-2">
                                        <Badge className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-none rounded-md px-2 py-1">데이터 분석</Badge>
                                        <Badge variant="outline" className="text-slate-500 bg-slate-100 border-none rounded-md px-2 py-1">Step 3</Badge>
                                    </div>
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        실험 데이터 분석 및 시각화
                                    </h1>
                                    <p className="text-slate-600 leading-relaxed">
                                        수집된 데이터를 의미 있는 정보로 변환하는 단계입니다. <br />
                                        <span className="font-bold text-blue-600">"태양광 패널의 온도별 효율성 분석"</span> 실험 결과를 바탕으로 결론을 도출해보세요.
                                    </p>
                                </div>
                                <div className="hidden sm:flex w-16 h-16 bg-purple-50 rounded-full items-center justify-center text-purple-600 flex-shrink-0">
                                    <BarChart3 className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Part 1: Data Organization */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
                            <h3 className="flex items-center text-lg font-bold mb-6 text-slate-900">
                                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold mr-3">1</span>
                                데이터 정리 및 전처리
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <div className="flex items-start gap-4">
                                        <Table className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm mb-1 text-slate-900">데이터 테이블 구조화</h4>
                                            <p className="text-xs text-slate-600 mb-3">
                                                엑셀(Excel)이나 구글 시트 등을 활용하여 변수별로 열(Column)을 구분하세요.
                                            </p>
                                            <div className="grid grid-cols-3 gap-0 text-xs text-center border border-slate-200 bg-white rounded overflow-hidden">
                                                <div className="bg-slate-100 p-2 font-bold border-b border-r border-slate-200">온도 (°C)</div>
                                                <div className="bg-slate-100 p-2 font-bold border-b border-r border-slate-200">전압 (V)</div>
                                                <div className="bg-slate-100 p-2 font-bold border-b border-slate-200">전류 (A)</div>
                                                <div className="p-2 border-b border-r border-slate-200">25</div>
                                                <div className="p-2 border-b border-r border-slate-200">18.5</div>
                                                <div className="p-2 border-b border-slate-200">3.2</div>
                                                <div className="p-2 border-r border-slate-200">35</div>
                                                <div className="p-2 border-r border-slate-200">17.2</div>
                                                <div className="p-2">3.1</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-amber-50 rounded-lg items-start border border-amber-100">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm">
                                        <span className="font-bold text-amber-800 block mb-1">이상치(Outlier) 확인</span>
                                        <p className="text-amber-700 text-xs">
                                            측정 중 실수로 인해 다른 값들과 현저하게 차이나는 데이터가 있는지 확인하고, 필요하다면 재측정하거나 제외해야 합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Part 2: Visualization */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200"></div>
                            <h3 className="flex items-center text-lg font-bold mb-6 text-slate-900">
                                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                그래프 시각화 추천
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-all cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <span className="text-slate-300 group-hover:text-blue-600">✓</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-900 mb-1">꺾은선 그래프 (Line Chart)</h4>
                                    <p className="text-xs text-slate-600">
                                        온도 변화에 따른 전압/효율의 <span className="text-blue-600 font-bold">추세</span>를 보여주기에 가장 적합합니다.
                                    </p>
                                </div>
                                <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-all cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                            <BarChart3 className="w-5 h-5" /> {/* Use BarChart instead of Scatter if needed, or stick to icons */}
                                        </div>
                                        <span className="text-slate-300 group-hover:text-blue-600">○</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-900 mb-1">산점도 (Scatter Plot)</h4>
                                    <p className="text-xs text-slate-600">
                                        데이터의 분포와 두 변수 간의 <span className="text-blue-600 font-bold">상관관계</span>를 파악할 때 유용합니다.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4 border border-dashed border-slate-200 text-center">
                                <p className="text-sm font-bold text-slate-900 mb-2">무료 도구 추천</p>
                                <div className="flex justify-center gap-4 text-xs text-slate-600">
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Excel / Sheets</span>
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Python</span>
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> R Studio</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <Link href={`/report/${id}/inquiry-guide/step-2`}>
                                <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    이전 단계: 실험 설계
                                </Button>
                            </Link>
                            <div className="flex gap-3">
                                <Button variant="outline" className="bg-slate-100 border-none text-slate-600 hover:bg-slate-200">
                                    임시 저장
                                </Button>
                                <Link href={`/report/${id}/inquiry-guide/step-4`}>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                                        결과 보고서 작성
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Progress */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">탐구 진행 상황</h3>
                            <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">
                                <Link href={`/report/${id}/inquiry-guide/step-1`}>
                                    <div className="relative group cursor-pointer">
                                        <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white group-hover:scale-110 transition-transform"></span>
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">1. 가설 설정</h4>
                                        <p className="text-xs text-slate-500 mt-1">완료됨</p>
                                    </div>
                                </Link>
                                <Link href={`/report/${id}/inquiry-guide/step-2`}>
                                    <div className="relative group cursor-pointer">
                                        <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white group-hover:scale-110 transition-transform"></span>
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">2. 실험 설계</h4>
                                        <p className="text-xs text-slate-500 mt-1">완료됨</p>
                                    </div>
                                </Link>
                                <div className="relative">
                                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-purple-600 ring-4 ring-white"></span>
                                    <h4 className="text-sm font-bold text-purple-600">3. 데이터 분석</h4>
                                    <p className="text-xs text-slate-500 mt-1">현재 진행 중</p>
                                </div>
                                <Link href={`/report/${id}/inquiry-guide/step-4`}>
                                    <div className="relative group cursor-pointer">
                                        <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white group-hover:scale-110 transition-transform"></span>
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">4. 보고서 작성</h4>
                                        <p className="text-xs text-slate-500 mt-1">최종 결과를 정리하여 발표합니다.</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Review Concepts */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 text-sm">관련 개념 복습</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-blue-600">P-V 곡선</span>
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                    </div>
                                    <p className="text-slate-500 text-xs">전압과 전류의 곱으로 전력을 계산하여 최대 전력점(MPP)을 찾는 방법.</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-green-600">온도 계수</span>
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                    </div>
                                    <p className="text-slate-500 text-xs">온도가 1도 상승할 때마다 효율이 감소하는 비율을 나타내는 지표.</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Helper */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bot className="w-5 h-5 text-yellow-300" />
                                    <h3 className="font-bold text-sm">AI 데이터 분석기</h3>
                                </div>
                                <p className="text-xs text-purple-100 mb-4 leading-relaxed">
                                    엑셀 파일을 업로드하면 AI가 자동으로 추세선을 그리고 주요 통계값을 분석해드립니다.
                                </p>
                                <Button className="w-full bg-white/20 hover:bg-white/30 border-white/20 text-white flex gap-2">
                                    <UploadCloud className="w-4 h-4" /> 데이터 파일 업로드
                                </Button>
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
