"use client";

import React, { useState, useEffect, Suspense, useRef } from 'react';
import {
    ChevronRight,
    Home,
    ArrowRight,
    ArrowLeft,
    Beaker,
    RotateCcw,
    Play,
    Pause,
    Plus,
    Trash2
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ExperimentResult {
    id: number;
    n: number;
    heads: number;
    tails: number;
    ratio: number;
}

function Step3PageContent() {
    const params = useParams();
    const id = params?.id as string;
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    // State for Simulation
    const [tossCount, setTossCount] = useState<number>(100);
    const [isSimulating, setIsSimulating] = useState(false);
    const [currentHeads, setCurrentHeads] = useState(0);
    const [currentTosses, setCurrentTosses] = useState(0);
    const [history, setHistory] = useState<ExperimentResult[]>([]);

    // Animation Refs
    const animationRef = useRef<number | null>(null);
    const speed = useRef(10); // Multiplier per frame

    const startSimulation = () => {
        if (isSimulating) {
            stopSimulation();
            return;
        }

        // Reset current run
        setCurrentHeads(0);
        setCurrentTosses(0);
        setIsSimulating(true);

        const simulateFrame = () => {
            setCurrentTosses(prevTotal => {
                const remaining = tossCount - prevTotal;
                const batchSize = Math.min(remaining, Math.ceil(tossCount / 50)); // Finish in ~50 frames

                if (remaining <= 0) {
                    stopSimulation();
                    return prevTotal;
                }

                let newHeads = 0;
                for (let i = 0; i < batchSize; i++) {
                    if (Math.random() < 0.5) newHeads++;
                }

                setCurrentHeads(h => h + newHeads);
                return prevTotal + batchSize;
            });

            if (currentTosses < tossCount) {
                animationRef.current = requestAnimationFrame(simulateFrame);
            }
        };

        animationRef.current = requestAnimationFrame(simulateFrame);
    };

    const stopSimulation = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        setIsSimulating(false);
        // Add to history if completed (or partially stopped)
        // We'll only add if it actually ran somewhat

    };

    // Watch for completion to add to history automatically
    useEffect(() => {
        if (!isSimulating && currentTosses > 0 && currentTosses === tossCount) {
            const result: ExperimentResult = {
                id: Date.now(),
                n: currentTosses,
                heads: currentHeads,
                tails: currentTosses - currentHeads,
                ratio: currentHeads / currentTosses
            };
            setHistory(prev => [result, ...prev]);
        }
    }, [isSimulating, currentTosses, tossCount, currentHeads]);

    // Clean up
    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const resetHistory = () => setHistory([]);

    const ratio = currentTosses > 0 ? (currentHeads / currentTosses) : 0;
    const tails = currentTosses - currentHeads;

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <div className="relative w-full h-[300px] bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-slate-900 to-black/80 z-10" />
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-10">
                    <nav className="flex items-center text-sm text-amber-100/80 mb-6">
                        <Link href="/" className="hover:text-white transition-colors"><Home className="w-4 h-4" /></Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-white transition-colors">리포트 홈</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white font-medium">Step 3. 가상 실험실</span>
                    </nav>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-3 py-1.5 text-sm">
                            Step 3
                        </Badge>
                        <span className="text-amber-200 font-medium tracking-wide text-sm uppercase">Virtual Lab</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg">
                        실험 데이터 수집
                    </h1>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 -mt-12 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left: Control Panel */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-white border-none shadow-xl rounded-2xl p-6 ring-1 ring-slate-100">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Beaker className="w-5 h-5 text-amber-500" />
                                실험 설정 (Settings)
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label className="font-semibold text-slate-700">시행 횟수 (n)</Label>
                                        <span className="text-sm font-mono font-bold text-amber-600">{tossCount}회</span>
                                    </div>
                                    <Slider
                                        defaultValue={[100]}
                                        max={10000}
                                        min={10}
                                        step={10}
                                        value={[tossCount]}
                                        onValueChange={(vals) => setTossCount(vals[0])}
                                        className="py-2"
                                        disabled={isSimulating}
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 px-1">
                                        <span>10회</span>
                                        <span>10,000회</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <h4 className="font-bold text-amber-900 text-sm mb-2">실험 목표</h4>
                                    <p className="text-sm text-amber-800 leading-relaxed">
                                        동전 던지기 횟수(n)를 늘릴수록 앞면이 나오는 비율이 수학적 확률(0.5)에 가까워지는지 확인합니다.
                                    </p>
                                </div>

                                <Button
                                    className={`w-full h-12 text-lg font-bold shadow-lg transition-all ${isSimulating
                                            ? 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                                            : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
                                        }`}
                                    onClick={startSimulation}
                                    disabled={isSimulating}
                                >
                                    {isSimulating ? (
                                        <><Pause className="w-5 h-5 mr-2" /> 실험 진행 중...</>
                                    ) : (
                                        <><Play className="w-5 h-5 mr-2" /> 실험 시작</>
                                    )}
                                </Button>
                            </div>
                        </Card>

                        <Card className="bg-white border-none shadow-lg rounded-2xl p-6 ring-1 ring-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                                <span>실험 기록 (History)</span>
                                <Button variant="ghost" size="sm" onClick={resetHistory} className="h-8 text-slate-400 hover:text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </h3>
                            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                {history.length === 0 && (
                                    <p className="text-center text-slate-400 py-8 text-sm">기록된 실험 데이터가 없습니다.</p>
                                )}
                                {history.map((run, idx) => (
                                    <div key={run.id} className="bg-slate-50 p-3 rounded-lg flex justify-between items-center text-sm border border-slate-100 hover:border-amber-200 transition-colors">
                                        <div>
                                            <span className="font-bold text-slate-700">#{history.length - idx}</span>
                                            <span className="mx-2 text-slate-300">|</span>
                                            <span className="text-slate-600">n={run.n.toLocaleString()}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className={`font-mono font-bold ${Math.abs(run.ratio - 0.5) < 0.01 ? 'text-green-600' : 'text-amber-600'
                                                }`}>
                                                {(run.ratio * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right: Visualization & Output */}
                    <div className="lg:col-span-8 space-y-6">
                        <Card className="bg-white border-none shadow-xl rounded-2xl p-8 ring-1 ring-slate-100 min-h-[500px] flex flex-col">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">실험 시각화 (Visualization)</h2>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total tosses</div>
                                    <div className="text-3xl font-black text-slate-800">{currentTosses.toLocaleString()}</div>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
                                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Heads (앞면)</div>
                                    <div className="text-3xl font-black text-amber-600">{currentHeads.toLocaleString()}</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Ratio (비율)</div>
                                    <div className="text-3xl font-black text-slate-800">{(ratio * 100).toFixed(1)}<span className="text-lg text-slate-400">%</span></div>
                                </div>
                            </div>

                            {/* Bar Chart Visualization */}
                            <div className="flex-1 flex flex-col justify-end gap-4 min-h-[200px] relative mt-4">
                                <div className="absolute inset-0 flex items-center justify-center -z-0 opacity-10 pointer-events-none">
                                    <div className="text-[10rem] font-bold text-slate-900">
                                        {(ratio * 100).toFixed(0)}%
                                    </div>
                                </div>

                                {/* Bars */}
                                <div className="flex h-64 gap-12 items-end justify-center px-12">
                                    {/* Heads Bar */}
                                    <div className="w-32 flex flex-col items-center group">
                                        <div className="font-bold text-amber-600 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {currentHeads.toLocaleString()}
                                        </div>
                                        <div
                                            className="w-full bg-amber-500 rounded-t-xl transition-all duration-300 ease-out shadow-lg shadow-amber-200 relative overflow-hidden"
                                            style={{ height: `${currentTosses === 0 ? 0 : (currentHeads / currentTosses) * 100}%` }}
                                        >
                                            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-amber-600 to-amber-400"></div>
                                        </div>
                                        <div className="mt-3 font-bold text-slate-600">앞면 (Heads)</div>
                                    </div>

                                    {/* Tails Bar */}
                                    <div className="w-32 flex flex-col items-center group">
                                        <div className="font-bold text-slate-600 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {tails.toLocaleString()}
                                        </div>
                                        <div
                                            className="w-full bg-slate-400 rounded-t-xl transition-all duration-300 ease-out shadow-lg relative overflow-hidden"
                                            style={{ height: `${currentTosses === 0 ? 0 : (tails / currentTosses) * 100}%` }}
                                        >
                                            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-slate-500 to-slate-400"></div>
                                        </div>
                                        <div className="mt-3 font-bold text-slate-600">뒷면 (Tails)</div>
                                    </div>
                                </div>

                                {/* Target Line */}
                                <div className="absolute top-1/2 left-10 right-10 border-t-2 border-dashed border-red-400 z-10 flex items-end justify-end">
                                    <span className="text-red-500 text-xs font-bold bg-white px-1 -mt-3">이론적 확률 (50%)</span>
                                </div>
                            </div>
                        </Card>

                        {/* Navigation */}
                        <div className="flex justify-between items-center py-6">
                            <Button variant="outline" size="lg" className="rounded-full px-6" onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> 이전
                            </Button>
                            <Link href={`/report/${id}/inquiry-guide/step-4?topic=${encodeURIComponent(topicParam || '')}`}>
                                <Button size="lg" className="rounded-full px-8 bg-amber-600 hover:bg-amber-700 font-bold shadow-lg shadow-amber-200 text-white">
                                    실험 완료 & 보고서 작성으로 <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Step3Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step3PageContent />
        </Suspense>
    );
}
