"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Book, Calculator, Globe, FlaskConical, Gavel, Palette, Scale, Laptop, MoreHorizontal } from 'lucide-react';
import { useMindMap } from '@/context/MindMapContext';

const subjects = [
    { id: 'korean', label: '국어', icon: Book, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'math', label: '수학', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'english', label: '영어', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'science', label: '과학', icon: FlaskConical, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'social', label: '사회', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'history', label: '역사', icon: Gavel, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'arts', label: '예체능', icon: Palette, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'ethics', label: '도덕/윤리', icon: Scale, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'tech', label: '기술/가정', icon: Laptop, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'etc', label: '기타', icon: MoreHorizontal, color: 'text-blue-500', bg: 'bg-blue-100' },
];

export default function SubjectPage() {
    const router = useRouter();
    const { setHistoryRoot, setCurrentNode, setSeenTopics } = useMindMap();
    const [selected, setSelected] = React.useState<string | null>(null);

    // Reset Mind Map State when visiting Subject Selection (New Session)
    useEffect(() => {
        setHistoryRoot(null);
        setCurrentNode(null);
        setSeenTopics([]);
    }, [setHistoryRoot, setCurrentNode, setSeenTopics]);

    const handleSelect = (id: string) => {
        router.push(`/search?subject=${id}`);
    };

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-12">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="text-left mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-3">
                        심화 보고서 주제를 추천받을<br />
                        교과목을 선택해주세요.
                    </h1>
                    <p className="text-gray-500 text-lg">
                        관심 있는 분야를 선택하면 맞춤형 주제를 제안해 드립니다.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {subjects.filter(sub => sub.id !== 'etc').map((sub) => {
                        const isMath = sub.id === 'math';
                        return (
                            <Card
                                key={sub.id}
                                onClick={() => isMath && handleSelect(sub.id)}
                                className={`transition-all duration-200 border-2 aspect-[4/3] flex flex-col items-center justify-center space-y-4
                                    ${isMath
                                        ? 'cursor-pointer hover:shadow-md border-transparent hover:border-gray-200'
                                        : 'cursor-not-allowed opacity-40 grayscale bg-gray-100 border-transparent'
                                    }
                                    ${selected === sub.id && isMath ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : ''}
                                `}
                            >
                                <div className={`p-4 rounded-full ${sub.bg} ${sub.color}`}>
                                    <sub.icon className="w-8 h-8" />
                                </div>
                                <span className="font-bold text-lg text-slate-700">{sub.label}</span>
                            </Card>
                        );
                    })}
                </div>


            </div>
        </div>
    );
}
