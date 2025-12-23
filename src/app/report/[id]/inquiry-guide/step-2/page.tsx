"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    ChevronRight,
    Home,
    FlaskConical,
    HelpCircle,
    PlusCircle,
    ExternalLink,
    Lightbulb,
    PlayCircle,
    Check
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Step2Page() {
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
                    <Link href={`/report/${id}/inquiry-guide/step-1`} className="hover:text-blue-600 transition-colors">가설 설정</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-bold text-slate-900">실험 설계 도우미</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Header Section */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                            <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2">
                                    <div className="flex gap-2 mb-2">
                                        <Badge className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-none rounded-md px-2 py-1">실험 설계</Badge>
                                        <Badge variant="outline" className="text-slate-500 bg-slate-100 border-none rounded-md px-2 py-1">Step 2</Badge>
                                    </div>
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        성공적인 실험을 위한 설계
                                    </h1>
                                    <p className="text-slate-600 leading-relaxed">
                                        앞서 세운 가설을 검증하기 위한 구체적인 방법을 설계합니다.<br />
                                        <span className="font-bold text-blue-600">"패널 온도 상승 시 효율 감소"</span> 가설을 입증할 통제된 실험 환경을 구성하세요.
                                    </p>
                                </div>
                                <div className="hidden sm:flex w-16 h-16 bg-purple-50 rounded-full items-center justify-center text-purple-600 flex-shrink-0">
                                    <FlaskConical className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Step 1: Equipment */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                            <h3 className="flex items-center text-lg font-bold mb-6 text-slate-900">
                                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                                준비물 및 실험 도구
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-slate-900">핵심 장비</label>
                                        <Input
                                            className="bg-slate-50 border-slate-200 focus:ring-blue-600"
                                            placeholder="예: 소형 태양광 패널 (5V), 멀티미터"
                                            defaultValue="소형 태양광 패널 (5V), 멀티미터, 할로겐 램프"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-slate-900">보조 도구</label>
                                        <Input
                                            className="bg-slate-50 border-slate-200 focus:ring-blue-600"
                                            placeholder="예: 온도계, 자, 타이머"
                                            defaultValue="적외선 온도계, 각도기, 스탠드"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-slate-900">재료 및 기타</label>
                                    <Textarea
                                        className="w-full bg-slate-50 border-slate-200 focus:ring-blue-600 h-20 resize-none"
                                        placeholder="실험에 필요한 소모품이나 기타 준비물을 입력하세요."
                                        defaultValue="전선, 저항, 브레드보드, 기록용 노트북"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Methodology */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200"></div>
                            <h3 className="flex items-center text-lg font-bold mb-6 text-slate-900">
                                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                실험 과정 설계 (Methodology)
                            </h3>

                            <div className="space-y-6 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start mb-4">
                                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-slate-700">
                                        <span className="font-bold text-blue-600 block mb-1">Tip: 재현 가능성</span>
                                        다른 사람이 이 설명을 보고 똑같이 실험을 재현할 수 있을 정도로 구체적으로 작성해야 합니다.
                                    </div>
                                </div>

                                <div className="relative pl-6 border-l-2 border-dashed border-slate-200 space-y-6">
                                    <div className="relative">
                                        <span className="absolute -left-[33px] top-0 w-8 h-8 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-900">환경 설정</label>
                                            <Textarea
                                                className="w-full bg-white border-slate-200 focus:ring-blue-600 h-24 resize-none"
                                                placeholder="실험 환경을 어떻게 세팅할지 설명하세요."
                                                defaultValue="실내 암실 환경을 조성하고, 광원(할로겐 램프)을 태양광 패널로부터 수직 거리 30cm 높이에 고정한다. 패널은 바닥과 평행하게 설치한다."
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[33px] top-0 w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center text-sm font-bold">2</span>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-900">변인 조작 및 측정</label>
                                            <Textarea
                                                className="w-full bg-white border-slate-200 focus:ring-blue-600 h-24 resize-none"
                                                placeholder="독립변수를 어떻게 변화시키고 종속변수를 어떻게 측정할지 설명하세요."
                                                defaultValue="램프를 켜고 패널의 표면 온도가 상온(25°C)에서 시작하여 5°C씩 상승할 때마다 멀티미터로 개방 전압(Voc)과 단락 전류(Isc)를 측정하여 기록한다. 온도는 최대 60°C까지 올린다."
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[33px] top-0 w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center text-sm font-bold">3</span>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-900">반복 수행</label>
                                            <Textarea
                                                className="w-full bg-white border-slate-200 focus:ring-blue-600 h-24 resize-none"
                                                placeholder="데이터의 신뢰도를 높이기 위한 반복 실험 계획을 적어주세요."
                                                defaultValue="오차를 줄이기 위해 위 과정을 총 3회 반복 수행하고, 각 온도 구간별 평균값을 산출하여 데이터를 정리한다."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 ml-6">
                                    <PlusCircle className="w-4 h-4 mr-2" /> 단계 추가하기
                                </Button>
                            </div>
                        </div>

                        {/* Step 3: Data Collection Plan */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200"></div>
                            <h3 className="flex items-center text-lg font-bold mb-6 text-slate-900">
                                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold mr-3">3</span>
                                데이터 수집 계획
                            </h3>

                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-900 mb-3">기록할 데이터 테이블 예시</label>
                                <div className="overflow-x-auto rounded-lg border border-slate-200">
                                    <table className="w-full text-sm text-left text-slate-600">
                                        <thead className="text-xs text-slate-900 uppercase bg-slate-50">
                                            <tr>
                                                <th className="px-6 py-3">온도 (°C)</th>
                                                <th className="px-6 py-3">전압 (V)</th>
                                                <th className="px-6 py-3">전류 (mA)</th>
                                                <th className="px-6 py-3">계산된 전력 (mW)</th>
                                                <th className="px-6 py-3">비고</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b hover:bg-slate-50">
                                                <td className="px-6 py-4">25</td>
                                                <td className="px-6 py-4 text-slate-300 italic">입력 예정</td>
                                                <td className="px-6 py-4 text-slate-300 italic">입력 예정</td>
                                                <td className="px-6 py-4 text-slate-300 italic">자동 계산</td>
                                                <td className="px-6 py-4">기준 온도</td>
                                            </tr>
                                            <tr className="bg-white hover:bg-slate-50">
                                                <td className="px-6 py-4">30</td>
                                                <td className="px-6 py-4 text-slate-300 italic">입력 예정</td>
                                                <td className="px-6 py-4 text-slate-300 italic">입력 예정</td>
                                                <td className="px-6 py-4 text-slate-300 italic">자동 계산</td>
                                                <td className="px-6 py-4">-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-right">* 위 형식으로 엑셀 시트가 자동 생성됩니다.</p>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Link href={`/report/${id}/inquiry-guide/step-1`}>
                                    <Button variant="outline" className="bg-slate-100 border-none text-slate-600 hover:bg-slate-200">
                                        이전 단계
                                    </Button>
                                </Link>
                                <Link href={`/report/${id}/inquiry-guide/step-3`}>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                                        실험 설계 저장 <Check className="w-4 h-4 ml-2" />
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
                                    <div className="relative cursor-pointer group">
                                        <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white group-hover:scale-110 transition-transform"></span>
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">1. 가설 설정</h4>
                                        <p className="text-xs text-slate-500 mt-1">완료됨</p>
                                    </div>
                                </Link>
                                <div className="relative">
                                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white"></span>
                                    <h4 className="text-sm font-bold text-blue-600">2. 실험 설계</h4>
                                    <p className="text-xs text-slate-500 mt-1">현재 단계: 방법론 및 절차 구체화</p>
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

                        {/* References */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 text-sm">참고 실험 레퍼런스</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 rounded-lg text-sm border border-transparent hover:border-purple-500 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-purple-600">IEEE Paper</span>
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-500" />
                                    </div>
                                    <p className="font-bold text-slate-900 mb-1">Temperature coefficients of photovoltaic modules</p>
                                    <p className="text-xs text-slate-500">표준 실험 환경(STC)과 측정 방법에 대한 국제 표준 가이드라인 요약</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg text-sm border border-transparent hover:border-purple-500 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-green-600">실험 팁</span>
                                        <Lightbulb className="w-4 h-4 text-slate-400 group-hover:text-purple-500" />
                                    </div>
                                    <p className="font-bold text-slate-900 mb-1">광원 거리와 조도 유지</p>
                                    <p className="text-xs text-slate-500">램프 열이 패널 온도를 의도치 않게 높이지 않도록 거리를 유지하거나 팬을 사용하세요.</p>
                                </div>
                            </div>
                            <Button variant="link" className="w-full mt-2 text-blue-600 font-medium text-sm">자료 더 찾아보기</Button>
                        </div>

                        {/* Simulator */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <PlayCircle className="w-5 h-5 text-yellow-300" />
                                    <h3 className="font-bold text-sm">실험 시뮬레이션</h3>
                                </div>
                                <p className="text-xs text-purple-100 mb-4 leading-relaxed">
                                    실제 실험 전, 가상 시뮬레이터로 예상 데이터를 확인해보세요. 시행착오를 줄일 수 있습니다.
                                </p>
                                <Button className="w-full bg-white/20 hover:bg-white/30 border-white/20 text-white">
                                    시뮬레이터 실행
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
