"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Calendar,
    Download,
    Share2,
    Home,
    ChevronRight,
    Printer,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Report {
    id: string;
    topic: string;
    created_at: string;
    status: 'draft' | 'completed';
    sections: {
        introduction: string;
        methods: string;
        results: string;
        conclusion: string;
    };
}

export default function ViewReportPage() {
    const params = useParams();
    const id = params?.id as string;
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`/api/report/${id}`);
                const data = await response.json();
                if (data && !data.error) {
                    setReport(data);
                }
            } catch (error) {
                console.error("Failed to fetch report:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchReport();
        }
    }, [id]);

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading Report...</div>;

    if (!report) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">보고서를 찾을 수 없습니다.</h2>
            <Link href="/dashboard">
                <Button variant="outline">돌아가기</Button>
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans print:bg-white">
            {/* Header (Hidden in Print) */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-slate-400 hover:text-slate-600 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="h-6 w-px bg-slate-200" />
                        <span className="font-bold text-slate-700 truncate max-w-md">{report.topic}</span>
                        <Badge variant="secondary" className="hidden sm:flex">{report.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                            <Printer className="w-4 h-4 mr-2" /> 인쇄
                        </Button>
                        {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                            <Download className="w-4 h-4 mr-2" /> PDF 저장
                        </Button> */}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto max-w-4xl px-4 py-12 print:py-0 print:px-0">
                <Card className="bg-white shadow-xl rounded-none md:rounded-xl overflow-hidden print:shadow-none print:border-none">
                    {/* Report Header */}
                    <div className="bg-slate-900 text-white p-12 text-center print:bg-white print:text-black print:border-b print:border-black">
                        <div className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-4 print:text-slate-600">Research Inquiry Report</div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                            {report.topic}
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-slate-300 print:text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>작성일: {new Date(report.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="p-8 md:p-16 space-y-12">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b pb-2 border-slate-100 print:border-black">
                                <span className="text-blue-600 print:text-black">1.</span> 서론 (Introduction)
                            </h2>
                            <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap font-serif">
                                {report.sections.introduction || "내용 없음"}
                            </div>
                        </section>

                        {/* Methods */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b pb-2 border-slate-100 print:border-black">
                                <span className="text-blue-600 print:text-black">2.</span> 연구 방법 (Methods)
                            </h2>
                            <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap font-serif">
                                {report.sections.methods || "내용 없음"}
                            </div>
                        </section>

                        {/* Results */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b pb-2 border-slate-100 print:border-black">
                                <span className="text-blue-600 print:text-black">3.</span> 연구 결과 (Results)
                            </h2>
                            <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap font-serif">
                                {report.sections.results || "내용 없음"}
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b pb-2 border-slate-100 print:border-black">
                                <span className="text-blue-600 print:text-black">4.</span> 결론 및 제언 (Conclusion)
                            </h2>
                            <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap font-serif">
                                {report.sections.conclusion || "내용 없음"}
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 p-8 text-center text-slate-400 text-sm print:hidden">
                        DeepDive EdTech - AI Research Assistant
                    </div>
                </Card>
            </main>
        </div>
    );
}
