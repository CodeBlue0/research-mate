"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Sparkles, Zap, GraduationCap, Microscope } from 'lucide-react';

function SearchPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const subjectParam = searchParams.get('subject');

    const [topic, setTopic] = useState('');
    const [major, setMajor] = useState('');
    const [difficulty, setDifficulty] = useState([50]); // 0: Basic, 50: Applied, 100: Advanced

    const handleSearch = () => {
        // Navigate to result page with query params
        const query = new URLSearchParams({
            subject: subjectParam || '',
            topic,
            major,
            difficulty: difficulty[0].toString()
        });
        router.push(`/result?${query.toString()}`);
    };

    const getDifficultyLabel = (val: number) => {
        if (val < 33) return { label: '기초 (생활 속 예시)', desc: '일상적 현상을 교과 원리로 설명', icon: <Sparkles className="w-5 h-5 text-green-500" />, bg: 'bg-green-100' };
        if (val > 66) return { label: '심화 (논문/전공 기초)', desc: '전문 지식 및 학술 논문 활용', icon: <Microscope className="w-5 h-5 text-purple-500" />, bg: 'bg-purple-100' };
        return { label: '응용 (교과 연계)', desc: '교과 개념을 다른 분야와 융합', icon: <GraduationCap className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-100' };
    };

    const currentDiff = getDifficultyLabel(difficulty[0]);

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-12">
            <div className="container mx-auto max-w-3xl px-4">
                <div className="text-center mb-12">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-bold text-sm mb-4">
                        STEP 2. 탐구 설정
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        교과서 속 개념, 나만의 경쟁력으로.
                    </h1>
                    <p className="text-gray-500 text-lg">
                        현재 배우고 있는 내용을 입력하면, 진로와 연결된 심화 탐구 주제를 맞춤 추천해 드립니다.
                    </p>
                </div>

                <Card className="mb-8 border-none shadow-lg">
                    <CardContent className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="font-bold">과목 선택</Label>
                                <Select defaultValue={subjectParam === 'math' ? '확률과 통계' : '확률과 통계'}>
                                    <SelectTrigger className="h-12 bg-gray-50/50">
                                        <SelectValue placeholder="과목 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="확률과 통계">확률과 통계</SelectItem>
                                        <SelectItem value="미적분">미적분</SelectItem>
                                        <SelectItem value="기하">기하</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">현재 배우는 주제 (키워드)</Label>
                                <Input
                                    className="h-12 bg-gray-50/50"
                                    placeholder="예: 큰 수의 법칙"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold">희망 진로 / 계열</Label>
                                <Input
                                    className="h-12 bg-gray-50/50"
                                    placeholder="예: 컴퓨터공학, 의학"
                                    value={major}
                                    onChange={(e) => setMajor(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-8 border-none shadow-lg">
                    <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Zap className="text-yellow-500 fill-current" /> 탐구 난이도 조절
                            </h3>
                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${currentDiff.bg} text-slate-700 flex items-center gap-2`}>
                                {currentDiff.label}
                            </div>
                        </div>

                        <div className="px-4 mb-12">
                            <Slider
                                defaultValue={[50]}
                                max={100}
                                step={1}
                                value={difficulty}
                                onValueChange={setDifficulty}
                                onValueCommit={(val) => {
                                    const value = val[0];
                                    let snapped = 50;
                                    if (value < 33) snapped = 0;
                                    else if (value > 66) snapped = 100;
                                    setDifficulty([snapped]);
                                }}
                                className="py-4"
                            />
                            <div className="flex justify-between text-sm text-gray-400 mt-2 font-medium">
                                <span>기초</span>
                                <span>응용</span>
                                <span>심화</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { type: '기초', label: '생활 속 예시', desc: '일상적 현상을 교과 원리로 설명', color: 'bg-green-50 text-green-700' },
                                { type: '응용', label: '교과 연계', desc: '교과 개념을 다른 분야와 융합', color: 'bg-blue-50 text-blue-700' },
                                { type: '심화', label: '논문/전공 기초', desc: '전문 지식 및 학술 논문 활용', color: 'bg-purple-50 text-purple-700' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-xl border transition-colors ${(item.type === '기초' && difficulty[0] < 33) ||
                                        (item.type === '응용' && difficulty[0] >= 33 && difficulty[0] <= 66) ||
                                        (item.type === '심화' && difficulty[0] > 66)
                                        ? 'border-blue-500 bg-blue-50/50'
                                        : 'border-slate-100 bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`w-2 h-2 rounded-full ${item.type === '기초' ? 'bg-green-500' : item.type === '응용' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                                        <span className="font-bold text-sm">{item.type} ({item.label})</span>
                                    </div>
                                    <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                                        <li>{item.desc}</li>
                                        <li>학생부 세특 기재에 최적화</li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-8">
                            <Button size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700" onClick={handleSearch}>
                                주제 탐색하기 <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPageContent />
        </Suspense>
    );
}
