"use client";

import React, { useState, useEffect } from 'react';
import {
    Home,
    Download,
    Printer,
    ArrowLeft,
    CheckCircle,
    FileText,
    Share2
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

export default function CompletePage() {
    const params = useParams();
    const id = params?.id as string;

    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [reportData, setReportData] = useState<{
        intro: string;
        body: string;
        conclusion: string;
    } | null>(null);

    useEffect(() => {
        if (!topicParam) return;

        // Load the finalized draft from Step 4
        const draftKey = `inquiry_step_4_${id}_${topicParam}`;
        const draftData = localStorage.getItem(draftKey);

        if (draftData) {
            try {
                const parsed = JSON.parse(draftData);
                if (parsed.draft) {
                    setReportData({
                        intro: parsed.draft.introduction,
                        body: parsed.draft.body,
                        conclusion: parsed.draft.conclusion
                    });
                }
            } catch (e) {
                console.error("Failed to load draft", e);
            }
        }
    }, [topicParam, id]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">

            {/* Header / Nav (Hidden when printing) */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 print:hidden sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/report/${id}/inquiry-guide/step-4?topic=${encodeURIComponent(topicParam || '')}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            최종 보고서 확인
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Printer className="w-4 h-4" />
                            인쇄 / PDF 저장
                        </button>
                    </div>
                </div>
            </div>

            {/* A4 Paper Layout */}
            <main className="max-w-5xl mx-auto py-8 px-4 print:p-0 print:max-w-none">
                <div className="bg-white text-black p-12 sm:p-16 shadow-xl print:shadow-none print:p-10 max-w-[210mm] mx-auto min-h-[297mm] rounded-sm relative">

                    {/* Watermark / Header decoration */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <FileText className="w-32 h-32" />
                    </div>

                    {/* Title Section */}
                    <div className="text-center mb-16 border-b-2 border-black pb-8">
                        <h1 className="text-4xl font-extrabold mb-4 font-serif tracking-tight pr-10">{topicParam || "주제 미정"}</h1>
                        <p className="text-lg text-gray-600 font-serif">탐구 활동 보고서</p>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-12 font-serif leading-relaxed">

                        {/* 1. Introduction */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                                <span className="text-lg">I.</span> 서론
                            </h2>
                            <div className="text-justify whitespace-pre-wrap text-lg">
                                {reportData?.intro || "서론 내용이 없습니다."}
                            </div>
                        </section>

                        {/* 2. Body */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                                <span className="text-lg">II.</span> 본론 (탐구 내용 및 결과)
                            </h2>
                            <div className="text-justify whitespace-pre-wrap text-lg">
                                {reportData?.body || "본론 내용이 없습니다."}
                            </div>
                        </section>

                        {/* 3. Conclusion */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
                                <span className="text-lg">III.</span> 결론 및 제언
                            </h2>
                            <div className="text-justify whitespace-pre-wrap text-lg">
                                {reportData?.conclusion || "결론 내용이 없습니다."}
                            </div>
                        </section>

                    </div>


                    {/* Footer */}
                    <div className="mt-24 text-center text-sm text-gray-400 print:fixed print:bottom-8 print:left-0 print:w-full">
                        DeepDive EdTech Research Report Generator
                    </div>
                </div>
            </main>

            <style jsx global>{`
                @media print {
                    body {
                        background: white;
                    }
                    nav, header, .print\\:hidden { // Double escape for jsx logic
                        display: none !important;
                    }
                    main {
                        padding: 0;
                        margin: 0;
                    }
                    .shadow-xl {
                        box-shadow: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
