"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Bookmark, ChevronRight, FileText, Download, Book } from 'lucide-react';
import { MOCK_BLUEPRINT } from '@/lib/data';

export default function ReportPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
                    <span>물리학</span> <ChevronRight className="w-4 h-4" />
                    <span>고등학교 2학년</span> <ChevronRight className="w-4 h-4" />
                    <Badge variant="secondary" className="text-green-600 bg-green-100 hover:bg-green-100 rounded-md">심화 탐구</Badge>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                        태양광 패널의 온도별 효율성 분석
                        <span className="block text-xl font-medium text-gray-500 mt-2">반도체 물성을 기초로 한 에너지 효율 최적화 방안 연구</span>
                    </h1>

                    <div className="flex gap-3">
                        <Button className="bg-blue-600 hover:bg-blue-700 font-bold px-6">
                            <Bookmark className="w-4 h-4 mr-2" /> 주제 저장하기
                        </Button>
                        <Button variant="outline" className="px-6 font-bold">
                            <Share2 className="w-4 h-4 mr-2" /> 공유
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Overview */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 mb-4">
                                <div className="w-1 h-6 bg-blue-600 rounded-full" /> 개요
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                태양광 발전은 친환경 에너지의 핵심이지만, 온도 변화에 따른 발전 효율 저하가 주요한 기술적 과제 중 하나입니다.
                                이 주제는 반도체의 온도가 상승함에 따라 밴드갭 에너지가 변화하고, 이것이 태양광 패널(Photo-voltaic module)의 출력 전압과 전류에 어떤 영향을 미치는지 정량적으로 분석하는 것을 목표로 합니다.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                학생들은 직접 실험 환경을 구축하여 다양한 온도 조건에서의 전압(V)과 전류(I)를 측정하고, 이를 바탕으로 P-V 곡선을 그려 최대 전력점(MPP)이 어떻게 이동하는지 관찰할 수 있습니다.
                            </p>
                        </section>

                        {/* Core Concepts */}
                        <section>
                            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 mb-4 ml-2">
                                <div className="w-2 h-2 rounded-full bg-blue-600" /> 핵심 개념
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-lg mb-2">반도체 밴드갭</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        온도가 상승하면 원자 격자의 진동이 커지며 밴드갭이 좁아지는 현상에 대해 이해가 필요합니다.
                                    </p>
                                </Card>
                                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-lg mb-2">광전 효과</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        빛 에너지를 받아 전자가 튀어 나가는 현상으로, 태양광 발전의 가장 기초적인 원리입니다.
                                    </p>
                                </Card>
                            </div>
                        </section>

                        {/* Curriculum Connection */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 mb-6">
                                <Book className="w-5 h-5" /> 교과 연계
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                        <h3 className="font-bold text-lg">물리학 I</h3>
                                    </div>
                                    <div className="pl-4 border-l-2 border-blue-100 ml-1.5">
                                        <p className="text-blue-600 font-bold text-sm mb-1">2. 물질과 전자기장</p>
                                        <p className="text-gray-600 text-sm">반도체의 전기적 성질과 다이오드의 접합 원리를 배우는 단원과 직접적으로 연결됩니다.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                        <h3 className="font-bold text-lg">통합과학</h3>
                                    </div>
                                    <div className="pl-4 border-l-2 border-blue-100 ml-1.5">
                                        <p className="text-blue-600 font-bold text-sm mb-1">IV. 환경과 에너지</p>
                                        <p className="text-gray-600 text-sm">태양광 발전의 효율성을 높이기 위한 다양한 시도와 신재생 에너지의 필요성을 다룹니다.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Inquiry Guide */}
                        <section>
                            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 mb-4 ml-2">
                                <div className="w-2 h-2 rounded-full bg-blue-600" /> 탐구 가이드
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { step: 1, title: '가설 설정', desc: '"온도가 10도 상승할 때마다 발전 효율은 약 X% 감소할 것이다"와 같이 정량적인 가설을 세워보세요.' },
                                    { step: 2, title: '실험 설계', desc: '할로겐 램프로 태양광을 모사하고, 펠티어 소자나 가열판을 이용해 패널의 온도를 통제하는 방법을 구상합니다.' },
                                    { step: 3, title: '데이터 분석', desc: '온도별 전압-전류 그래프를 엑셀이나 파이썬으로 시각화하여 비교 분석합니다.' },
                                ].map((guide) => (
                                    <div key={guide.step} className="bg-white rounded-xl p-6 shadow-sm flex gap-6 items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg">
                                            {guide.step}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{guide.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{guide.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <h3 className="font-bold text-sm text-gray-400 uppercase mb-4">목차</h3>
                            <ul className="space-y-2 text-sm font-medium">
                                <li className="bg-blue-50 text-blue-600 rounded-lg px-3 py-2 cursor-pointer">개요</li>
                                <li className="text-gray-500 hover:bg-slate-50 rounded-lg px-3 py-2 cursor-pointer transition-colors">핵심 개념</li>
                                <li className="text-gray-500 hover:bg-slate-50 rounded-lg px-3 py-2 cursor-pointer transition-colors">교과 연계</li>
                                <li className="text-gray-500 hover:bg-slate-50 rounded-lg px-3 py-2 cursor-pointer transition-colors">탐구 가이드</li>
                            </ul>

                            <div className="mt-8 border-t pt-6">
                                <h3 className="font-bold text-sm text-slate-800 mb-4">참고 자료</h3>
                                <div className="space-y-3">
                                    <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                        <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-700 leading-tight mb-1">Temperature coefficients of photovoltaic modules (IEEE Paper)</p>
                                            <p className="text-xs text-gray-400">학술 논문</p>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                        <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-700 leading-tight mb-1">신재생에너지 데이터 센터 통계</p>
                                            <p className="text-xs text-gray-400">데이터셋</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4">관련 주제 추천</h3>
                            <div className="space-y-4">
                                {[
                                    { title: '풍력 발전기의 날개 모양에 따른 효율 비교', tag: '물리학 I • 실험', color: 'bg-yellow-500' },
                                    { title: '염료 감응형 태양전지(DSSC) 제작 및 원리 탐구', tag: '화학 I • 심화', color: 'bg-green-500' },
                                    { title: '펠티어 소자를 이용한 열전 발전 실험', tag: '통합과학 • 융합', color: 'bg-cyan-500' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group cursor-pointer">
                                        <div className={`w-12 h-12 rounded-lg ${item.color} opacity-80 flex-shrink-0`} />
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                            <p className="text-xs text-gray-500">{item.tag}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-4 text-blue-600 text-sm font-bold hover:bg-blue-50 hover:text-blue-700">
                                더 보기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
