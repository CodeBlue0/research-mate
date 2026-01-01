"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizCardProps {
    type?: 'multiple-choice' | 'ox';
    question: string;
    options?: string[]; // For multiple choice
    correctAnswer: string; // The answer key
    explanation: string; // Explained after answering
    className?: string;
}

export function QuizCard({
    type = 'multiple-choice',
    question,
    options = [],
    correctAnswer,
    explanation,
    className
}: QuizCardProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isCorrect = selectedOption === correctAnswer;

    const handleSelect = (option: string) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (!selectedOption) return;
        setIsSubmitted(true);
    };

    const handleRetry = () => {
        setSelectedOption(null);
        setIsSubmitted(false);
    }

    return (
        <Card className={cn("p-6 border-2 transition-all overflow-hidden relative",
            isSubmitted ? (isCorrect ? "border-green-100 bg-green-50/30" : "border-red-100 bg-red-50/30") : "border-slate-100 bg-white",
            className
        )}>
            {/* Question Header */}
            <div className="flex gap-3 mb-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-1">
                        Concept Check
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {question}
                    </h3>
                </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
                {type === 'ox' ? (
                    <div className="grid grid-cols-2 gap-4">
                        {['O', 'X'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                disabled={isSubmitted}
                                className={cn(
                                    "p-4 rounded-xl border-2 text-center font-bold text-xl transition-all",
                                    selectedOption === option
                                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                        : "border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-200",
                                    isSubmitted && option === correctAnswer && "border-green-500 bg-green-100 text-green-700",
                                    isSubmitted && selectedOption === option && option !== correctAnswer && "border-red-500 bg-red-100 text-red-700",
                                    isSubmitted && option !== correctAnswer && option !== selectedOption && "opacity-50"
                                )}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                ) : (
                    options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSelect(option)}
                            disabled={isSubmitted}
                            className={cn(
                                "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group",
                                selectedOption === option
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                                    : "border-slate-100 bg-slate-50 text-slate-700 hover:border-indigo-200 hover:bg-white",
                                isSubmitted && option === correctAnswer && "border-green-500 bg-green-50 text-green-800",
                                isSubmitted && selectedOption === option && option !== correctAnswer && "border-red-500 bg-red-50 text-red-800",
                                isSubmitted && option !== correctAnswer && option !== selectedOption && "opacity-50"
                            )}
                        >
                            <span className="font-medium">{option}</span>
                            {isSubmitted && option === correctAnswer && (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                            )}
                            {isSubmitted && selectedOption === option && option !== correctAnswer && (
                                <XCircle className="w-5 h-5 text-red-500" />
                            )}
                        </button>
                    ))
                )}
            </div>

            {/* Explanation / Footer */}
            {isSubmitted && (
                <div className={cn("rounded-lg p-4 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2",
                    isCorrect ? "bg-green-100/50 text-green-800" : "bg-red-100/50 text-red-800"
                )}>
                    <p className="font-bold mb-1 flex items-center gap-2">
                        {isCorrect ? "Correct!" : "Not quite..."}
                    </p>
                    <p>{explanation}</p>

                    {!isCorrect && (
                        <Button variant="ghost" size="sm" onClick={handleRetry} className="mt-2 h-8 px-0 text-red-700 hover:text-red-900 hover:bg-red-200/50">
                            Try again
                        </Button>
                    )}
                </div>
            )}

            {!isSubmitted && (
                <div className="flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedOption}
                        className={cn("transition-all", !selectedOption && "opacity-50")}
                    >
                        Check Answer <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
        </Card>
    );
}
