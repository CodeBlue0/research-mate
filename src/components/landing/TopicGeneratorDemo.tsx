"use client";

import React, { useEffect, useState } from 'react';
import { Sparkles, BookOpen, Code, FlaskConical, Calculator, PenTool, Globe, Scale, Activity, Box, Music, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function TopicGeneratorDemo() {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const DEMO_TOPICS = [
        {
            subject: "물리학 I", interest: "파이썬 코딩",
            // Tailwind class safelist style
            bgSoft: "bg-blue-100", bgLight: "bg-blue-50/30", text: "text-blue-500", textDark: "text-blue-700", bar: "bg-blue-500",
            icon: Code,
            title: "파이썬 시뮬레이션을 활용한\n포물선 운동의 공기저항 분석",
            desc: "물리학 역학 개념과 코딩을 융합하여 실제 낙하 데이터를 분석하는 심화 탐구",
            difficulty: 3 // 심화
        },
        {
            subject: "생명과학 I", interest: "인공지능",
            bgSoft: "bg-green-100", bgLight: "bg-green-50/30", text: "text-green-500", textDark: "text-green-700", bar: "bg-green-500",
            icon: Activity,
            title: "머신러닝 기법을 적용한\n식물 잎의 질병 진단 모델",
            desc: "이미지 분류 AI를 학습시켜 식물의 갈변 및 반점 패턴을 분석하는 융합 탐구",
            difficulty: 3 // 심화
        },
        {
            subject: "화학 I", interest: "환경공학",
            bgSoft: "bg-teal-100", bgLight: "bg-teal-50/30", text: "text-teal-500", textDark: "text-teal-700", bar: "bg-teal-500",
            icon: FlaskConical,
            title: "친환경 플라스틱의\n가수분해 속도 비교 실험",
            desc: "pH 농도와 온도 변화에 따른 생분해성 플라스틱의 분해 메커니즘 분석",
            difficulty: 2 // 응용
        },
        {
            subject: "수학 II", interest: "경제/경영",
            bgSoft: "bg-red-100", bgLight: "bg-red-50/30", text: "text-red-500", textDark: "text-red-700", bar: "bg-red-500",
            icon: Calculator,
            title: "미분과 도함수를 활용한\n한계비용 및 이윤 극대화 분석",
            desc: "실제 기업 데이터를 바탕으로 한계효용 체감 법칙을 수학적으로 증명",
            difficulty: 3 // 심화
        },
        {
            subject: "문학", interest: "역사",
            bgSoft: "bg-amber-100", bgLight: "bg-amber-50/30", text: "text-amber-500", textDark: "text-amber-700", bar: "bg-amber-500",
            icon: PenTool,
            title: "현대 소설에 나타난\n일제강점기 트라우마 양상",
            desc: "시대적 배경이 문학적 상징어와 등장인물의 심리에 미친 영향 비교 분석",
            difficulty: 2 // 응용
        },
        {
            subject: "지구과학", interest: "데이터 분석",
            bgSoft: "bg-indigo-100", bgLight: "bg-indigo-50/30", text: "text-indigo-500", textDark: "text-indigo-700", bar: "bg-indigo-500",
            icon: Globe,
            title: "기상청 오픈API를 활용한\n국지성 호우 패턴 시각화",
            desc: "최근 10년 간의 강수 데이터를 분석하여 기후 변화의 경향성 도출",
            difficulty: 2 // 응용
        },
        {
            subject: "정치와 법", interest: "미디어",
            bgSoft: "bg-purple-100", bgLight: "bg-purple-50/30", text: "text-purple-500", textDark: "text-purple-700", bar: "bg-purple-500",
            icon: Scale,
            title: "가짜 뉴스의 확산 속도와\n법적 규제 방안의 실효성",
            desc: "SNS 알고리즘의 구조적 특징과 현행법의 한계를 비판적으로 고찰",
            difficulty: 2 // 응용
        },
        {
            subject: "확률과 통계", interest: "보건/의료",
            bgSoft: "bg-rose-100", bgLight: "bg-rose-50/30", text: "text-rose-500", textDark: "text-rose-700", bar: "bg-rose-500",
            icon: Activity,
            title: "베이즈 정리를 이용한\n질병 진단 키트의 정확도 산출",
            desc: "조건부 확률 개념을 의학적 진단 상황에 적용하여 양성 예측도 분석",
            difficulty: 3 // 심화
        },
        {
            subject: "기하", interest: "건축",
            bgSoft: "bg-cyan-100", bgLight: "bg-cyan-50/30", text: "text-cyan-500", textDark: "text-cyan-700", bar: "bg-cyan-500",
            icon: Box,
            title: "프랙탈 기하학 원리의\n현대 건축물 구조 적용 사례",
            desc: "자기유사성 개념이 건축물의 내진 설계와 미적 요소에 미치는 영향",
            difficulty: 3 // 심화
        },
        {
            subject: "음악", interest: "심리학",
            bgSoft: "bg-orange-100", bgLight: "bg-orange-50/30", text: "text-orange-500", textDark: "text-orange-700", bar: "bg-orange-500",
            icon: Music,
            title: "BPM과 주파수 대역이\n집중력에 미치는 상관관계",
            desc: "백색소음과 클래식 음악 청취 시의 뇌파 변화를 비교 실험",
            difficulty: 1 // 기초
        }
    ];

    useEffect(() => {
        let fadeOutTimer: NodeJS.Timeout;
        let switchTimer: NodeJS.Timeout;

        const startCycle = () => {
            // Stay visible for 3 seconds, then fade out
            fadeOutTimer = setTimeout(() => {
                setIsVisible(false);

                // Wait 500ms for fade out animation, then switch topic and fade in
                switchTimer = setTimeout(() => {
                    setCurrentTopicIndex((prev) => (prev + 1) % DEMO_TOPICS.length);
                    setIsVisible(true);
                }, 500);
            }, 3000);
        };

        startCycle();

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(switchTimer);
        };
    }, [currentTopicIndex, DEMO_TOPICS.length]);

    const currentTopic = DEMO_TOPICS[currentTopicIndex];
    const Icon = currentTopic.icon;

    // Difficulty Helper
    const getDifficultyLabel = (level: number) => {
        if (level === 3) return "심화";
        if (level === 2) return "응용";
        return "기초";
    };

    const renderDifficulty = (level: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3].map((step) => (
                    <div
                        key={step}
                        className={`w-3 h-3 rounded-full ${step <= level ? currentTopic.bar : 'bg-gray-200'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="relative w-full max-w-[500px] min-h-[380px] flex flex-col items-center justify-center p-6">

            {/* Background Decorations */}
            <div className={`absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full blur-3xl animate-pulse transition-colors duration-1000 ${currentTopic.bgSoft} opacity-60 mix-blend-multiply`}></div>
            <div className={`absolute bottom-[-5%] right-[-5%] w-[300px] h-[300px] rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-1000 ${currentTopic.bgSoft} opacity-50 mix-blend-multiply`}></div>

            {/* Container for content that animates In/Out */}
            <div className={`w-full flex flex-col items-center transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>

                {/* Inputs */}
                <div className="flex gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md text-sm font-bold text-slate-700">
                        <BookOpen className={`w-4 h-4 ${currentTopic.text}`} />
                        {currentTopic.subject}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md text-sm font-bold text-slate-700">
                        <Icon className={`w-4 h-4 ${currentTopic.text}`} />
                        {currentTopic.interest}
                    </div>
                </div>

                {/* Result Card */}
                <Card className="w-full bg-white/80 backdrop-blur-md border-0 shadow-xl p-6 relative overflow-hidden group">
                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${currentTopic.bgLight} to-transparent group-hover:translate-x-full duration-1000 transition-transform`}></div>

                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <span className={`px-2.5 py-1 ${currentTopic.bgSoft} ${currentTopic.textDark} text-[11px] font-extrabold rounded-md uppercase tracking-wide`}>
                            TopicGen Recommendation
                        </span>
                        <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>

                    <h3 className="font-bold text-xl text-slate-800 mb-3 leading-snug whitespace-pre-wrap relative z-10">
                        {currentTopic.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-6 leading-relaxed relative z-10">
                        {currentTopic.desc}
                    </p>

                    {/* Difficulty Meter */}
                    <div className="space-y-2 relative z-10">
                        <div className="flex justify-between text-xs font-semibold text-gray-500 items-center">
                            <span>탐구 난이도</span>
                            <div className="flex items-center gap-2">
                                <span className={`${currentTopic.text} text-xs font-bold`}>{getDifficultyLabel(currentTopic.difficulty)}</span>
                                {renderDifficulty(currentTopic.difficulty)}
                            </div>
                        </div>
                    </div>
                </Card>

            </div>

            {/* Static decorative elements */}
            <div className="absolute bottom-2 left-0 w-full flex justify-center gap-1">
                {DEMO_TOPICS.map((topic, idx) => (
                    <div
                        key={idx}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${idx === currentTopicIndex ? `${topic.bar} w-3` : 'bg-gray-200'}`}
                    />
                ))}
            </div>

        </div>
    );
}
