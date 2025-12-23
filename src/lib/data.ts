import { Edge, Node } from 'reactflow';

export interface ReportBlueprint {
    title: string;
    summary: string;
    actionItems: string[]; // Easy Mode explanation or steps
    references: string[]; // Curriculum Connection
    benefits: string[]; // Report Benefits
}

export const MOCK_BLUEPRINT: ReportBlueprint = {
    title: "동전 던지기 시뮬레이션",
    summary: "Python의 NumPy 라이브러리를 활용하여 베르누이 시행을 시뮬레이션하고, 시행 횟수(n)가 증가함에 따라 표본평균이 모평균으로 수렴함을 시각화합니다.",
    actionItems: [
        "확률과 통계: 이항분포와 정규분포의 관계",
        "미적분: 손실함수의 최솟값을 찾는 경사하강법"
    ],
    references: [
        "확률과 통계: 이항분포와 정규분포의 관계",
        "미적분: 손실함수의 최솟값을 찾는 경사하강법"
    ],
    benefits: [
        "이 주제는 교과서에 충실한 개념을 기반으로 매우 대중적인 실생활 응용 사례를 다룬 것으로 이해가 쉽고 검색/서적 등에서도 쉽게 관련 내용을 찾을 수 있어 학습이 편리할 것으로 예상"
    ]
};

// Initial Nodes for the Mind Map (Law of Large Numbers)
export const INITIAL_NODES: Node[] = [
    {
        id: 'root',
        type: 'input',
        data: { label: '큰 수의 법칙' },
        position: { x: 400, y: 300 },
        className: 'bg-slate-900 text-white border-none rounded-full w-[120px] h-[120px] flex items-center justify-center font-bold shadow-xl text-md'
    },
    {
        id: 'branch-1',
        data: { label: '미분방정식을 활용한 전염병 확산 모델링 (SIR)' },
        position: { x: 400, y: 50 },
        className: 'bg-white border text-sm w-[200px] shadow-sm p-3 text-left rounded-lg'
    },
    {
        id: 'branch-2',
        data: { label: '건축물 구조 해석에 쓰이는 삼각함수와 벡터' },
        position: { x: 50, y: 350 },
        className: 'bg-white border text-sm w-[200px] shadow-sm p-3 text-left rounded-lg'
    },
    {
        id: 'branch-3',
        data: { label: '실생활 속 최적화 문제와 도함수의 활용 사례' },
        position: { x: 750, y: 350 },
        className: 'bg-white border text-sm w-[200px] shadow-sm p-3 text-left rounded-lg'
    },
    {
        id: 'branch-4',
        data: { label: '경제 지표 변화 분석을 통한 미분의 이해' },
        position: { x: 250, y: 550 },
        className: 'bg-white border text-sm w-[200px] shadow-sm p-3 text-left rounded-lg'
    },
    {
        id: 'branch-5',
        data: { label: '음파의 파형 분석과 푸리에 급수의 기초' },
        position: { x: 550, y: 550 },
        className: 'bg-white border text-sm w-[200px] shadow-sm p-3 text-left rounded-lg'
    },
    // The selected leaf node
    {
        id: 'leaf-1', // Corresponds to the drawer view
        data: { label: '동전 던지기 시뮬레이션' },
        position: { x: 800, y: 100 },
        className: 'bg-blue-50 border-2 border-blue-500 font-bold w-[180px] p-3 rounded-lg shadow-md cursor-pointer'
    }
];

export const INITIAL_EDGES: Edge[] = [
    { id: 'e1', source: 'root', target: 'branch-1', type: 'straight', animated: false },
    { id: 'e2', source: 'root', target: 'branch-2', type: 'straight', animated: false },
    { id: 'e3', source: 'root', target: 'branch-3', type: 'straight', animated: false },
    { id: 'e4', source: 'root', target: 'branch-4', type: 'straight', animated: false },
    { id: 'e5', source: 'root', target: 'branch-5', type: 'straight', animated: false },
    // Connection to the leaf node (this might need adjustment depending on the exact mock flow)
    { id: 'e6', source: 'root', target: 'leaf-1', label: '인공지능 & 데이터', type: 'straight', animated: false, style: { stroke: '#3b82f6', strokeWidth: 2 } }
];
