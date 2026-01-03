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
            console.log("DeepSeek Raw Content:", content); // Debug log

            if (content) {
                // Strip markdown code blocks if present ( ```json ... ``` )
                const cleanContent = content.replace(/```json\n?|```/g, '').trim();
                try {
                    data = JSON.parse(cleanContent);
                } catch (parseError) {
                    console.error("JSON Parse Error:", parseError);
                    console.log("Failed Content:", cleanContent);
                }
            }
        }

        if (!data) {
            console.log("Using Mock Data for Report Blueprint");
            // Define Mocks for specific topics
            const MOCK_DB: Record<string, any> = {
                "동전 던지기 시뮬레이션": {
                    title: "큰 수의 법칙과 몬테카를로 시뮬레이션",
                    subTitle: "Python을 활용한 확률 수렴성 시각화 연구",
                    summary: "본 탐구는 **'동전을 많이 던질수록(n → ∞) 그 평균은 수학적 확률(0.5)에 수렴한다'**는 큰 수의 법칙을 컴퓨터 시뮬레이션으로 직접 검증하는 프로젝트입니다. \n\n단순한 수식 계산을 넘어, **Python 라이브러리(NumPy, Matplotlib)**를 활용하여 시행 횟수에 따른 오차율 감소를 시각화함으로써 '통계적 확률'과 '수학적 확률'의 관계를 명확히 이해할 수 있습니다.",
                    mainImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop", // Math/Code image
                    coreConcepts: [
                        {
                            name: "큰 수의 법칙 (LLN)",
                            description: "표본의 크기가 커질수록 표본평균이 모평균에 가까워지는 확률론의 기본 정리를 탐구합니다.",
                            image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2070&auto=format&fit=crop"
                        },
                        {
                            name: "몬테카를로 방법",
                            description: "난수를 이용하여 함수의 값을 확률적으로 계산하는 알고리즘으로, 금융/물리 등 다양한 분야의 기초가 됩니다.",
                            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                        }
                    ],
                    curriculum: [
                        { name: "확률과 통계", description: "통계적 추정과 정규분포 단원의 심화 학습" },
                        { name: "정보 (프로그래밍)", description: "Python 반복문과 라이브러리 활용 역량 강화" }
                    ],
                    inquiryGuide: [
                        "이항분포 B(n, p)가 n이 커질수록 정규분포 N(np, npq)에 근사함을 조사합니다.",
                        "교과서 속 '큰 수의 법칙' 개념이 실제 데이터 분석에서 어떻게 쓰이는지 사례를 찾습니다.",
                        "Python Colab 환경을 구축하고 `numpy.random` 모듈로 동전 던지기 코드를 작성합니다.",
                        "시행 횟수(10, 100, 10000번)에 따른 그래프 변화를 캡처하여 보고서를 완성합니다."
                    ],
                    references: ["확률의 개념과 응용 (2023, 김통계)", "파이썬으로 배우는 통계학 (2024)"]
                }
            };

            // Enhanced Fallback (Solar Panel default or generic)
            const fallback = {
                title: `${topic || '태양광 패널'}의 효율성 분석`,
                subTitle: "환경 변수에 따른 에너지 생산량 변화 연구",
                summary: "**태양광 발전**은 친환경 에너지의 핵심이지만, 온도와 입사각 등 환경 변수에 민감하게 반응합니다. \n\n이 프로젝트는 실제 또는 가상의 실험 데이터를 바탕으로 **'최적의 발전 조건'**을 도출해내는 과정을 담고 있습니다. 물리적 이론과 데이터 분석 역량을 동시에 보여줄 수 있는 훌륭한 주제입니다.",
                mainImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2073&auto=format&fit=crop",
                coreConcepts: [
                    {
                        name: "광전 효과",
                        description: "빛 에너지가 전기 에너지로 변환되는 양자역학적 원리를 이해합니다.",
                        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop"
                    },
                    {
                        name: "반도체 밴드갭",
                        description: "온도 상승이 반도체의 효율을 떨어뜨리는 물리적 이유를 탐구합니다.",
                        image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop"
                    }
                ],
                curriculum: [
                    { name: "물리학 I", description: "물질과 전자기장 - 에너지 띠와 반도체" },
                    { name: "통합과학", description: "발전과 신재생 에너지" }
                ],
                inquiryGuide: [
                    "광전 효과와 반도체 P-N 접합의 원리를 문헌 조사를 통해 정리합니다.",
                    "물리학 교과의 '에너지 띠 이론'과 연결하여 효율 저하 원인을 가설로 세웁니다.",
                    "가열판과 조도계를 이용해 온도별/조도별 전압(V) 변화를 측정합니다.",
                    "엑셀로 V-I 그래프를 그리고 최대 전력점(MPP)의 이동을 분석합니다."
                ],
                references: ["신재생 에너지 데이터북 (2024)", "IEEE Photovoltaic Specialists Conference"]
            };

            data = topic && MOCK_DB[topic] ? MOCK_DB[topic] : fallback;
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
