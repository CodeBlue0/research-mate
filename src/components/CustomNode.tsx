"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { LucideIcon, FileText, Activity, Network, TrendingUp, Music, Calculator } from 'lucide-react';

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

export const LeafNode = memo(({ data }: NodeProps) => {
    // Determine icon based on category
    const categoryName = data.category || "default";
    const Icon = iconMap[categoryName] || iconMap["default"];

    return (
        <div className="relative w-[420px] bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group border border-slate-100">
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-transparent !border-none !w-1 !h-1 !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2"
            />

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
    );
});
