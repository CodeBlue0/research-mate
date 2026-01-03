import { NextResponse } from 'next/server';
import { deepseek } from '@/lib/deepseek';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { topic, step, context } = body;

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
                   - This section is the **CORE BODY** of the student's report. It must be extremely detailed (approx. 400-500 words).
                   - **Structure**:
                     - **(1) Curriculum Connection**: Explicitly explain how high school/middle school curriculum concepts (e.g., Newton's Laws, Chemical Bonds) apply to this topic.
                     - **(2) Scientific Explanation of Topic**: Provide a deep scientific explanation of the chosen topic itself.
                     - **(3) Detailed Mechanism**: Explain the step-by-step physical/chemical/logical process of the phenomenon.
                   - Use a professional, academic tone suitable for a high-quality research report.
                3. **Research Relevance**: Explain WHY this connection is important for the student's specific research goal.

                Return ONLY a JSON object with:
                - "title": "원리 적용 및 심화 확장"
                - "description": Intro emphasizing reference to Step 1.
                - "corePrinciple": "Name and definition of the key principle."
                - "applicationMechanism": "Comprehensive, multi-paragraph text covering Curriculum, Topic, and Mechanism..."
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
                        { role: "system", content: "You are an expert academic researcher. You explain complex theoretical applications clearly and logically, acting as a supervisor for a high-level student report." },
                        { role: "user", content: prompt }
                    ],
                    model: "deepseek-chat",
                    response_format: { type: "json_object" },
                });

                const content = completion.choices[0].message.content;
                if (content) return NextResponse.json(JSON.parse(content));
            }

            if (step === 3) {
                // Specific prompt for Step 3: Practical Activity (Experimental Design)
                const prompt = `
                Provide a highly detailed "Experimental Design Guide" for Step 3 of a research project on: "${topic}".
                Language: Korean.

                This guide should help the student conduct a valid scientific experiment or simulation.

                Return ONLY a JSON object with:
                - "title": "탐구 실험 설계"
                - "description": "Intro..."
                - "experiment": {
                    "hypothesis": "Clear hypothesis statement.",
                    "variables": {
                        "independent": "What to change",
                        "dependent": "What to measure",
                        "controlled": "What to keep constant"
                    },
                    "materials": ["Item 1", "Item 2", ...],
                    "procedure": ["Step 1", "Step 2", ...]
                }
                - "goal": Goal.
                - "checklist": Array of 3 todos.
                - "tips": Array of 2 tips.

                JSON Format:
                {
                    "title": "...",
                    "description": "...",
                    "experiment": {
                        "hypothesis": "...",
                        "variables": { "independent": "...", "dependent": "...", "controlled": "..." },
                        "materials": ["...", "..."],
                        "procedure": ["...", "..."]
                    },
                    "goal": "...",
                    "checklist": [ ... ],
                    "tips": [ ... ]
                }
                `;

                const completion = await deepseek.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a methodologically strict science teacher. You ensure experiments are valid and reproducible." },
                        { role: "user", content: prompt }
                    ],
                    model: "deepseek-chat",
                    response_format: { type: "json_object" },
                });

                const content = completion.choices[0].message.content;
                if (content) return NextResponse.json(JSON.parse(content));
            }

            if (step === 4) {
                // Step 4: Report Writing (Auto-Drafting)
                const step1 = context?.step1 || "";
                const step2 = context?.step2 || "";
                const step3 = context?.step3 || "";

                const prompt = `
                Write a **Highly Professional & Academic Research Report Draft** for a high school student's inquiry project on: "${topic}".
                Language: Korean.

                **Context from Previous Steps**:
                [Step 1: Background Theory (Contains Formulas)]
                ${JSON.stringify(step1).slice(0, 1500)}

                [Step 2: Core Principles & Mechanism]
                ${JSON.stringify(step2).slice(0, 1500)}

                [Step 3: Practical Activity]
                ${JSON.stringify(step3).slice(0, 800)}

                **CRITICAL REQUIREMENTS (Must Follow)**:
                1. **Professional Depth**: The report MUST read like a university-level paper or a high-quality guidebook. Avoid vague qualitative descriptions.
                2. **Include Formulas**: You **MUST** include specific mathematical formulas, chemical equations, or derivation steps from Step 1/Step 2. (e.g., F = ma, PV = nRT, integrals).
                3. **Quantitative Logic**: In the Body, explain the phenomenon using logic and variables (e.g., "As variable X increases, Y changes according to equation Z...").
                4. **Explicit Analysis**: Do not just summarize; analyze the theoretical mechanism.

                **Required Sections**:
                1. **Introduction (서론)**: 
                   - Motivation & Purpose.
                   - **Theoretical Background**: Integrate the **Advanced Concepts** and **Formulas** from Step 1. Don't just list them; explain them in depth.
                   
                2. **Body (본론)**: 
                   - **Method**: How the inquiry was designed.
                   - **Results & Analysis**: 
                     - Synthesize the "Mechanism" from Step 2.
                     - **Include specific calculation processes or theoretical derivation** relevant to the topic.
                     - If actual data is missing, describe the *theoretical* expected values and how to calculate them using the formulas.
                
                3. **Conclusion (결론)**: 
                   - Summary of findings.
                   - Academic significance and future development.

                Return ONLY a JSON object with:
                - "title": "전문가 수준의 탐구 보고서 초안"
                - "description": "수식과 전문적인 이론이 포함된 심화 보고서 초안입니다."
                - "draft": {
                    "introduction": "Full text...",
                    "body": "Full text... (MUST include formulas)",
                    "conclusion": "Full text..."
                }
                - "checklist": Array of 3 checks.
                - "tips": Array of 2 tips.

                JSON Format:
                {
                    "title": "...",
                    "description": "...",
                    "draft": {
                        "introduction": "...",
                        "body": "...",
                        "conclusion": "..."
                    },
                    "checklist": [ ... ],
                    "tips": [ ... ]
                }
                `;

                const completion = await deepseek.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a stringent academic supervisor. You Demand rigor, mathematical precision, and deep theoretical analysis. You hate vague explanations." },
                        { role: "user", content: prompt }
                    ],
                    model: "deepseek-chat",
                    response_format: { type: "json_object" },
                });

                const content = completion.choices[0].message.content;
                if (content) return NextResponse.json(JSON.parse(content));
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
