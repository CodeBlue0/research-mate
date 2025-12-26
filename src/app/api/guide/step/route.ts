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
            const stepNames = ["Background Theory", "Curriculum Connection", "Practical Activity", "Report Writing"];
            const currentStepName = stepNames[step - 1] || "Research";

            if (step === 1) {
                // Specific prompt for Step 1: Deep University Level
                const prompt = `
                Provide a highly detailed, university-level background theory guide for Step 1 of a research project on: "${topic}".
                Language: Korean.

                You MUST split the core concepts into two distinct categories:
                
                1. **Advanced/University Concepts**: 
                   - Provide deep theoretical explanations suitable for an undergraduate major.
                   - **MANDATORY**: Include specific mathematical formulas or chemical equations (e.g., "Bernoulli's Equation: P + 1/2ρv^2 + ρgh = constant").
                   - Explain the variables in the formulas.
                   - Discuss limiting factors or assumptions of the theory.

                2. **High School Curriculum Concepts**: 
                   - Connect specific high school textbook units (Math/Physics/Chemistry/Bio/Society) to this topic.
                   - Explain how the high school concept forms the foundation for the advanced concept above.
                   - Mention specific formulas from the high school curriculum.

                Return ONLY a JSON object with:
                - "title": "배경 이론 (심화)"
                - "description": Intro emphasizing rigour.
                - "advancedConcepts": Array of 2 objects { "name": "...", "description": "Details with formulas..." }
                - "curriculumConcepts": Array of 2 objects { "name": "...", "description": "Details with formulas..." }
                - "goal": Goal of this step.
                - "checklist": Array of 3-4 todos.
                - "tips": Array of 2 tips.

                JSON Format:
                {
                    "title": "...",
                    "description": "...",
                    "advancedConcepts": [ ... ],
                    "curriculumConcepts": [ ... ],
                    "goal": "...",
                    "checklist": [ ... ],
                    "tips": [ ... ]
                }
                `;

                const completion = await deepseek.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a strict and knowledgeable University Professor. You value rigorous mathematical definitions and deep theoretical analysis." },
                        { role: "user", content: prompt }
                    ],
                    model: "deepseek-chat",
                    response_format: { type: "json_object" },
                });

                const content = completion.choices[0].message.content;
                if (content) return NextResponse.json(JSON.parse(content));
            }

            if (step === 2) {
                // Specific prompt for Step 2: Connection Theory Only (Deep)
                const prompt = `
                Provide a highly detailed "Principle Application" guide for Step 2 of a research project on: "${topic}".
                Language: Korean.

                This step focuses ONLY on explaining how the theoretical concepts (from Step 1) are applied to this specific inquiry topic.
                
                You MUST provide three distinct layers of analysis:
                1. **Core Principle**: Briefly state the key scientific/theoretical principle that is most critical for this topic.
                2. **Application Mechanism**: 
                   - Provide a **HIGHLY DETAILED** technical explanation (approx. 200 words).
                   - **EXPLICITLY** reference specific advanced concepts and variables defined in Step 1.
                   - Explain the step-by-step physical/chemical/logical process of how the theory creates the observed phenomenon in this research topic.
                   - Use a professional, academic tone suitable for a research paper.
                3. **Research Relevance**: Explain WHY this connection is important for the student's specific research goal.

                Return ONLY a JSON object with:
                - "title": "원리 적용 및 심화 확장"
                - "description": Intro emphasizing reference to Step 1.
                - "corePrinciple": "Name and definition of the key principle."
                - "applicationMechanism": "Detailed, multi-paragraph explanation of the mechanism..."
                - "researchRelevance": "Explanation of importance..."
                - "goal": Goal.
                - "checklist": Array of 3-4 todos.
                - "tips": Array of 2 tips.

                JSON Format:
                {
                    "title": "...",
                    "description": "...",
                    "corePrinciple": "...",
                    "applicationMechanism": "...",
                    "researchRelevance": "...",
                    "goal": "...",
                    "checklist": [ ... ],
                    "tips": [ ... ]
                }
                `;

                const completion = await deepseek.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are an expert academic researcher. You explain complex theoretical applications clearly and logically." },
                        { role: "user", content: prompt }
                    ],
                    model: "deepseek-chat",
                    response_format: { type: "json_object" },
                });

                const content = completion.choices[0].message.content;
                if (content) return NextResponse.json(JSON.parse(content));
            }

            // Default prompt for other steps
            const prompt = `
            Provide a detailed specific guide for Step ${step} (${currentStepName}) of a high school research project on the topic: "${topic}".
            Language: Korean.
    
            Return ONLY a JSON object with:
            - "title": Title of the step.
            - "description": Explanation of what to do in this step for this specific topic.
            - "goal": The main goal of this step.
            - "checklist": Array of 3-4 specific to-do items.
            - "example": A concrete example relevant to the topic (e.g. key concepts to research, curriculum link, or activity idea).
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
            const stepTitles = ["배경 이론", "교과 연계", "탐구 실습", "보고서 작성"];
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
