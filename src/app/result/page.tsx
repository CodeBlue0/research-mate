"use client";

import React, { useState, Suspense, useEffect, useRef } from 'react';
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

// Tree-based History Node
interface HistoryNode {
    id: string; // unique ID
    nodes: Node[];
    edges: Edge[];
    data: {
        subject: string;
        topic?: string;
        interests: string;
        difficulty?: string;
        focusTopic?: string;
        isExpanded: boolean;
        centerCategory: string;
    };
    parent: HistoryNode | null;
    children: HistoryNode[];
    sourceNodeId?: string; // ID of the node in the parent that triggered this history
}

function ResultPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Data States
    const [historyRoot, setHistoryRoot] = useState<HistoryNode | null>(null);
    const [currentNode, setCurrentNode] = useState<HistoryNode | null>(null);
    const [loading, setLoading] = useState(true);

    // Force re-render on refresh
    const [refreshKey, setRefreshKey] = useState(0);

    const [loadingProgress, setLoadingProgress] = useState(0); // 0 to 5
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    // Simulate Loading Progress (Stall at 4/5 until real data arrives)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        if (loading) {
            setShowLoadingScreen(true);
            setLoadingProgress(0);
            let checkCount = 0;
            interval = setInterval(() => {
                checkCount++;
                setLoadingProgress(prev => {
                    // Fast start (0->1->2)
                    if (prev < 2) return prev + 1;
                    // Slow down (2->3)
                    if (prev === 2 && checkCount > 5) return 3;
                    // Crawl (3->4)
                    if (prev === 3 && checkCount > 15) return 4;
                    // Stall at 4 until loading becomes false
                    return prev;
                });
            }, 500);
        } else {
            setLoadingProgress(5); // Complete immediately when data arrives
            // Delay showing the result so user sees the 100% state
            timeout = setTimeout(() => {
                setShowLoadingScreen(false);
            }, 400);
        }
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [loading]);

    // history array for API exclusion (flattened list of seen topics)
    const [seenTopics, setSeenTopics] = useState<string[]>([]);

    // Selection & Blueprint States
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [blueprint, setBlueprint] = useState<ReportData | null>(null);
    const [blueprintLoading, setBlueprintLoading] = useState(false);

    // Optimistic Protection: Prevent double fetch in strict mode
    const isInitialized = useRef(false);

    // Initial Fetch Helper
    const fetchTopicData = async (params: { subject: string, topic?: string, interests: string, difficulty?: string, focusTopic?: string, isExpanded: boolean, centerCategory: string }, currentHistory: string[]) => {
        setLoading(true);
        try {
            const res = await fetch('/api/topics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...params,
                    previousTopics: currentHistory
                })
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

            return { nodes: data.nodes, edges: generatedEdges };

        } catch (error) {
            console.error(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Support Function to add new node to tree
    const addNewNodeToTree = (data: { nodes: Node[], edges: Edge[] }, params: any, sourceNodeId?: string) => {
        if (!currentNode) return;

        const newNode: HistoryNode = {
            id: Date.now().toString(),
            nodes: data.nodes,
            edges: data.edges,
            data: params,
            parent: currentNode,
            children: [],
            sourceNodeId: sourceNodeId
        };

        currentNode.children.push(newNode);
        setCurrentNode(newNode);

        // Update seen topics
        const newTopicLabels = data.nodes
            .filter((n: Node) => n.type === 'leaf')
            .map((n: Node) => n.data.label);
        setSeenTopics(prev => [...prev, ...newTopicLabels]);
    };

    // Initial Fetch
    useEffect(() => {
        const init = async () => {
            const subject = searchParams.get('selectedSubject') || searchParams.get('subject') || '';
            const topic = searchParams.get('topic') || '';
            const interests = searchParams.get('major') || searchParams.get('interests') || '';
            const difficulty = searchParams.get('difficulty') || '50';
            const isExpanded = searchParams.get('expanded') === 'true';
            const centerCategory = searchParams.get('category') || '';

            const params = { subject, topic, interests, difficulty, isExpanded, centerCategory };

            setSeenTopics([]); // Reset
            const data = await fetchTopicData(params, []);

            if (data) {
                const root: HistoryNode = {
                    id: 'root-history',
                    nodes: data.nodes,
                    edges: data.edges,
                    data: params,
                    parent: null,
                    children: [],
                };
                setHistoryRoot(root);
                setCurrentNode(root);

                const newTopicLabels = data.nodes.filter((n: Node) => n.type === 'leaf').map((n: Node) => n.data.label);
                setSeenTopics(newTopicLabels);
            }
        };
        if (!isInitialized.current) {
            isInitialized.current = true;
            init();
        }
    }, [searchParams]);

    const handlePinClick = (nodeId: string) => {
        if (!currentNode) return;

        const updatedNodes = currentNode.nodes.map(node => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    data: { ...node.data, isPinned: !node.data.isPinned }
                };
            }
            return node;
        });

        setCurrentNode({ ...currentNode, nodes: updatedNodes });
    };

    const handleRefresh = async () => {
        if (!currentNode) return;

        // 1. Identify Pinned Nodes
        const pinnedNodes = currentNode.nodes.filter(n => n.data.isPinned);
        const pinnedCount = pinnedNodes.length;

        // If all 5 leaf nodes are pinned, nothing to refresh
        if (pinnedCount >= 5) {
            return;
        }

        // 2. Fetch New Topics
        const amountNeeded = 5 - pinnedCount;
        const params = currentNode.data;
        const data = await fetchTopicData(params, seenTopics);

        if (!data || !data.nodes || data.nodes.length <= 1) {
            console.warn("Refresh returned insufficient topics");
            return;
        }

        // 3. Prepare New Nodes (New IDs)
        // We generate completely new IDs to ensure that any previous history (children) associated with the old IDs is severed.
        const newLeaves = data.nodes
            .filter((n: Node) => n.id !== 'root' && n.type === 'leaf') // ERROR FIX: Exclude Phantom/Default nodes
            .slice(0, amountNeeded)
            .map((n: Node, index: number) => ({
                ...n,
                id: `node-${Date.now()}-${index}`, // NEW ID
                // Position will be assigned from slots
            }));

        const unpinnedOriginalNodes = currentNode.nodes.filter(n => n.type === 'leaf' && !n.data.isPinned);

        // Map unpinned slots to new content
        const filledSlots = unpinnedOriginalNodes.map((oldNode, i) => {
            const newContent = newLeaves[i];
            if (newContent) {
                return {
                    ...newContent,
                    id: newContent.id, // Use NEW ID
                    position: oldNode.position, // Recyle Grid Position
                    data: { ...newContent.data, isPinned: false }
                };
            }
            return oldNode;
        });

        // Identify other nodes to preserve (like Phantom nodes)
        const otherNodes = currentNode.nodes.filter(n => n.id !== 'root' && n.type !== 'leaf' && !n.data?.isPinned);

        // Combined Nodes
        const mergedNodes = [
            currentNode.nodes.find(n => n.id === 'root')!,
            ...pinnedNodes,
            ...filledSlots,
            ...otherNodes
        ];

        // Regenerate Edges
        const mergedEdges = mergedNodes
            .filter(n => n.id !== 'root')
            .map(n => ({
                id: `e-${n.id}`,
                source: 'root',
                target: n.id,
                type: 'straight',
                animated: true,
                style: { stroke: '#e2e8f0', strokeWidth: 2 }
            }));

        // 4. Update History Children (Remove stacks of replaced nodes)
        // Aggressive Strategy: Only keep children (history) that belong to Pinned Nodes.
        // Everything else (unpinned) is being refreshed/replaced, so their history is wiped.
        const pinnedNodeIds = new Set(pinnedNodes.map(n => n.id));
        const updatedChildren = currentNode.children.filter(child =>
            child.sourceNodeId && pinnedNodeIds.has(child.sourceNodeId)
        );

        // 5. Commit Updates
        setCurrentNode({
            ...currentNode,
            nodes: mergedNodes,
            edges: mergedEdges,
            children: updatedChildren
        });

        // Update seen topics
        const newTopicLabels = filledSlots
            .filter(n => !currentNode.nodes.some(curr => curr.id === n.id))
            .map((n: Node) => n.data.label);
        setSeenTopics(prev => [...prev, ...newTopicLabels]);

        // Force Remount
        setRefreshKey(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentNode && currentNode.parent) {
            setCurrentNode(currentNode.parent);
        }
    };


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



    const handleStackClick = (nodeId: string) => {
        if (!currentNode) return;
        const targetChild = currentNode.children.find(child => child.sourceNodeId === nodeId);
        if (targetChild) {
            setCurrentNode(targetChild);
        }
    };

    const handleGenerateReport = () => {
        if (!selectedNode) return;
        // Pass the topic title to the report page
        const topicTitle = encodeURIComponent(selectedNode.data.label);
        router.push(`/report/1?topic=${topicTitle}`);
    };

    const handleExpandTopic = async () => {
        if (!selectedNode) return;
        // Retain original context
        const subject = searchParams.get('subject') || '';
        const topic = searchParams.get('topic') || '';
        const interests = searchParams.get('interests') || '';
        const difficulty = searchParams.get('difficulty') || '50';
        const category = selectedNode.data.category || '';
        const focusTopic = selectedNode.data.label;

        const params = {
            subject,
            topic,
            interests,
            difficulty,
            focusTopic, // New parameter for expansion focus
            isExpanded: true,
            centerCategory: category
        };

        const sourceNodeId = selectedNode.id;
        setSelectedNode(null);

        // Fetch new data and add to tree WITHOUT router.push
        const data = await fetchTopicData(params, seenTopics);
        if (data) addNewNodeToTree(data, params, sourceNodeId);

        // Note: URL does not update, so browser back button won't work for these steps. 
        // This is "Internal Navigation" as requested.
    };

    return (
        <div className="h-[calc(100vh-64px)] bg-slate-50 flex flex-col overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 relative">
                {/* Floating Title Card */}
                {!showLoadingScreen && (
                    <div className="absolute top-4 left-8 z-10 fade-in slide-in-from-top-4 duration-500">
                        <Card className="bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0 p-7 max-w-sm rounded-[2rem]">
                            <div className="flex items-center gap-4 mb-3">
                                <h1 className="font-bold text-2xl text-slate-800 tracking-tight">탐구 주제 설정</h1>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full w-8 h-8 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                                    onClick={handleRefresh}
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
                {showLoadingScreen ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20">
                        <div className="relative w-32 h-32 mb-6">
                            {/* Background Circle */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    className="stroke-slate-200"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                {/* Progress Circle */}
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    className="stroke-blue-600 transition-all duration-500 ease-out"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={351.86} // 2 * PI * 56
                                    strokeDashoffset={351.86 - (351.86 * (loadingProgress / 5))}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                                <span className="text-3xl font-bold">{loadingProgress}</span>
                                <span className="text-xs font-medium text-slate-400">/ 5</span>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">주제 생성 중...</h2>
                        <p className="text-slate-500 text-sm animate-pulse">DeepSeek AI가 맞춤형 연구 주제를 찾고 있습니다.</p>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        {/* Mind Map Canvas */}
                        <div
                            className={`w-full h-full transition-transform duration-300 ease-in-out ${selectedNode && (selectedNode.type === 'leaf' || selectedNode.type === 'expanded-center') ? '-translate-x-[200px]' : ''
                                }`}
                        >
                            <MindMap
                                key={`${currentNode?.id || 'init'}-${refreshKey}`}
                                initialNodes={currentNode?.nodes.map(n => ({
                                    ...n,
                                    data: {
                                        ...n.data,
                                        onPinClick: handlePinClick, // Correctly passed
                                        onStackClick: handleStackClick, // Correctly passed
                                        hasStack: currentNode.children?.some(child => child.sourceNodeId === n.id)
                                    }
                                })) || []}
                                initialEdges={currentNode?.edges || []}
                                onNodeClick={handleNodeClick}

                                onPaneClick={() => setSelectedNode(null)}
                            />
                        </div>
                    </div>
                )}

                {/* Navigation Controls (Bottom Left) */}
                <div className="absolute bottom-10 left-10 z-20 flex gap-4">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-slate-100 disabled:opacity-50"
                        onClick={handleBack}
                        disabled={!currentNode || !currentNode.parent}
                    >
                        <span className="sr-only">Go Back</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </Button>
                </div>

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
