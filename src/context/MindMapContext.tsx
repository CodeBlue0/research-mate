"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Node, Edge } from 'reactflow';

// Define types here or import from a shared types file
// For now, defining here to match ResultPage structure
export interface HistoryNode {
    id: string; // unique ID
    nodes: Node[];
    edges: Edge[];
    data: {
        subject: string;
        interests: string;
        isExpanded: boolean;
        centerCategory: string;
    };
    parent: HistoryNode | null;
    children: HistoryNode[];
    sourceNodeId?: string;
}

interface MindMapContextType {
    historyRoot: HistoryNode | null;
    setHistoryRoot: (node: HistoryNode | null) => void;
    currentNode: HistoryNode | null;
    setCurrentNode: (node: HistoryNode | null) => void;
    seenTopics: string[];
    setSeenTopics: (topics: string[] | ((prev: string[]) => string[])) => void;
    // Helper to check if we have data
    hasData: boolean;
}

const MindMapContext = createContext<MindMapContextType | undefined>(undefined);

export function MindMapProvider({ children }: { children: ReactNode }) {
    const [historyRoot, setHistoryRoot] = useState<HistoryNode | null>(null);
    const [currentNode, setCurrentNode] = useState<HistoryNode | null>(null);
    const [seenTopics, setSeenTopics] = useState<string[]>([]);

    const value = {
        historyRoot,
        setHistoryRoot,
        currentNode,
        setCurrentNode,
        seenTopics,
        setSeenTopics,
        hasData: !!historyRoot
    };

    return (
        <MindMapContext.Provider value={value}>
            {children}
        </MindMapContext.Provider>
    );
}

export function useMindMap() {
    const context = useContext(MindMapContext);
    if (context === undefined) {
        throw new Error('useMindMap must be used within a MindMapProvider');
    }
    return context;
}
