'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle,
  Brain,
  Code,
  Users,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const servicePlans = [
  {
    id: 'research-planning',
    name: '연구기획',
    badge: 'Planning',
    description: '과제공고 모니터링과 R&D 동향 분석으로 기획을 지원합니다',
    gradient: 'from-[#2E6B9E] to-[#3a7db0]',
    features: [
      { text: 'R&D 과제공고 모니터링', included: true, detail: '정부·공공기관 과제공고 일일 브리핑' },
      { text: 'ODA 사업동향 분석', included: true, detail: '해양·환경 ODA 프로젝트 동향' },
      { text: '이메일 브리핑 (주 5회)', included: true, detail: '화~토 오전 자동 발송' },
      { text: '키워드 맞춤 필터링', included: true, detail: '관심 분야 키워드 설정' },
      { text: '주간 인사이트 리포트', included: true, detail: '매주 월요일 심층 R&D 동향' },
    ],
    cta: '상담 신청',
    popular: false,
  },
  {
    id: 'research-admin',
    name: '연구행정',
    badge: 'Administration',
    description: '법률·규제 추적과 기획지원으로 행정 부담을 줄입니다',
    gradient: 'from-[#1B3A5C] to-[#2E6B9E]',
    features: [
      { text: '연구기획 서비스 전체 포함', included: true, detail: '과제공고, 브리핑, 인사이트 등' },
      { text: '법률·규제 동향 추적', included: true, detail: '해양·환경 법률 개정 및 규제 변화 모니터링' },
      { text: '연구과제 기획지원', included: true, detail: 'RFP 분석, 유사과제 조사, 연구 트렌드 기반 기획' },
      { text: '보고서 자동 작성', included: true, detail: 'AI 기반 연구 보고서 초안 생성' },
      { text: '기획서 초안 생성', included: true, detail: 'AI가 RFP 기반 기획서 초안 작성' },
    ],
    cta: '상담 신청',
    popular: true,
  },
  {
    id: 'business-automation',
    name: '업무자동화',
    badge: 'Automation',
    description: '문서 변환, 시각화, AI 브리핑 등 반복 업무를 자동화합니다',
    gradient: 'from-[#D4A52D] to-[#b8912a]',
    features: [
      { text: '문서 변환 자동화', included: true, detail: 'HWP·DOCX·PDF 간 자동 변환' },
      { text: '시각화 자동 생성', included: true, detail: '데이터 기반 차트·다이어그램 생성' },
      { text: 'AI 브리핑 서비스', included: true, detail: '맞춤형 정보 수집·요약·발송' },
      { text: '데이터 수집·정리', included: true, detail: '웹·DB·API 데이터 자동 수집 및 정형화' },
      { text: '맞춤형 AI 에이전트', included: true, detail: '업무 특성에 맞는 전용 에이전트 구축' },
    ],
    cta: '상담 신청',
    popular: false,
  },
]

const additionalServices = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: '맞춤형 AI 에이전트 개발',
    description: '연구수행·기획·행정·업무 특화 AI 에이전트를 설계·구축합니다.',
    pricing: '별도 협의',
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: '연구 자동화 플랫폼',
    description: 'Agentic AI 기반 연구 워크플로우 자동화 플랫폼을 구축합니다.',
    pricing: '별도 협의',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'AI 도입 컨설팅',
    description: '조직의 AI 활용 가능 영역을 분석하고 도입 로드맵을 수립합니다.',
    pricing: '별도 협의',
  },
]

export default function DetailedServiceOfferings() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          서비스 안내
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          조직의 니즈에 맞는 AI 서비스를 구성합니다. 상담을 통해 최적의 솔루션을 제안해 드립니다.
        </p>
      </div>

      {/* Service Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {servicePlans.map((plan) => (
          <div
            key={plan.id}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
            className={`relative rounded-2xl transition-all duration-300 ${
              plan.popular
                ? 'ring-2 ring-[#1B3A5C] scale-105 shadow-2xl'
                : hoveredPlan === plan.id
                  ? 'shadow-xl scale-[1.02]'
                  : 'shadow-lg'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-[#D4A52D] text-white px-4 py-1 text-sm font-bold shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  추천
                </Badge>
              </div>
            )}

            <div className={`bg-gradient-to-r ${plan.gradient} rounded-t-2xl p-6 text-white`}>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-3">
                {plan.badge}
              </Badge>
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm opacity-90 mb-4">{plan.description}</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">맞춤 견적</span>
                <span className="text-sm ml-2 opacity-90">상담 후 안내</span>
              </div>
            </div>

            <div className="bg-white rounded-b-2xl p-6">
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    {feature.included ? (
                      <CheckCircle className="w-5 h-5 text-[#2E6B9E] mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-200 rounded-full mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <span className={`text-sm ${feature.included ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                      {feature.included && feature.detail && (
                        <p className="text-xs text-gray-500 mt-0.5">{feature.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'research' : 'research-outline'}
                className="w-full group"
                size="lg"
                asChild
              >
                <a href="#contact">
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Services */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          플랫폼 개발 &amp; 컨설팅
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalServices.map((service, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#1B3A5C]/10 rounded-lg flex items-center justify-center text-[#1B3A5C]">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">{service.pricing}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#1B3A5C]/5 to-[#2E6B9E]/5 rounded-2xl border border-[#1B3A5C]/20 p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          어떤 서비스가 적합할지 고민되시나요?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          조직의 니즈를 분석하여 최적의 서비스 조합을 추천해 드립니다. 무료 상담을 신청하세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="research" size="lg" className="group" asChild>
            <a href="#contact">
              무료 상담 신청
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
