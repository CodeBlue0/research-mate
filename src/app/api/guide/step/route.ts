import { NextResponse } from 'next/server';
import { deepseek } from '@/lib/deepseek';

export async function POST(request: Request) {
    try {
        const { topic, step } = await request.json();

        // Check KEY
        const apiKey = process.env.DEEPSEEK_API_KEY;
        const shouldUseRealApi = !!apiKey && apiKey.length > 0 && apiKey !== 'dummy-key';

        let data = null;

        if (shouldUseRealApi) {
            const stepNames = ["Hypothesis Setting", "Experimental Design", "Data Analysis", "Report Writing"];
            const currentStepName = stepNames[step - 1] || "Research";

            const prompt = `
            Provide a detailed specific guide for Step ${step} (${currentStepName}) of a high school research project on the topic: "${topic}".
            Language: Korean.
    
            Return ONLY a JSON object with:
            - "title": Title of the step.
            - "description": Explanation of what to do in this step for this specific topic.
            - "goal": The main goal of this step.
            - "checklist": Array of 3-4 specific to-do items.
            - "example": A concrete example relevant to the topic (e.g. an example hypothesis or experiment setup).
            - "tips": Array of 2 expert tips.
    
            JSON Format:
            {
                "title": "...",
                "description": "...",
                "goal": "...",
                "checklist": ["...", "..."],
                "example": "...",
                "tips": ["...", "..."]
            }
            `;

            const completion = await deepseek.chat.completions.create({
                messages: [{ role: "system", content: "You are a research mentor." }, { role: "user", content: prompt }],
                model: "deepseek-chat",
                response_format: { type: "json_object" },
            });

            const content = completion.choices[0].message.content;
            if (content) {
                data = JSON.parse(content);
            }
        }

        if (!data) {
            console.log("Using Mock Data for Guide Step");
            const stepTitles = ["가설 설정", "실험 설계", "데이터 분석", "보고서 작성"];
            const title = stepTitles[step - 1] || "탐구 단계";

            data = {
                title: `${title} 가이드`,
                description: `${topic} 주제에 대한 ${title} 단계입니다. AI API Key가 설정되지 않아 예시 데이터를 보여드립니다.`,
                goal: "이번 단계의 명확한 목표를 설정하고 달성하는 것입니다.",
                checklist: [
                    "목표 구체화하기",
                    "필요한 자료 조사하기",
                    "전문가 조언 참고하기"
                ],
                example: `예시: ${topic}에 대해 이러이러한 방식으로 접근할 수 있습니다.`,
                tips: [
                    "작은 것부터 시작하세요.",
                    "기록을 꼼꼼히 남기세요."
                ]
            };
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("Guide Step API Error:", error);
        return NextResponse.json({
            title: "Error Loading Guide",
            description: "Failed to load dynamic guide.",
            goal: "Check connection or API key.",
            checklist: [],
            example: "",
            tips: []
        });
    }
}
