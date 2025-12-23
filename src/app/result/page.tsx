"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, X } from 'lucide-react';
import MindMap from '@/components/MindMap';
import { INITIAL_NODES, INITIAL_EDGES, MOCK_BLUEPRINT } from '@/lib/data';
import { Node } from 'reactflow';

function ResultPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    const handleNodeClick = (node: Node) => {
        setSelectedNode(node);
    };

    const handleGenerateReport = () => {
        router.push('/report/1');
    };

    return (
        <div className="h-[calc(100vh-64px)] bg-slate-50 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm z-10">
                <div>
                    <h1 className="font-bold text-lg text-slate-800">탐구 주제 설정</h1>
                    <p className="text-xs text-gray-500">난이도와 관심 분야를 조절하여 나에게 딱 맞는 심화 주제를 찾아보세요.</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full shadow-sm" onClick={() => window.location.reload()}>
                    <RefreshCw className="w-4 h-4" />
                </Button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                    {/* Mind Map Canvas */}
                    <div
                        className={`w-full h-full transition-transform duration-300 ease-in-out ${selectedNode && selectedNode.type === 'leaf' ? '-translate-x-[200px]' : ''
                            }`}
                    >
                        <MindMap
                            initialNodes={INITIAL_NODES}
                            initialEdges={INITIAL_EDGES}
                            onNodeClick={handleNodeClick}
                            onPaneClick={() => setSelectedNode(null)}
                        />
                    </div>
                </div>

                {/* Right Drawer / Sidebar for Detail */}
                {selectedNode && selectedNode.type === 'leaf' && (
                    <div className="absolute right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl border-l p-6 animate-in slide-in-from-right duration-300 overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">인공지능 & 데이터</span>
                                <h2 className="text-2xl font-bold leading-tight">{MOCK_BLUEPRINT.title}</h2>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="flex items-center gap-2 text-sm font-bold text-purple-600">
                                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> 쉬운 설명 (Easy Mode)
                                    </span>
                                    {/* Toggle switch placeholder */}
                                    <div className="w-8 h-4 bg-gray-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full shadow absolute right-0" /></div>
                                </div>
                                <Card className="bg-slate-50 border-slate-100 shadow-inner">
                                    <div className="p-4 text-sm text-gray-600 leading-relaxed">
                                        {MOCK_BLUEPRINT.summary}
                                    </div>
                                </Card>
                            </div>

                            <div>
                                <h3 className="font-bold text-sm mb-2 text-slate-800 flex items-center gap-2">
                                    🔗 교과 과정 연계
                                </h3>
                                <Card className="border-green-100 bg-green-50/50">
                                    <div className="p-4">
                                        <ul className="text-sm space-y-2 text-gray-700">
                                            {MOCK_BLUEPRINT.references.map((item, idx) => (
                                                <li key={idx} className="flex gap-2">
                                                    <span className="text-green-600">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            </div>

                            <div>
                                <h3 className="font-bold text-sm mb-2 text-slate-800 flex items-center gap-2">
                                    📄 생기부 메리트
                                </h3>
                                <Card className="border-blue-100 bg-blue-50/50">
                                    <div className="p-4">
                                        <p className="text-sm font-bold text-slate-800 mb-1">[생기부 Point]</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {MOCK_BLUEPRINT.benefits[0]}
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <Button className="w-full h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800" onClick={handleGenerateReport}>
                                이 주제로 보고서 개요 작성하기
                            </Button>
                            <Button variant="outline" className="w-full h-12">
                                비슷한 주제 추천하기
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultPageContent />
        </Suspense>
    );
}
