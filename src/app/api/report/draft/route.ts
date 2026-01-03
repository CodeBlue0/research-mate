import { NextResponse } from 'next/server';
import { deepseek } from '@/lib/deepseek';

export async function POST(request: Request) {
    try {
        const { topic } = await request.json();

        const apiKey = process.env.DEEPSEEK_API_KEY;
        const shouldUseRealApi = !!apiKey && apiKey.length > 0 && apiKey !== 'dummy-key';

        let data = null;

        if (shouldUseRealApi) {
            const prompt = `
            You are a helpful academic research assistant for high school students.
            Write a draft for a research inquiry report on the topic: "${topic}".
            
            The report should have 4 sections:
            1. Introduction (research motive, hypothesis)
            2. Methods (experimental design, procedure)
            3. Results (expected or simulated data analysis)
            4. Conclusion (summary of findings, connection to hypothesis)

            Language: Korean (Academic tone).

            Return ONLY a JSON object with the following fields:
            {
                "introduction": "...",
                "methods": "...",
                "results": "...",
                "conclusion": "..."
            }
            `;

            const completion = await deepseek.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a helpful academic assistant. Respond in JSON format." },
                    { role: "user", content: prompt }
                ],
                model: "deepseek-chat",
                response_format: { type: "json_object" },
            });

            const content = completion.choices[0].message.content;
            console.log("DeepSeek Draft Content:", content);

            if (content) {
                const cleanContent = content.replace(/```json\n?|```/g, '').trim();
                try {
                    data = JSON.parse(cleanContent);
                } catch (parseError) {
                    console.error("JSON Parse Error:", parseError);
                }
            }
        }

        // Fallback Mock Data if API fails or is not configured
        if (!data) {
            console.log("Using Mock Data for Draft");
            data = {
                introduction: `본 연구는 '${topic}'에 대한 심층적인 탐구를 목적으로 한다. 현상에 대한 이론적 배경을 바탕으로 가설을 설정하고, 이를 검증하기 위한 과학적 접근 방법을 모색하였다.`,
                methods: "관련 문헌 조사를 통해 기존 이론을 분석하고, 가설 검증을 위해 설계된 실험(또는 시뮬레이션)을 수행하였다. 데이터 수집은 정량적 방법을 위주로 진행되었으며, 변인 통제에 유의하였다.",
                results: "실험 결과, 초기 가설과 부합하는 경향성이 관찰되었다. 구체적으로 독립변수의 변화에 따라 종속변수가 유의미하게 변화함을 확인하였으며, 이를 그래프와 표로 정리하였다.",
                conclusion: "본 탐구를 통해 주제에 대한 과학적 원리를 확인할 수 있었다. 연구 결과는 가설을 지지하며, 향후 더 정교한 통제 변인을 적용한 후속 연구가 필요함을 시사한다."
            };
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("Report Draft Gen Error:", error);
        return NextResponse.json({ error: "Failed to generate draft" }, { status: 500 });
    }
}
