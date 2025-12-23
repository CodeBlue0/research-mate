"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Book, Calculator, Globe, FlaskConical, Gavel, Palette, Scale, Laptop, MoreHorizontal } from 'lucide-react';

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
    const [selected, setSelected] = React.useState<string | null>(null);

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

                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="관심 있는 교과목이나 키워드를 검색해보세요"
                        className="w-full h-12 pl-12 pr-4 rounded-xl border-gray-200 border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {subjects.map((sub) => (
                        <Card
                            key={sub.id}
                            onClick={() => handleSelect(sub.id)}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 aspect-[4/3] flex flex-col items-center justify-center space-y-4
                 ${selected === sub.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-200'}
               `}
                        >
                            <div className={`p-4 rounded-full ${sub.bg} ${sub.color}`}>
                                <sub.icon className="w-8 h-8" />
                            </div>
                            <span className="font-bold text-lg text-slate-700">{sub.label}</span>
                        </Card>
                    ))}
                </div>


            </div>
        </div>
    );
}
