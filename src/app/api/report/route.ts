import { NextResponse } from 'next/server';
import { deepseek } from '@/lib/deepseek';

export async function POST(request: Request) {
    try {
        const { topic } = await request.json();

        // Check Key
        const apiKey = process.env.DEEPSEEK_API_KEY;
        const shouldUseRealApi = !!apiKey && apiKey.length > 0 && apiKey !== 'dummy-key';

        let data = null;

        if (shouldUseRealApi) {
            const prompt = `
            Create a comprehensive design for a high school research inquiry report on the topic: "${topic}".
            The content should be academic, precise, and suitable for a sophisticated high school project.
            Language: Korean.
    
            Return ONLY a JSON object with the following fields:
            - "title": Refined academic title.
            - "subTitle": A subtitle focusing on the methodology or scientific principle.
            - "summary": A 3-4 sentence overview of the research goal and theoretical background.
            - "coreConcepts": Array of 2 objects, each with "name" (concept name) and "description".
            - "curriculum": Array of 2 objects, each with "name" (Subject name, e.g. "Physics I") and "description" (how it connects).
            - "inquiryGuide": Array of 4 strings, representing the specific activity for each step for THIS topic:
                1. Background Theory (Curriculum & Advanced Concepts)
                2. Curriculum Connection (Principles application)
                3. Practical Activity (User-led experiment/activity)
                4. Report Writing (Synthesis)
            - "references": Array of 2 reference titles.
    
            JSON Format:
            {
                "title": "...",
                "subTitle": "...",
                "summary": "...",
                "coreConcepts": [ {"name": "...", "description": "..."}, {"name": "...", "description": "..."} ],
                "curriculum": [ {"name": "...", "description": "..."}, {"name": "...", "description": "..."} ],
                "inquiryGuide": ["Desc for step 1", "Desc for step 2", "Desc for step 3", "Desc for step 4"],
                "references": ["...", "..."]
            }
            `;

            const completion = await deepseek.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful academic assistant." }, { role: "user", content: prompt }],
                model: "deepseek-chat",
                response_format: { type: "json_object" },
            });

            const content = completion.choices[0].message.content;
            if (content) {
                data = JSON.parse(content);
            }
        }

        if (!data) {
            console.log("Using Mock Data for Report Blueprint");
            data = {
                title: `${topic}에 대한 심층 탐구`,
                subTitle: "고등학교 과학 탐구 프로젝트",
                summary: `${topic}에 대한 과학적 원리를 탐구하고 실생활에 적용할 수 있는 방안을 모색합니다. 이 연구는 이론적 배경과 실험적 검증을 통해 결론을 도출하는 과정을 포함합니다. (AI API Key가 없어 예시 데이터를 표시합니다.)`,
                coreConcepts: [
                    { name: "핵심 개념 A", description: `${topic}의 기초가 되는 이론입니다.` },
                    { name: "핵심 개념 B", description: "심화된 응용 원리입니다." }
                ],
                curriculum: [
                    { name: "관련 교과 I", description: "교과서 3단원과 연계됩니다." },
                    { name: "관련 교과 II", description: "실생활 문제 해결 단원과 연계됩니다." }
                ],
                inquiryGuide: [
                    "주제와 관련된 교과 개념 및 심화 이론을 조사합니다.",
                    "탐구 내용이 교과 과정의 어떤 원리와 연결되는지 분석합니다.",
                    "설계한 실험이나 조사를 직접 수행하고 데이터를 수집합니다.",
                    "분석된 결과를 바탕으로 최종 탐구 보고서를 작성합니다."
                ],
                references: ["관련 논문 A (2024)", "전공 서적 B"]
            };
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("Report Blueprint Gen Error:", error);
        // Return basic mock error data
        return NextResponse.json({
            title: "Error Handling Report",
            subTitle: "System Error or API Issue",
            summary: "Failed to generate report details. Showing fallback content.",
            coreConcepts: [],
            curriculum: [],
            inquiryGuide: ["Step 1", "Step 2", "Step 3", "Step 4"],
            references: []
        });
    }
}
