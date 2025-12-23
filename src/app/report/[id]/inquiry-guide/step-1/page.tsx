"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ChevronRight,
    Home,
    Lightbulb,
    Thermometer,
    Zap,
    HelpCircle,
    Info,
    ArrowRight,
    CheckCircle2,
    Copy,
    Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useParams } from 'next/navigation';

export default function Step1Page() {
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
                    <Link href={`/report/${id}`} className="hover:text-blue-600 transition-colors">주제 상세</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-bold text-slate-900">가설 설정 도우미</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Header Section */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                            <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2">
                                    <div className="flex gap-2 mb-2">
                                        <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none rounded-md px-2 py-1">가설 설정</Badge>
                                        <Badge variant="outline" className="text-slate-500 bg-slate-100 border-none rounded-md px-2 py-1">Step 1</Badge>
                                    </div>
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        좋은 가설을 세우는 방법
                                    </h1>
                                    <p className="text-slate-600 leading-relaxed">
                                        가설은 연구의 나침반입니다. '만약 ~한다면, ~할 것이다'라는 명확한 인과관계를 설정해보세요.<br />
                                        선택하신 <span className="font-bold text-blue-600">"태양광 패널의 온도별 효율성 분석"</span> 주제에 맞춰 가설을 구체화합니다.
                                    </p>
                                </div>
                                <div className="hidden sm:flex w-16 h-16 bg-blue-50 rounded-full items-center justify-center text-blue-600 flex-shrink-0">
                                    <Lightbulb className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Step 1: Variable Setting */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                            <h3 className="flex items-center text-lg font-bold mb-6 text-slate-900">
                                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                                변수 설정하기
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* Independent Variable */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-slate-900 flex items-center gap-1">
                                        독립 변수 (원인)
                                        <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" />
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Thermometer className="w-5 h-5 text-slate-400" />
                                        </span>
                                        <Input
                                            className="pl-10 bg-slate-50 border-slate-200 focus:ring-blue-600 h-11"
                                            placeholder="예: 온도, 시간, 농도 등"
                                            defaultValue="패널의 표면 온도"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">실험자가 의도적으로 변화시키는 값입니다.</p>
                                </div>

                                {/* Dependent Variable */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-slate-900 flex items-center gap-1">
                                        종속 변수 (결과)
                                        <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" />
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Zap className="w-5 h-5 text-slate-400" />
                                        </span>
                                        <Input
                                            className="pl-10 bg-slate-50 border-slate-200 focus:ring-blue-600 h-11"
                                            placeholder="예: 성장률, 속도, 효율 등"
                                            defaultValue="전력 생산 효율 (%)"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">관찰하거나 측정하고자 하는 결과값입니다.</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
                                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-slate-700">
                                    <span className="font-bold text-blue-600 block mb-1">Tip: 변수 통제하기</span>
                                    실험의 정확성을 위해 독립 변수 외에 결과에 영향을 줄 수 있는 '통제 변수'를 일정하게 유지해야 합니다. (예: 광원의 세기, 패널의 각도)
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Formulating Hypothesis */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200"></div>
                            <h3 className="flex items-center text-lg font-bold mb-6 text-slate-900">
                                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                가설 문장 만들기
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300">
                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <span className="text-xs font-bold text-slate-500 block mb-1">만약 (If)</span>
                                        <div className="font-medium text-blue-600">패널의 표면 온도가 10°C 상승한다면</div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 sm:rotate-0" />
                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <span className="text-xs font-bold text-slate-500 block mb-1">그러면 (Then)</span>
                                        <div className="font-medium text-blue-600">전력 생산 효율은 약 0.5% 감소할 것이다.</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-900 mb-2">나의 가설 작성하기</label>
                                    <Textarea
                                        className="w-full bg-white border-slate-200 focus:ring-blue-600 h-32 resize-none p-4"
                                        placeholder="위의 변수들을 활용하여 '만약 ~한다면, ~할 것이다' 형태의 문장으로 작성해보세요."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" className="bg-slate-100 border-none text-slate-600 hover:bg-slate-200">
                                    임시 저장
                                </Button>
                                <Link href={`/report/${id}/inquiry-guide/step-2`}>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                                        다음 단계로 <ArrowRight className="w-4 h-4 ml-2" />
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
                                <div className="relative">
                                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white"></span>
                                    <h4 className="text-sm font-bold text-blue-600">1. 가설 설정</h4>
                                    <p className="text-xs text-slate-500 mt-1">연구의 방향성을 잡는 단계입니다.</p>
                                </div>
                                <div className="relative opacity-50">
                                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></span>
                                    <h4 className="text-sm font-bold text-slate-900">2. 실험 설계</h4>
                                    <p className="text-xs text-slate-500 mt-1">변인 통제와 실험 과정을 구상합니다.</p>
                                </div>
                                <div className="relative opacity-50">
                                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></span>
                                    <h4 className="text-sm font-bold text-slate-900">3. 데이터 분석</h4>
                                    <p className="text-xs text-slate-500 mt-1">결과를 해석하고 결론을 도출합니다.</p>
                                </div>
                                <div className="relative opacity-50">
                                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white"></span>
                                    <h4 className="text-sm font-bold text-slate-900">4. 보고서 작성</h4>
                                    <p className="text-xs text-slate-500 mt-1">최종 결과를 정리하여 발표합니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Examples */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 text-sm">참고할 만한 가설 예시</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-blue-600">물리학</span>
                                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                    </div>
                                    <p className="text-slate-600 group-hover:text-slate-900 transition-colors">"빛의 입사각이 90도에 가까울수록 태양광 패널의 발전량은 증가할 것이다."</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-green-600">환경과학</span>
                                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                    </div>
                                    <p className="text-slate-600 group-hover:text-slate-900 transition-colors">"패널 표면의 먼지 농도가 높을수록 발전 효율은 비선형적으로 감소할 것이다."</p>
                                </div>
                            </div>
                            <Button variant="link" className="w-full mt-2 text-blue-600 font-medium text-sm">더 보기</Button>
                        </div>

                        {/* AI Helper */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 text-yellow-300" />
                                    <h3 className="font-bold text-sm">AI 가설 도우미</h3>
                                </div>
                                <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                                    작성이 어려우신가요? AI가 주제를 분석하여 적절한 가설을 제안해드립니다.
                                </p>
                                <Button className="w-full bg-white/20 hover:bg-white/30 border-white/20 text-white">
                                    AI 제안 받기
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
