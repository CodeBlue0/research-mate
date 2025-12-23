"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
    ChevronRight,
    Home,
    FileText,
    Lightbulb,
    Link as LinkIcon,
    Plus,
    Download,
    Check,
    Sparkles,
    Quote,
    ArrowLeft,
    ScrollText,
    BookOpen
} from 'lucide-react';
import Link from 'next/link';

import { useParams } from 'next/navigation';

export default function Step4Page() {
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
                    <Link href={`/report/${id}/inquiry-guide/step-3`} className="hover:text-blue-600 transition-colors">데이터 분석</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-bold text-slate-900">보고서 작성 도우미</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Header Section */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                            <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2">
                                    <div className="flex gap-2 mb-2">
                                        <Badge className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-none rounded-md px-2 py-1">보고서 작성</Badge>
                                        <Badge variant="outline" className="text-slate-500 bg-slate-100 border-none rounded-md px-2 py-1">Step 4</Badge>
                                    </div>
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        성공적인 탐구 보고서 작성 가이드
                                    </h1>
                                    <p className="text-slate-600 leading-relaxed">
                                        연구 결과를 논리적으로 정리하고 설득력 있는 보고서를 완성해보세요.<br />
                                        <span className="font-bold text-blue-600">"태양광 패널의 온도별 효율성 분석"</span>의 실험 결과를 바탕으로 작성을 시작합니다.
                                    </p>
                                </div>
                                <div className="hidden sm:flex w-16 h-16 bg-purple-50 rounded-full items-center justify-center text-purple-600 flex-shrink-0">
                                    <FileText className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Report Sections */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="border-b border-slate-200 bg-slate-50 p-4">
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                    <Button variant="default" className="bg-white text-blue-600 border border-slate-200 shadow-sm hover:bg-slate-50 font-bold whitespace-nowrap">
                                        서론 (Introduction)
                                    </Button>
                                    <Button variant="ghost" className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 font-medium whitespace-nowrap">
                                        연구 방법 (Method)
                                    </Button>
                                    <Button variant="ghost" className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 font-medium whitespace-nowrap">
                                        결과 (Results)
                                    </Button>
                                    <Button variant="ghost" className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 font-medium whitespace-nowrap">
                                        결론 (Conclusion)
                                    </Button>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center text-sm font-bold">1</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">연구의 필요성 및 목적 서술하기</h3>
                                        <p className="text-sm text-slate-600">왜 이 주제를 선정했는지, 이 연구가 어떤 의미가 있는지 명확하게 밝혀주세요.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-2">연구 동기</label>
                                        <Textarea
                                            className="w-full bg-slate-50 border-slate-200 focus:ring-blue-600 h-32 resize-none"
                                            placeholder="예: 최근 기후 변화로 인해 신재생 에너지의 중요성이 대두되면서, 태양광 발전의 효율을 높이는 방법에 관심을 갖게 되었습니다..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 mb-2">이론적 배경 (선행 연구)</label>
                                        <div className="bg-blue-50 p-4 rounded-lg mb-3 text-sm text-slate-700 flex gap-2">
                                            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                            <span>반도체 밴드갭 이론과 광전 효과에 대한 개념을 포함하면 좋습니다.</span>
                                        </div>
                                        <Textarea
                                            className="w-full bg-slate-50 border-slate-200 focus:ring-blue-600 h-32 resize-none"
                                            placeholder="연구 주제와 관련된 핵심 이론이나 기존 연구 내용을 정리해주세요."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* References */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                            <h3 className="flex items-center text-lg font-bold mb-6 text-slate-900">
                                <Quote className="w-6 h-6 mr-2 text-slate-400" />
                                참고 문헌 및 인용 관리
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-slate-400" />
                                        <div className="text-sm">
                                            <p className="font-bold text-slate-900">Temperature coefficients of photovoltaic modules</p>
                                            <p className="text-xs text-slate-500">IEEE Paper • 2023</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-white border-slate-200">
                                        인용 추가
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <LinkIcon className="w-5 h-5 text-slate-400" />
                                        <div className="text-sm">
                                            <p className="font-bold text-slate-900">신재생에너지 데이터 센터 통계</p>
                                            <p className="text-xs text-slate-500">Web Resource • 2024</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-white border-slate-200">
                                        인용 추가
                                    </Button>
                                </div>

                                <Button variant="ghost" className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2">
                                    <Plus className="w-4 h-4" /> 직접 입력하여 추가하기
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" className="bg-slate-100 border-none text-slate-600 hover:bg-slate-200">
                                미리보기
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30">
                                <Download className="w-4 h-4 mr-2" /> PDF로 내보내기
                            </Button>
                            <Link href={`/report/${id}`}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                                    작성 완료
                                    <Check className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
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
                                <Link href={`/report/${id}/inquiry-guide/step-3`}>
                                    <div className="relative group cursor-pointer">
                                        <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white group-hover:scale-110 transition-transform"></span>
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">3. 데이터 분석</h4>
                                        <p className="text-xs text-slate-500 mt-1">완료됨</p>
                                    </div>
                                </Link>
                                <div className="relative">
                                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white"></span>
                                    <h4 className="text-sm font-bold text-blue-600">4. 보고서 작성</h4>
                                    <p className="text-xs text-slate-500 mt-1">최종 결과를 정리하여 발표합니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* Templates */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 text-sm">우수 보고서 템플릿</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group flex items-start gap-3">
                                    <div className="w-10 h-10 bg-white rounded border border-slate-200 flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">과학 탐구 보고서 표준 양식</h5>
                                        <p className="text-xs text-slate-500 mt-0.5">학교 제출용 표준 서식입니다.</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg text-sm border border-transparent hover:border-blue-500 transition-colors cursor-pointer group flex items-start gap-3">
                                    <div className="w-10 h-10 bg-white rounded border border-slate-200 flex items-center justify-center shrink-0">
                                        <BookOpen className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">소논문 형식 템플릿</h5>
                                        <p className="text-xs text-slate-500 mt-0.5">심화 연구를 위한 학술적 양식입니다.</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="link" className="w-full mt-2 text-blue-600 font-medium text-sm">서식 더 보기</Button>
                        </div>

                        {/* AI Helper */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 text-yellow-300" />
                                    <h3 className="font-bold text-sm">AI 윤문 도우미</h3>
                                </div>
                                <p className="text-xs text-purple-100 mb-4 leading-relaxed">
                                    문장이 매끄럽지 않나요? AI가 문법 오류를 수정하고 더 학술적인 표현으로 다듬어 드립니다.
                                </p>
                                <Button className="w-full bg-white/20 hover:bg-white/30 border-white/20 text-white">
                                    문장 다듬기 요청
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
