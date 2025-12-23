"use client";

import React, { useCallback } from 'react';
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Node,
    Edge
} from 'reactflow';
import 'reactflow/dist/style.css';

interface MindMapProps {
    initialNodes: Node[];
    initialEdges: Edge[];
    onNodeClick: (node: Node) => void;
}

const MindMap: React.FC<MindMapProps> = ({ initialNodes, initialEdges, onNodeClick }) => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        onNodeClick(node);
    }, [onNodeClick]);

    return (
        <div className="h-[500px] w-full border rounded-lg overflow-hidden bg-slate-50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                fitView
                nodesDraggable={false}
                zoomOnScroll={false}
                panOnDrag={false}
                zoomOnDoubleClick={false}
                zoomOnPinch={false}
                preventScrolling={false}
                proOptions={{ hideAttribution: true }}
            >
                <Background />
            </ReactFlow>
        </div>
    );
};

export default MindMap;
