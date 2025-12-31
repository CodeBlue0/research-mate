"use client";

import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    Home,
    FileText,
    Download,
    Printer,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Check,
    PenTool,
    Layout
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

interface GuideData {
    title: string;
    description: string;
    draft?: {
        introduction: string;
        body: string;
        conclusion: string;
    };
    checklist: string[];
    tips: string[];
}

export default function Step4Page() {
    const params = useParams();
    const id = params?.id as string;

    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [guideData, setGuideData] = useState<GuideData | null>(null);
    const [loading, setLoading] = useState(true);

    // Editable draft states
    const [intro, setIntro] = useState("");
    const [body, setBody] = useState("");
    const [conclusion, setConclusion] = useState("");

    useEffect(() => {
        const fetchDraft = async () => {
            if (!topicParam) {
                setLoading(false);
                return;
            }

            const storageKey = `inquiry_step_4_${id}_${topicParam}`;
            const cached = localStorage.getItem(storageKey);

            // If cached, load it
            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    setGuideData(parsed);
                    // Initialize editors with cached draft or empty
                    if (parsed.draft) {
                        setIntro(parsed.draft.introduction);
                        setBody(parsed.draft.body);
                        setConclusion(parsed.draft.conclusion);
                    }
                    setLoading(false);
                    return;
                } catch (e) {
                    localStorage.removeItem(storageKey);
                }
            }

            // Not cached, fetch from API with context
            setLoading(true);
            try {
                // Gather Context from LocalStorage
                const step1Data = JSON.parse(localStorage.getItem(`inquiry_step_1_${id}_${topicParam}`) || "{}");
                const step2Data = JSON.parse(localStorage.getItem(`inquiry_step_2_${id}_${topicParam}`) || "{}");
                const step3Data = JSON.parse(localStorage.getItem(`inquiry_step_3_${id}_${topicParam}`) || "{}");

                const context = {
                    step1: step1Data,
                    step2: step2Data,
                    step3: step3Data
                };

                const res = await fetch('/api/guide/step', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topic: topicParam,
                        step: 4,
                        context: context // Send context to backend
                    })
                });

                if (!res.ok) throw new Error("Failed to fetch guide");

                const data = await res.json();
                setGuideData(data);

                if (data.draft) {
                    setIntro(data.draft.introduction);
                    setBody(data.draft.body);
                    setConclusion(data.draft.conclusion);
                }

                // Save to LocalStorage
                localStorage.setItem(storageKey, JSON.stringify(data));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDraft();
    }, [topicParam, id]);

    // Update LocalStorage when user edits (Auto-save effect logic could be here, but for now just simple state)
    const handleSave = () => {
        if (!guideData) return;
        const updatedData = {
            ...guideData,
            draft: {
                introduction: intro,
                body: body,
                conclusion: conclusion
            }
        };
        localStorage.setItem(`inquiry_step_4_${id}_${topicParam}`, JSON.stringify(updatedData));
        // Also save to a "Final Report" key for the next page to read Easily? 
        // Or the next page can just read this key. Let's make the next page read this key.
        alert("저장되었습니다.");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/" className="hover:text-blue-600"><Home className="w-4 h-4" /></Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link href={`/report/${id}?topic=${encodeURIComponent(topicParam || '')}`} className="hover:text-blue-600">주제 상세</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">Step 4. 보고서 작성</span>
                </nav>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Hero Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-2">
                                <div className="flex gap-2 mb-2">
                                    <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-300 rounded">최종 정리</span>
                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">Step 4</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {guideData?.title || '나만의 탐구 보고서 완성하기'}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {guideData?.description || "지금까지 수행한 모든 과정을 AI가 정리하여 초안을 만들었습니다. 내용을 다듬어 완성해보세요."}
                                </p>
                            </div>
                            <div className="hidden sm:flex w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full items-center justify-center text-red-600">
                                <FileText className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Report Drafting Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="flex items-center text-lg font-bold text-gray-900 dark:text-gray-100">
                                <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                                AI 보고서 초안 (Drafting)
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                                <Sparkles className="w-4 h-4" />
                                <span>이전 단계 내용을 바탕으로 자동 생성됨</span>
                            </div>
                        </div>

                        <div className="space-y-8 mb-8">
                            {/* Introduction */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 border-l-4 border-red-500 pl-2">
                                    1. 서론 (Introduction)
                                </label>
                                <p className="text-xs text-gray-500 mb-2 pl-3">탐구 동기, 목적, 그리고 이론적 배경(Step 1, 2)을 포함합니다.</p>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-sm h-64 resize-none leading-relaxed focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
                                    placeholder={loading ? "AI가 초안을 작성 중입니다..." : "서론 내용을 작성하세요."}
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                ></textarea>
                            </div>

                            {/* Body */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 border-l-4 border-red-500 pl-2">
                                    2. 본론 (Body)
                                </label>
                                <p className="text-xs text-gray-500 mb-2 pl-3">탐구 방법(Step 3)과 구체적인 결과 및 분석을 기술합니다.</p>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-sm h-96 resize-none leading-relaxed focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium text-gray-700 dark:text-gray-300"
                                    placeholder={loading ? "AI가 초안을 작성 중입니다..." : "본론 내용을 작성하세요."}
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                ></textarea>
                            </div>

                            {/* Conclusion */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 border-l-4 border-red-500 pl-2">
                                    3. 결론 (Conclusion)
                                </label>
                                <p className="text-xs text-gray-500 mb-2 pl-3">핵심 결과 요약과 연구의 한계, 제언을 작성합니다.</p>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-sm h-48 resize-none leading-relaxed focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium text-gray-700 dark:text-gray-300"
                                    placeholder={loading ? "AI가 초안을 작성 중입니다..." : "결론 내용을 작성하세요."}
                                    value={conclusion}
                                    onChange={(e) => setConclusion(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <Link href={`/report/${id}/inquiry-guide/step-3?topic=${encodeURIComponent(topicParam || '')}`} className="px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                                <ArrowLeft className="w-5 h-5" />
                                이전 단계
                            </Link>

                            <button
                                onClick={handleSave}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-lg font-bold transition-colors"
                            >
                                임시 저장
                            </button>

                            <Link
                                href={`/report/${id}/inquiry-guide/complete?topic=${encodeURIComponent(topicParam || '')}`}
                                onClick={handleSave} // Save before navigating
                                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
                            >
                                <FileText className="w-5 h-5" />
                                최종 보고서 보기
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Progress Tracker */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm uppercase tracking-wider">탐구 진행 상황</h3>
                        <div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-6">
                            {[
                                { step: 1, label: '배경 이론', status: 'completed' },
                                { step: 2, label: '교과 연계', status: 'completed' },
                                { step: 3, label: '탐구 실습', status: 'completed' },
                                { step: 4, label: '보고서 작성', status: 'current' },
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ring-4 ring-white dark:ring-gray-800 ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-red-600' : 'bg-gray-300'}`}></span>
                                    <h4 className={`text-sm font-bold ${item.status === 'current' ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'} ${item.status === 'pending' ? 'opacity-50' : ''}`}>
                                        {item.step}. {item.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.status === 'current' ? '대장정을 마무리하는 단계입니다!' : item.status === 'pending' ? '대기 중' : '완료됨'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm">작성 Tips</h3>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            {guideData?.tips?.map((tip, idx) => (
                                <li key={idx} className="flex gap-2">
                                    <span className="text-red-500 font-bold">•</span>
                                    {tip}
                                </li>
                            )) || (
                                    <>
                                        <li className="flex gap-2"><span className="text-red-500 font-bold">•</span> AI가 작성한 내용은 초안입니다. 본인의 어투로 다듬어주세요.</li>
                                        <li className="flex gap-2"><span className="text-red-500 font-bold">•</span> 수치는 정확하게 기입해야 신뢰도가 높아집니다.</li>
                                    </>
                                )}
                        </ul>
                    </div>

                    {/* Check Points */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm">Check Points</h3>
                        <ul className="space-y-3">
                            {guideData?.checklist?.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            )) || (
                                    <>
                                        <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>맞춤법과 띄어쓰기를 확인했나요?</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>인용한 자료의 출처를 빠짐없이 표기했나요?</span>
                                        </li>
                                    </>
                                )}
                        </ul>
                    </div>

                </div>
            </main>
        </div>
    );
}

function CheckCircle2({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
