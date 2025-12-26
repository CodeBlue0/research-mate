"use client";

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Star, FileText, Users, ThumbsUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMindMap } from '@/context/MindMapContext';

export default function LandingPage() {
  const router = useRouter();
  const { setHistoryRoot, setCurrentNode, setSeenTopics } = useMindMap();

  // Reset Mind Map State when visiting Landing Page (New Session)
  useEffect(() => {
    setHistoryRoot(null);
    setCurrentNode(null);
    setSeenTopics([]);
  }, [setHistoryRoot, setCurrentNode, setSeenTopics]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-2">
                생기부 완벽 대비
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-slate-900">
                심화 보고서 주제,<br />
                이제 <span className="text-blue-600">쉽게 찾으세요</span>
              </h1>
              <p className="text-gray-500 md:text-xl max-w-[600px]">
                학년, 과목, 관심사에 맞춘 AI 기반 추천 서비스로 당신만의 경쟁력을 만드세요.
                수행평가부터 세특까지, 막막했던 주제 선정을 도와드립니다.
              </p>
              <div className="flex gap-3 pt-4">
                <Button size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/subject')}>
                  주제 추천받기
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                  이용 가이드
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                <div className="flex -space-x-2">
                  <Avatar className="w-8 h-8 border-2 border-white"><AvatarFallback>U1</AvatarFallback></Avatar>
                  <Avatar className="w-8 h-8 border-2 border-white"><AvatarFallback>U2</AvatarFallback></Avatar>
                  <Avatar className="w-8 h-8 border-2 border-white"><AvatarFallback>U3</AvatarFallback></Avatar>
                </div>
                <p>이미 <span className="font-bold text-black">5,000+</span> 명의 학생들이 사용 중</p>
              </div>
            </div>
            <div className="flex justify-center">
              {/* Illustration Placeholder */}
              <div className="relative w-full max-w-[500px] aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-purple-100/50" />
                <img
                  src="/placeholder-hero.png"
                  alt="Students studying together"
                  className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <FileText className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">15,000+</h3>
              <p className="text-gray-500">누적 추천 주제</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">5,200+</h3>
              <p className="text-gray-500">이용 학생 수</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                  <ThumbsUp className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">98%</h3>
              <p className="text-gray-500">사용자 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">어떻게 작동하나요?</h2>
            <p className="text-gray-500">단 3단계로 끝나는 심화 탐구 주제 선정 프로세스를 경험해보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '1. 관심 분야 입력', desc: '희망하는 과목, 진로 분야, 그리고 평소 관심있는 키워드를 간단히 입력하세요.', icon: '📝' },
              { title: '2. 교과 과정 분석', desc: '최신 교육과정 성취 기준과 입력하신 데이터를 분석하여 연계성을 파악합니다.', icon: '📊' },
              { title: '3. 맞춤 주제 도출', desc: '남들과 다른 차별화된 심화 탐구 주제 리스트와 탐구 가이드를 제공합니다.', icon: '💡' },
            ].map((step, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">학생들의 실제 후기</h2>
            <p className="text-gray-500">TopicGen과 함께 성공적인 입시 결과를 만들어가는 학생들의 이야기입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: '김민수 (고2)', text: '"막막했던 생기부 주제, 여기서 찾고 세특 꽉 채웠어요! 추천해주신 주제가 선생님께서도 참신하다고 칭찬해주셨습니다."', stars: 5 },
              { name: '이서연 (고1)', text: '"관심사는 있는데 어떤 주제로 보고서를 써야할지 몰랐는데, 구체적인 방향을 잡아줘서 정말 좋았어요."', stars: 5 },
              { name: '박준호 (중3)', text: '"수행평가 주제 정하기 너무 힘들었는데 덕분에 시간 아꼈습니다. 친구들에게도 추천하고 있어요. 강추합니다!"', stars: 4 },
            ].map((review, idx) => (
              <Card key={idx} className="border-none shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`} />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">2일 전</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.stars ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">지금 바로 나만의 주제를 찾아보세요</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">입시 준비, 더 이상 혼자 고민하지 마세요. TopicGen이 함께합니다.</p>
          <Button variant="secondary" size="lg" className="h-14 px-10 text-lg font-bold" onClick={() => router.push('/subject')}>
            무료로 주제 추천받기
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t text-sm text-gray-500">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="font-bold text-lg text-slate-800">TopicGen</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black">이용약관</a>
            <a href="#" className="hover:text-black">개인정보처리방침</a>
            <a href="#" className="hover:text-black">고객센터</a>
          </div>
          <div className="mt-4 md:mt-0">
            © 2024 TopicGen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
