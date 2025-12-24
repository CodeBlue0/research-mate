"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { LucideIcon, FileText, Activity, Network, TrendingUp, Music, Calculator, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon mapping (simplified for demo, can be expanded)
const iconMap: Record<string, LucideIcon> = {
    "수학/생명": Activity,
    "수학/공학": Calculator,
    "수학/경제": TrendingUp,
    "수학/사회": Network,
    "수학/예술": Music,
    "default": FileText
};

export const CentralNode = memo(({ data }: NodeProps) => {
    return (
        <div className="relative group">
            {/* Pulsing effect */}
            <div className="absolute inset-0 rounded-full bg-slate-900/20 blur-xl group-hover:bg-slate-900/30 transition-all duration-500 animate-pulse" />

            {/* Main Circle */}
            <div className="relative w-[260px] h-[260px] rounded-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center border-4 border-slate-100 shadow-2xl transition-transform duration-300 hover:scale-105">
                <div className="text-white font-bold text-4xl leading-tight">
                    {data.label}
                </div>
                <div className="text-slate-400 text-sm mt-3 uppercase tracking-wider font-semibold">
                    Main Topic
                </div>
            </div>

            {/* Hidden Handle for connections */}
            <Handle
                type="source"
                position={Position.Top}
                className="!bg-transparent !border-none !w-1 !h-1 !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2"
            />
        </div>
    );
});

export const LeafNode = memo(({ id, data }: NodeProps) => {
    // Determine icon based on category
    const categoryName = data.category || "default";
    const Icon = iconMap[categoryName] || iconMap["default"];

    return (
        <div className="relative w-[420px] group transition-all duration-300 hover:-translate-y-1">
            {data.hasStack && (
                <>
                    {/* single Stack Layer - Horizontal Slide */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            data.onStackClick?.(id);
                        }}
                        className="absolute inset-0 bg-blue-100/80 rounded-3xl border border-blue-200 translate-x-2 translate-y-2 -z-10 shadow-sm transition-all duration-300 group-hover:translate-x-8 cursor-pointer hover:bg-blue-200/80"
                    />
                </>
            )}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-slate-100 cursor-pointer">
                <Handle
                    type="target"
                    position={Position.Top}
                    className="!bg-transparent !border-none !w-1 !h-1 !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2"
                />

                {/* Pin Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        data.onPinClick?.(id);
                    }}
                    className={cn(
                        "absolute top-3 right-3 z-50 transition-all duration-200 w-8 h-8 rounded-full flex items-center justify-center",
                        data.isPinned
                            ? "text-blue-500 opacity-100 scale-110"
                            : "text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-600 hover:bg-slate-100 hover:scale-110"
                    )}
                >
                    <Pin className={cn("w-5 h-5", data.isPinned && "fill-current")} strokeWidth={1.5} />
                </button>

                {/* Top Row: Icon & Tag */}
                <div className="flex justify-between items-start mb-5">
                    <div className={`p-3 rounded-2xl ${data.iconColor || 'bg-blue-100 text-blue-600'}`}>
                        <Icon className="w-7 h-7" />
                    </div>
                    {data.category && (
                        <span className="bg-slate-100 text-slate-500 text-sm font-bold px-4 py-1.5 rounded-full">
                            {data.category}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-800 text-3xl leading-snug mb-3 line-clamp-3">
                    {data.label}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-lg leading-relaxed mb-6 line-clamp-3">
                    {data.description}
                </p>

                {/* Footer: Rating & Action */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm">★</span>
                        ))}
                        <span className="text-gray-200 text-sm">★</span>
                    </div>
                    <div className="flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        상세 보기
                        <span className="ml-1">→</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const ExpandedCenterNode = memo(({ data }: NodeProps) => {
    const categoryName = data.category || "default";
    const Icon = iconMap[categoryName] || iconMap["default"];

    return (
        <div className="relative w-[320px] bg-white rounded-3xl p-6 shadow-xl border border-slate-100 z-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            {/* Center Source Handle */}
            <Handle
                type="source"
                position={Position.Top}
                className="!bg-transparent !border-none !w-1 !h-1 !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2"
            />

            {/* Top Row: Icon & Tag */}
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${data.iconColor || 'bg-blue-100 text-blue-600'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {data.category && (
                    <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
                        {data.category}
                    </span>
                )}
            </div>

            <h3 className="font-bold text-slate-800 text-2xl leading-snug mb-2 line-clamp-2">
                {data.label}
            </h3>

            <p className="text-slate-500 text-base leading-relaxed mb-4 line-clamp-2">
                {data.description || "확장된 중심 탐구 주제입니다."}
            </p>

            {/* Footer: Rating & Action */}
            <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                    <span className="text-gray-200 text-sm">★</span>
                </div>
                <div className="flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    상세 보기
                    <span className="ml-1">→</span>
                </div>
            </div>
        </div>
    );
});
