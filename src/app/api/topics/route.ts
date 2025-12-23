import { NextResponse } from 'next/server';
import { deepseek, checkApiKey } from '@/lib/deepseek';
import { Node } from 'reactflow';

// Layout helpers matching data.ts
const CENTER_X = 600;
const CENTER_Y = 550;
const RADIUS = 450;

const getPosition = (index: number, total: number = 5) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    let x = CENTER_X + RADIUS * Math.cos(angle) - 160;
    let y = CENTER_Y + RADIUS * Math.sin(angle) - 100;

    if (index === 1 || index === 4) {
        y += 90;
    }
    return { x, y };
};

const CATEGORY_COLORS: Record<string, string> = {
    '수학/생명': 'bg-blue-100 text-blue-600',
    '수학/공학': 'bg-orange-100 text-orange-600',
    '수학/경제': 'bg-green-100 text-green-600',
    '수학/예술': 'bg-pink-100 text-pink-600',
    '수학/사회': 'bg-indigo-100 text-indigo-600',
    '기타': 'bg-slate-100 text-slate-600'
};

export async function POST(request: Request) {
    try {
        const { subject, interests } = await request.json();

        // Check for API Key but don't fail immediately, try-catch will handle fallback
        const apiKey = process.env.DEEPSEEK_API_KEY;
        const shouldUseRealApi = !!apiKey && apiKey.length > 0 && apiKey !== 'dummy-key';

        console.log("DeepSeek Debug - API Key Present:", !!apiKey);
        console.log("DeepSeek Debug - Key Value:", apiKey === 'dummy-key' ? 'dummy-key' : (apiKey ? 'Provided (hidden)' : 'Undefined'));
        console.log("DeepSeek Debug - shouldUseRealApi:", shouldUseRealApi);

        let topics = [];

        if (shouldUseRealApi) {
            const prompt = `
            You are an expert high school research consultant.
            Suggest 5 specific, high-quality research topics related to the subject "${subject}" and interests "${interests}".
            The topics should be suitable for a high school student's rigorous inquiry project.
            IMPORTANT: Output all text (title, label, description, tags, etc.) in KOREAN (한국어).

            Return the result ONLY as a JSON object with a "topics" array.
            Each topic should have:
            - "title": Short, catchy title.
            - "label": A slightly longer, descriptive label for the node (max 10 words).
            - "description": 1-2 sentence description.
            - "category": Choose from: "수학/생명", "수학/공학", "수학/경제", "수학/예술", "수학/사회", or "기타".
            - "tags": Array of 1-2 short tags (e.g. "수학", "생명").

            JSON Format:
            {
                "topics": [
                    { "title": "...", "label": "...", "description": "...", "category": "...", "tags": ["..."] }
                ]
            }
            `;

            const completion = await deepseek.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful assistant that outputs JSON." }, { role: "user", content: prompt }],
                model: "deepseek-chat",
                response_format: { type: "json_object" },
            });

            const content = completion.choices[0].message.content;
            if (content) {
                const result = JSON.parse(content);
                topics = result.topics;
            }
        }

        // Fallback Mock Data if API failed or skipped
        if (!topics || topics.length === 0) {
            console.log("Using Mock Data for Topics");
            topics = [
                { title: `고급 ${subject}`, label: `${subject} & AI 분석`, description: `${subject || '일반'} 데이터의 패턴을 AI로 분석하는 연구입니다.`, category: "수학/공학", tags: ["AI", subject || "수학"] },
                { title: "프랙탈 기하학", label: "자연 속의 프랙탈", description: "생물학적 구조에서 나타나는 수학적 패턴을 탐구합니다.", category: "수학/생명", tags: ["수학", "생명"] },
                { title: "스마트 시티 교통", label: "교통 최적화 알고리즘", description: "그래프 이론을 활용하여 도심 교통 흐름을 최적화합니다.", category: "수학/공학", tags: ["수학", "도시"] },
                { title: "전염병 모델링", label: "SIR 바이러스 모델", description: "전염병 확산을 수학적 모델링으로 예측하고 분석합니다.", category: "수학/생명", tags: ["수학", "생명"] },
                { title: "암호화폐 시장 분석", label: "변동성 통계 분석", description: "가상화폐 시장의 등락폭을 통계적으로 분석합니다.", category: "수학/경제", tags: ["경제", "통계"] },
            ];
        }

        // Transform to Nodes
        const nodes: Node[] = [
            {
                id: 'root',
                type: 'central',
                data: { label: subject || 'Research Topic' },
                position: { x: CENTER_X - 90, y: CENTER_Y - 90 },
            },
            ...topics.map((topic: any, index: number) => ({
                id: `branch - ${index + 1} `,
                type: 'leaf',
                data: {
                    label: topic.label || topic.title,
                    description: topic.description,
                    category: topic.category || "기타",
                    iconColor: CATEGORY_COLORS[topic.category] || CATEGORY_COLORS['기타'],
                    tags: topic.tags
                },
                position: getPosition(index, topics.length)
            }))
        ];

        return NextResponse.json({ nodes });

    } catch (error) {
        console.error("DeepSeek API Error:", error);
        // Even in catch, return mock data to prevent app crash
        const nodes: Node[] = [
            { id: 'root', type: 'central', data: { label: 'Error Fallback' }, position: { x: CENTER_X - 90, y: CENTER_Y - 90 } },
            { id: 'branch-1', type: 'leaf', data: { label: 'Mock Topic 1', description: 'Fallback data due to API error', category: '기타' }, position: getPosition(0, 1) }
        ];
        return NextResponse.json({ nodes });
    }
}
