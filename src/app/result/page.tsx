"use client";

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, X, Sparkles, Loader2 } from 'lucide-react';
import MindMap from '@/components/MindMap';
import { Node, Edge } from 'reactflow';

// Define the API response structure locally to match ReportPage
interface ReportData {
    title: string;
    subTitle: string;
    summary: string;
    coreConcepts: { name: string; description: string }[];
    curriculum: { name: string; description: string }[];
    inquiryGuide: string[];
    references: string[];
}

function ResultPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Data States
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [loading, setLoading] = useState(true);

    // Selection & Blueprint States
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [blueprint, setBlueprint] = useState<ReportData | null>(null);
    const [blueprintLoading, setBlueprintLoading] = useState(false);

    // Initial Fetch
    useEffect(() => {
        const fetchTopics = async () => {
            setLoading(true);
            try {
                const subject = searchParams.get('subject') || '';
                const interests = searchParams.get('interests') || '';
                const isExpanded = searchParams.get('expanded') === 'true';
                const centerCategory = searchParams.get('category') || '';

                const res = await fetch('/api/topics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ subject, interests, isExpanded, centerCategory })
                });

                if (!res.ok) throw new Error("Failed to fetch topics");

                const data = await res.json();

                // Generate Edges based on nodes
                const generatedEdges: Edge[] = data.nodes
                    .filter((n: Node) => n.id !== 'root')
                    .map((n: Node) => ({
                        id: `e-${n.id}`,
                        source: 'root',
                        target: n.id,
                        type: 'straight',
                        animated: true,
                        style: { stroke: '#e2e8f0', strokeWidth: 2 }
                    }));

                setNodes(data.nodes);
                setEdges(generatedEdges);
            } catch (error) {
                console.error(error);
                // Fallback or error state could be handled here
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, [searchParams]);

    // Handle Node Selection & Blueprint Fetch
    const handleNodeClick = async (node: Node) => {
        setSelectedNode(node);

        if (node.type === 'leaf' || node.type === 'expanded-center') {
            setBlueprintLoading(true);
            setBlueprint(null);
            try {
                const res = await fetch('/api/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic: node.data.label })
                });

                if (!res.ok) throw new Error("Failed to fetch blueprint");

                const data = await res.json();
                setBlueprint(data);
            } catch (error) {
                console.error(error);
            } finally {
                setBlueprintLoading(false);
            }
        }
    };

    const handleGenerateReport = () => {
        if (!selectedNode) return;
        // Pass the topic title to the report page
        const topicTitle = encodeURIComponent(selectedNode.data.label);
        router.push(`/report/1?topic=${topicTitle}`);
    };

    const handleExpandTopic = () => {
        if (!selectedNode) return;
        const newSubject = selectedNode.data.label;
        const currentInterests = searchParams.get('interests') || '';
        const category = selectedNode.data.category || '';
        setSelectedNode(null);
        router.push(`/result?subject=${encodeURIComponent(newSubject)}&interests=${encodeURIComponent(currentInterests)}&expanded=true&category=${encodeURIComponent(category)}`);
    };

    return (
        <div className="h-[calc(100vh-64px)] bg-slate-50 flex flex-col overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 relative">
                {/* Floating Title Card */}
                {!loading && (
                    <div className="absolute top-4 left-8 z-10 fade-in slide-in-from-top-4 duration-500">
                        <Card className="bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0 p-7 max-w-sm rounded-[2rem]">
                            <div className="flex items-center gap-4 mb-3">
                                <h1 className="font-bold text-2xl text-slate-800 tracking-tight">탐구 주제 설정</h1>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full w-8 h-8 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                                    onClick={() => window.location.reload()}
                                >
                                    <RefreshCw className="w-4 h-4 text-slate-500" />
                                </Button>
                            </div>
                            <p className="text-slate-500 leading-relaxed text-[15px] font-medium">
                                난이도와 관심 분야를 조절하여<br />
                                나에게 딱 맞는 심화 주제를 찾아보세요.
                            </p>
                        </Card>
                    </div>
                )}
                {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <h2 className="text-xl font-bold text-slate-800">주제 생성 중...</h2>
                        <p className="text-slate-500">DeepSeek AI가 맞춤형 연구 주제를 고민하고 있습니다.</p>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        {/* Mind Map Canvas */}
                        <div
                            className={`w-full h-full transition-transform duration-300 ease-in-out ${selectedNode && (selectedNode.type === 'leaf' || selectedNode.type === 'expanded-center') ? '-translate-x-[200px]' : ''
                                }`}
                        >
                            {/* Key forces remount if nodes change, simple way to handle initialNodes prop */}
                            <MindMap
                                key={nodes.length}
                                initialNodes={nodes}
                                initialEdges={edges}
                                onNodeClick={handleNodeClick}
                                onPaneClick={() => setSelectedNode(null)}
                            />
                        </div>
                    </div>
                )}

                {/* Right Drawer / Sidebar for Detail */}
                {selectedNode && (selectedNode.type === 'leaf' || selectedNode.type === 'expanded-center') && (
                    <div className="absolute right-0 top-2 bottom-4 w-[400px] bg-white shadow-2xl border border-r-0 rounded-l-3xl p-6 animate-in slide-in-from-right duration-300 overflow-y-auto z-30">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className={`${selectedNode.data.iconColor || 'bg-blue-100 text-blue-700'} text-xs font-bold px-2 py-1 rounded mb-2 inline-block`}>
                                    {selectedNode.data.category || '연구 주제'}
                                </span>
                                <h2 className="text-2xl font-bold leading-tight">{selectedNode.data.label}</h2>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {blueprintLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
                                <p className="text-sm font-medium text-slate-600">상세 개요 생성 중...</p>
                            </div>
                        ) : blueprint ? (
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="flex items-center gap-2 text-sm font-bold text-purple-600">
                                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> AI 요약
                                        </span>
                                    </div>
                                    <Card className="bg-slate-50 border-slate-100 shadow-inner">
                                        <div className="p-4 text-sm text-gray-600 leading-relaxed">
                                            {blueprint.summary}
                                        </div>
                                    </Card>
                                </div>

                                <div>
                                    <h3 className="font-bold text-sm mb-2 text-slate-800 flex items-center gap-2">
                                        📚 핵심 학습 개념
                                    </h3>
                                    <Card className="border-green-100 bg-green-50/50">
                                        <div className="p-4">
                                            <ul className="text-sm space-y-2 text-gray-700">
                                                {blueprint.coreConcepts?.map((item, idx) => (
                                                    <li key={idx} className="flex flex-col gap-1 mb-2">
                                                        <div className="flex gap-2 font-bold text-slate-800">
                                                            <span className="text-green-600">•</span> {item.name}
                                                        </div>
                                                        <span className="text-xs text-gray-500 ml-4">{item.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Card>
                                </div>

                                <div>
                                    <h3 className="font-bold text-sm mb-2 text-slate-800 flex items-center gap-2">
                                        📄 교과 연계
                                    </h3>
                                    <Card className="border-blue-100 bg-blue-50/50">
                                        <div className="p-4">
                                            <ul className="text-sm space-y-2 text-gray-700">
                                                {blueprint.curriculum?.map((item, idx) => (
                                                    <li key={idx} className="flex gap-2">
                                                        <span className="text-blue-600">✓</span> {item.name}: {item.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                정보를 불러오지 못했습니다.
                            </div>
                        )}

                        <div className="mt-8 space-y-3">
                            <Button
                                className="w-full h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800"
                                onClick={handleGenerateReport}
                                disabled={blueprintLoading}
                            >
                                이 주제로 보고서 개요 작성하기
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-12 text-lg font-bold border-2 hover:bg-slate-50 transition-colors"
                                onClick={handleExpandTopic}
                            >
                                🔗 비슷한 주제 추천하기
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
