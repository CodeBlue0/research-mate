"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Node, Edge } from 'reactflow';

// Define types here or import from a shared types file
// For now, defining here to match ResultPage structure
export interface HistoryNode {
    id: string; // unique ID
    nodes: Node[];
    edges: Edge[];
    data: {
        subject: string;
        topic?: string;
        interests: string;
        difficulty?: string;
        focusTopic?: string;
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

    // Persistence Logic
    useEffect(() => {
        const savedData = localStorage.getItem('mindmap_storage');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                const { root, currentNodeId, seen } = parsed;

                if (root) {
                    const restoredRoot = deserializeHistoryNode(root);
                    setHistoryRoot(restoredRoot);

                    // Restore current node
                    if (currentNodeId) {
                        const found = findNodeById(restoredRoot, currentNodeId);
                        setCurrentNode(found || restoredRoot);
                    } else {
                        setCurrentNode(restoredRoot);
                    }
                }

                if (seen) {
                    setSeenTopics(seen);
                }
            } catch (e) {
                console.error("Failed to load mindmap state", e);
            }
        }
    }, []);

    useEffect(() => {
        if (!historyRoot) return;

        const serializedRoot = serializeHistoryNode(historyRoot);
        const dataToSave = {
            root: serializedRoot,
            currentNodeId: currentNode?.id,
            seen: seenTopics
        };

        localStorage.setItem('mindmap_storage', JSON.stringify(dataToSave));
    }, [historyRoot, currentNode, seenTopics]);

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

// Helpers for circular reference handling
interface SerializedNode extends Omit<HistoryNode, 'parent' | 'children'> {
    children: SerializedNode[];
}

function serializeHistoryNode(node: HistoryNode): SerializedNode {
    // Destructure to separate parent/children from the rest
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parent, children, ...rest } = node;
    return {
        ...rest,
        children: node.children.map(child => serializeHistoryNode(child))
    };
}

function deserializeHistoryNode(node: SerializedNode, parent: HistoryNode | null = null): HistoryNode {
    const newNode: HistoryNode = {
        ...node,
        parent: parent,
        children: []
    } as any; // Cast because children will be filled next

    newNode.children = node.children.map(child => deserializeHistoryNode(child, newNode));
    return newNode;
}

function findNodeById(root: HistoryNode, id: string): HistoryNode | null {
    if (root.id === id) return root;
    for (const child of root.children) {
        const found = findNodeById(child, id);
        if (found) return found;
    }
    return null;
}

export function useMindMap() {
    const context = useContext(MindMapContext);
    if (context === undefined) {
        throw new Error('useMindMap must be used within a MindMapProvider');
    }
    return context;
}
