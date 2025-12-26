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
    '생명': 'bg-blue-100 text-blue-600',
    '공학': 'bg-orange-100 text-orange-600',
    '경제': 'bg-green-100 text-green-600',
    '예술': 'bg-pink-100 text-pink-600',
    '사회': 'bg-indigo-100 text-indigo-600',
    '생활': 'bg-yellow-100 text-yellow-600',
    '기타': 'bg-slate-100 text-slate-600'
};

export async function POST(request: Request) {
    try {
        const { subject, topic, interests, difficulty, isExpanded, centerCategory, previousTopics, focusTopic } = await request.json();

        // Check for API Key but don't fail immediately, try-catch will handle fallback
        const apiKey = process.env.DEEPSEEK_API_KEY;
        const shouldUseRealApi = !!apiKey && apiKey.length > 0 && apiKey !== 'dummy-key';

        console.log("DeepSeek Debug - API Key Present:", !!apiKey);
        console.log("DeepSeek Debug - Key Value:", apiKey === 'dummy-key' ? 'dummy-key' : (apiKey ? 'Provided (hidden)' : 'Undefined'));
        console.log("DeepSeek Debug - shouldUseRealApi:", shouldUseRealApi);

        let topics = [];

        if (shouldUseRealApi) {
            const prompt = `
            You are an expert research consultant for **Korean high school students**.
            Generate 5 high-quality research topics based on the following student profile:
            
            1. **Current Subject**: ${subject}
            2. **Curriculum/Unit (Context)**: ${topic || 'General'}
            3. **Career/Interests**: ${interests}
            4. **Difficulty Level**: ${difficulty || 50} (0: Basic, 50: Applied, 100: Advanced)
            ${focusTopic ? `5. **Specific Focus Topic**: "${focusTopic}" (Generate topics intimately related to this specific theme)` : ''}

            The topics should connect the **Curriculum Unit** in the **Subject** with the student's **Interests**.
            
            **Difficulty Guideline**:
            - **Basic (around 0)**: "생활 속 예시" - Topics explaining daily life phenomena using subject principles.
            - **Applied (around 50)**: "교과 연계" - Topics connecting curriculum concepts with other fields.
            - **Advanced (around 100)**: "논문/전공 기초" - Topics requiring professional knowledge or academic paper analysis.

            IMPORTANT: Output all text in **KOREAN (한국어)**.

            ${previousTopics && previousTopics.length > 0 ? `IMPORTANT: EXCLUDE the following topics from your suggestions as they have already been seen: ${previousTopics.join(', ')}.` : ''}

            Return the result ONLY as a JSON object with a "topics" array.
            Each topic should have: 
            - "title": Short, catchy title for the node (max 10 words).
            - "description": 1-2 sentence description explaining the connection.
            - "category": Choose the most relevant field from: "생명", "공학", "경제", "예술", "사회", "생활", or "기타".

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
                { title: `${subject} 기반 데이터 분석 ${randomSuffix()}`, description: `${subject || '교과'} 데이터를 활용한 인공지능 분석 연구`, category: "공학" },
                { title: `생체 모방과 ${topic || '원리'} ${randomSuffix()}`, description: "생물의 구조적 특징을 교과 원리로 해석", category: "생명" },
                { title: `스마트 도시와 ${subject} ${randomSuffix()}`, description: "도시 문제 해결을 위한 최적화 모델링", category: "공학" },
                { title: `전염병 확산 모델 ${randomSuffix()}`, description: "질병 전파를 예측하는 수리/통계적 모델링", category: "생명" },
                { title: `금융 시장과 ${topic || '변동성'} ${randomSuffix()}`, description: "시장 데이터를 분석하여 경제적 가치를 창출", category: "경제" },
                { title: `소셜 네트워크 분석 ${randomSuffix()}`, description: "사회적 연결망의 구조와 확산 패턴 연구", category: "사회" },
                { title: `음악 속의 ${subject} ${randomSuffix()}`, description: "화성학과 주파수 분석을 통한 예술적 탐구", category: "예술" },
                { title: `게임 이론과 전략 ${randomSuffix()}`, description: "의사결정 과정에서의 최적 전략 분석", category: "경제" }
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
                    label: focusTopic || subject || 'Research Topic',
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
