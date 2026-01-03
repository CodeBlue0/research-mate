"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Home,
    FileText,
    Calendar,
    MoreVertical,
    Trash2,
    ExternalLink,
    ChevronRight,
    Search,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Report {
    id: string;
    topic: string;
    created_at: string;
    status: 'draft' | 'completed';
    sections: any;
}

export default function DashboardPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('/api/report/list');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setReports(data);
                }
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("정말 이 보고서를 삭제하시겠습니까?")) return;

        try {
            const response = await fetch(`/api/report/delete?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove from local state
                setReports(prev => prev.filter(r => r.id !== id));
            } else {
                alert("삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const filteredReports = reports.filter(report =>
        report.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            D
                        </div>
                        <span className="font-bold text-slate-800 text-lg">DeepDive Dashboard</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link href="/" className="hover:text-blue-600 transition-colors">홈으로</Link>
                        <Link href="/dashboard" className="text-blue-600">내 프로젝트</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">설정</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Metrics / Welcome */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">반갑습니다, 학생 연구원님! 👋</h1>
                    <p className="text-slate-500">지금까지 작성된 탐구 보고서를 관리해보세요.</p>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="주제 검색..."
                            className="pl-9 bg-white border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                            <FileText className="w-4 h-4 mr-2" /> 새 보고서 작성
                        </Button>
                    </Link>
                </div>

                {/* Reports Grid */}
                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading projects...</div>
                ) : filteredReports.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">아직 저장된 보고서가 없습니다.</h3>
                        <p className="text-slate-500 mb-4">첫 번째 탐구 보고서를 작성해보세요!</p>
                        <Link href="/">
                            <Button variant="outline">시작하기</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredReports.map((report) => (
                            <Card key={report.id} className="bg-white hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden group">
                                <div className="h-32 bg-slate-100 relative p-6 flex flex-col justify-between">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50" />

                                    <div className="relative z-10 flex justify-between items-start">
                                        <Badge className={`
                                            ${report.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}
                                            border-none font-bold uppercase text-[10px] tracking-wider
                                        `}>
                                            {report.status}
                                        </Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-white/50 -mt-2 -mr-2">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="text-slate-700">
                                                    <Button variant="ghost" className="w-full justify-start h-auto p-0 hover:bg-transparent">
                                                        수정하기
                                                    </Button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(report.id)}>
                                                    <Trash2 className="w-4 h-4 mr-2" /> 삭제
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="relative z-10 text-xs text-slate-500 font-medium flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(report.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {report.topic}
                                    </h3>
                                    <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                                        {report.sections.introduction || report.sections.methods || "No content preview available..."}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <span className="text-xs font-semibold text-slate-400">
                                            Inquiry Guide
                                        </span>
                                        <Link href={`/report/${report.id}?topic=${encodeURIComponent(report.topic)}`}>
                                            <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold p-0 px-3">
                                                Continue Inquiry <ArrowRight className="w-3 h-3 ml-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
