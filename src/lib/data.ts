import { Edge, Node } from 'reactflow';

export interface ReportBlueprint {
    title: string;
    summary: string;
    actionItems: string[];
    references: string[];
    benefits: string[];
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

// Pentagon Layout Configuration
const CENTER_X = 600;
const CENTER_Y = 400;
const RADIUS = 350;

// Helper to calculate position
const getPosition = (index: number, total: number = 5) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    let x = CENTER_X + RADIUS * Math.cos(angle) - 160;
    let y = CENTER_Y + RADIUS * Math.sin(angle) - 100;

    // Adjust side nodes (User's nodes 2 and 5, My indices 1 and 4) downwards
    if (index === 1 || index === 4) {
        y += 50;
    }

    return { x, y };
};

export const INITIAL_NODES: Node[] = [
    {
        id: 'root',
        type: 'central',
        data: { label: '큰 수의 법칙' },
        position: { x: CENTER_X - 90, y: CENTER_Y - 90 }, // Center - half size
    },
    {
        id: 'branch-1',
        type: 'leaf',
        data: {
            label: '미분방정식을 활용한 전염병 확산 모델링 (SIR)',
            description: 'SIR 모형을 중심으로 코로나19와 같은 전염병 확산 데이터를 분석하고...',
            category: '수학/생명',
            iconColor: 'bg-blue-100 text-blue-600',
            tags: ['수학/생명']
        },
        position: getPosition(0),
    },
    {
        id: 'branch-2',
        type: 'leaf',
        data: {
            label: '건축물 구조 해석에 쓰이는 삼각함수와 벡터',
            description: '한옥의 처마, 아치형 다리 등 건축물의 하중 분산 원리를 벡터와...',
            category: '수학/공학',
            iconColor: 'bg-orange-100 text-orange-600',
            tags: ['수학/공학']
        },
        position: getPosition(1),
    },
    {
        id: 'branch-3',
        type: 'leaf',
        data: {
            label: '실생활 속 최적화 문제와 도함수의 활용 사례',
            description: '택배 배송 경로 최소화, 제품 패키징 비용 절감 등 산업 현장의 최적화...',
            category: '수학/경제',
            iconColor: 'bg-green-100 text-green-600',
            tags: ['수학/경제']
        },
        position: getPosition(2),
    },
    {
        id: 'branch-5', // Swapped order for visual balance if needed, keeping simple loop for now
        type: 'leaf',
        data: {
            label: '음파의 파형 분석과 푸리에 급수의 기초',
            description: '악기 소리의 고유한 음색을 주파수 분석을 통해 시각화하고...',
            category: '수학/예술',
            iconColor: 'bg-pink-100 text-pink-600',
            tags: ['수학/예술']
        },
        position: getPosition(3),
    },
    {
        id: 'branch-4',
        type: 'leaf',
        data: {
            label: '경제 지표 변화율 분석을 통한 미분의 이해',
            description: 'GDP 성장률, 물가 상승률 등 주요 경제 변수의 변화를 순간 변화율...',
            category: '수학/사회',
            iconColor: 'bg-indigo-100 text-indigo-600',
            tags: ['수학/사회']
        },
        position: getPosition(4),
    },
];

export const INITIAL_EDGES: Edge[] = [
    { id: 'e1', source: 'root', target: 'branch-1', type: 'straight', animated: true, style: { stroke: '#e2e8f0', strokeWidth: 2 } },
    { id: 'e2', source: 'root', target: 'branch-2', type: 'straight', animated: true, style: { stroke: '#e2e8f0', strokeWidth: 2 } },
    { id: 'e3', source: 'root', target: 'branch-3', type: 'straight', animated: true, style: { stroke: '#e2e8f0', strokeWidth: 2 } },
    { id: 'e4', source: 'root', target: 'branch-4', type: 'straight', animated: true, style: { stroke: '#e2e8f0', strokeWidth: 2 } },
    { id: 'e5', source: 'root', target: 'branch-5', type: 'straight', animated: true, style: { stroke: '#e2e8f0', strokeWidth: 2 } },
];
