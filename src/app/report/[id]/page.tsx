"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Bookmark, ChevronRight, FileText, Loader2, Book } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

interface ReportData {
    title: string;
    subTitle: string;
    summary: string;
    coreConcepts: { name: string; description: string }[];
    curriculum: { name: string; description: string }[];
    inquiryGuide: string[];
    references: string[];
}

function ReportPageContent() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [data, setData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            if (!topicParam) {
                // If no topic param, we might want to default to something or show error
                // For now, let's use a default if it's missing to prevent empty page during dev
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch('/api/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: topicParam })
                });

                if (!res.ok) throw new Error("Failed to fetch report");

                const result = await res.json();
                console.log("Report Data:", result);
                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [topicParam]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <h2 className="text-xl font-bold text-slate-800">보고서 생성 중...</h2>
                <p className="text-slate-500">DeepSeek AI가 연구 주제를 심층 분석하고 있습니다.</p>
            </div>
        );
    }

    // Fallback if no data (optional: keep mock data or show empty)
    if (!data && !topicParam) {
        // Render the original Mock structure if no topic is provided?
        // Or just show message.
        return <div className="min-h-screen flex items-center justify-center">주제를 선택해주세요.</div>;
    }

    // If data failed to load but we aren't loading, show error?
    if (!data) return <div className="min-h-screen flex items-center justify-center">데이터를 불러오지 못했습니다.</div>;

    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
                    <span>탐구 보고서</span> <ChevronRight className="w-4 h-4" />
                    <span>심화 탐구</span> <ChevronRight className="w-4 h-4" />
                    <Badge variant="secondary" className="text-green-600 bg-green-100 hover:bg-green-100 rounded-md">DeepSeek Generated</Badge>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                        {data.title}
                        <span className="block text-xl font-medium text-gray-500 mt-2">{data.subTitle}</span>
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
                                {data.summary}
                            </p>
                        </section>

                        {/* Core Concepts */}
                        <section>
                            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 mb-4 ml-2">
                                <div className="w-2 h-2 rounded-full bg-blue-600" /> 핵심 개념
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.coreConcepts.map((concept, idx) => (
                                    <Card key={idx} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-lg mb-2">{concept.name}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {concept.description}
                                        </p>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Curriculum Connection */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 mb-6">
                                <Book className="w-5 h-5" /> 교과 연계
                            </h2>
                            <div className="space-y-6">
                                {data.curriculum.map((curr, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                            <h3 className="font-bold text-lg">{curr.name}</h3>
                                        </div>
                                        <div className="pl-4 border-l-2 border-blue-100 ml-1.5">
                                            <p className="text-gray-600 text-sm">{curr.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Inquiry Guide */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 ml-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600" /> 탐구 가이드
                                </h2>
                                <Button
                                    variant="link"
                                    className="text-blue-600 font-semibold p-0 h-auto"
                                    asChild
                                >
                                    <Link href={`/report/${params.id}/inquiry-guide`}>
                                        자세히 보기 <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { step: 1, title: '배경 이론' },
                                    { step: 2, title: '교과 연계' },
                                    { step: 3, title: '탐구 실습' },
                                    { step: 4, title: '보고서 작성' },
                                ].map((guide, idx) => (
                                    <Link key={guide.step} href={`/report/${id}/inquiry-guide/step-${guide.step}?topic=${encodeURIComponent(topicParam || '')}`} className="block group">
                                        <div className="bg-white rounded-xl p-6 shadow-sm flex gap-6 items-start border border-transparent hover:border-blue-200 transition-all hover:shadow-md">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {guide.step}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{guide.title}</h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {data.inquiryGuide && data.inquiryGuide[idx] ? data.inquiryGuide[idx] : "가이드 내용을 불러오는 중..."}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
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
                                    {data.references.map((ref, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer">
                                            <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-700 leading-tight mb-1">{ref}</p>
                                                <p className="text-xs text-gray-400">학술 자료</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ReportPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportPageContent />
        </Suspense>
    );
}
