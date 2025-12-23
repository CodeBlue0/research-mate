"use client";

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CentralNode, LeafNode, ExpandedCenterNode } from './CustomNode';

interface MindMapProps {
    initialNodes: Node[];
    initialEdges: Edge[];
    onNodeClick: (node: Node) => void;
    onPaneClick?: () => void;
}

const MindMap: React.FC<MindMapProps> = ({ initialNodes, initialEdges, onNodeClick, onPaneClick }) => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const nodeTypes = useMemo<NodeTypes>(() => ({
        central: CentralNode,
        leaf: LeafNode,
        'expanded-center': ExpandedCenterNode
    }), []);

    const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        onNodeClick(node);
    }, [onNodeClick]);

    return (
        <div className="h-full w-full bg-slate-50/50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                // Disable some interactions for a cleaner "presentation" feel
                nodesDraggable={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                panOnDrag={false}
                zoomOnDoubleClick={false}
                minZoom={0.5}
                maxZoom={1.5}
                proOptions={{ hideAttribution: true }}
            >
                <Background gap={24} size={1} color="#e2e8f0" />
            </ReactFlow>
        </div>
    );
};

export default MindMap;
