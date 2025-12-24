import { NextResponse } from 'next/server';
import { deepseek, checkApiKey } from '@/lib/deepseek';
import { Node } from 'reactflow';

// Layout helpers matching data.ts
const CENTER_X = 600;
const CENTER_Y = 550;
const RADIUS = 450;

const getPosition = (index: number, total: number = 5) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    // Leaf node width is 420px, so offset is 210 to center
    let x = CENTER_X + RADIUS * Math.cos(angle) - 210;
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
        const { subject, interests, isExpanded, centerCategory, previousTopics } = await request.json();

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

            ${previousTopics && previousTopics.length > 0 ? `IMPORTANT: EXCLUDE the following topics from your suggestions as they have already been seen: ${previousTopics.join(', ')}.` : ''}

            Return the result ONLY as a JSON object with a "topics" array.
            Each topic should have: 
            - "title": Short, catchy title for the node (max 10 words).
            - "description": 1-2 sentence description.
            - "category": Choose from: "수학/생명", "수학/공학", "수학/경제", "수학/예술", "수학/사회", or "기타".

            JSON Format:
            {
                "topics": [
                    { "title": "...", "description": "...", "category": "..." }
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
            const randomSuffix = () => Math.floor(Math.random() * 100);

            // Simple pool of potential topics to mix and match
            const pool = [
                { title: `고급 ${subject} 분석 ${randomSuffix()}`, description: `${subject || '일반'} 데이터의 패턴을 AI로 분석하는 연구입니다.`, category: "수학/공학" },
                { title: `프랙탈 기하학 ${randomSuffix()}`, description: "생물학적 구조에서 나타나는 수학적 패턴을 탐구합니다.", category: "수학/생명" },
                { title: `스마트 시티 교통 ${randomSuffix()}`, description: "그래프 이론을 활용하여 도심 교통 흐름을 최적화합니다.", category: "수학/공학" },
                { title: `전염병 모델링 ${randomSuffix()}`, description: "전염병 확산을 수학적 모델링으로 예측하고 분석합니다.", category: "수학/생명" },
                { title: `암호화폐 시장 분석 ${randomSuffix()}`, description: "가상화폐 시장의 등락폭을 통계적으로 분석합니다.", category: "수학/경제" },
                { title: `네트워크 이론 ${randomSuffix()}`, description: "복잡계 네트워크의 연결성을 분석합니다.", category: "수학/사회" },
                { title: `음악과 수학 ${randomSuffix()}`, description: "화성학에 숨겨진 수학적 비율을 연구합니다.", category: "수학/예술" },
                { title: `게임 이론 ${randomSuffix()}`, description: "경제적 의사결정 모델을 시뮬레이션합니다.", category: "수학/경제" }
            ];

            // Shuffle and pick 5
            const shuffled = pool.sort(() => 0.5 - Math.random());
            topics = shuffled.slice(0, 5);
        }

        // Transform to Nodes
        const rootType = isExpanded ? 'expanded-center' : 'central';
        // Adjust position based on node size
        // Central (Circle): 260px -> offset 130
        // Expanded (Card): 320px -> offset 160
        const rootX = isExpanded ? CENTER_X - 160 : CENTER_X - 130;
        // Height approx 180px? -> offset 90
        const rootY = isExpanded ? CENTER_Y - 90 : CENTER_Y - 130;

        const nodes: Node[] = [
            {
                id: 'root',
                type: rootType,
                data: {
                    label: subject || 'Research Topic',
                    category: centerCategory,
                    // If expanded, might add description if gathered or passed?
                    // Currently just subject is passed.
                    description: isExpanded ? '선택한 주제의 확장 탐구' : undefined
                },
                position: { x: rootX, y: rootY },
            },
            // Phantom node to balance the layout (forces fitView to center correctly)
            {
                id: 'phantom-bottom',
                type: 'default',
                data: { label: '' },
                position: { x: CENTER_X, y: CENTER_Y + RADIUS + 100 },
                style: { opacity: 0, width: 1, height: 1 },
                draggable: false, selectable: false, connectable: false,
            },
            ...topics.map((topic: any, index: number) => ({
                id: `branch - ${index + 1} `,
                type: 'leaf',
                data: {
                    label: topic.title,
                    description: topic.description,
                    category: topic.category || "기타",
                    iconColor: CATEGORY_COLORS[topic.category] || CATEGORY_COLORS['기타'],
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
