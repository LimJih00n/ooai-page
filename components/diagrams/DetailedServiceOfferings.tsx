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

const subscriptionPlans = [
  {
    id: 'basic',
    name: '기본',
    price: '30',
    unit: '만원/월',
    badge: 'Starter',
    description: '핵심 정보분석으로 업무 효율을 높이세요',
    gradient: 'from-[#2E6B9E] to-[#3a7db0]',
    features: [
      { text: 'R&D 과제공고 브리핑', included: true, detail: '정부·공공기관 과제공고 일일 모니터링' },
      { text: 'ODA 사업동향 브리핑', included: true, detail: '해양·환경 ODA 프로젝트 동향' },
      { text: '이메일 브리핑 (주 5회)', included: true, detail: '화~토 오전 자동 발송' },
      { text: '키워드 맞춤 필터링', included: true, detail: '관심 분야 키워드 최대 10개' },
      { text: '법률·규제 동향', included: false },
      { text: '금융시황 보고서', included: false },
      { text: '주간 인사이트 리포트', included: false },
    ],
    cta: '기본 플랜 시작',
    popular: false,
  },
  {
    id: 'standard',
    name: '표준',
    price: '45',
    unit: '만원/월',
    badge: 'Popular',
    description: '법률·규제까지 포괄하는 종합 정보분석',
    gradient: 'from-[#1B3A5C] to-[#2E6B9E]',
    features: [
      { text: 'R&D 과제공고 브리핑', included: true, detail: '정부·공공기관 과제공고 일일 모니터링' },
      { text: 'ODA 사업동향 브리핑', included: true, detail: '해양·환경 ODA 프로젝트 동향' },
      { text: '이메일 브리핑 (주 5회)', included: true, detail: '화~토 오전 자동 발송' },
      { text: '키워드 맞춤 필터링', included: true, detail: '관심 분야 키워드 최대 30개' },
      { text: '법률·규제 동향', included: true, detail: '해양·환경 법률 개정 및 규제 변화 추적' },
      { text: '금융시황 보고서', included: false },
      { text: '주간 인사이트 리포트', included: false },
    ],
    cta: '표준 플랜 시작',
    popular: true,
  },
  {
    id: 'premium',
    name: '프리미엄',
    price: '65',
    unit: '만원/월',
    badge: 'Premium',
    description: '금융시황까지 포함한 올인원 비즈니스 인텔리전스',
    gradient: 'from-[#D4A52D] to-[#b8912a]',
    features: [
      { text: 'R&D 과제공고 브리핑', included: true, detail: '정부·공공기관 과제공고 일일 모니터링' },
      { text: 'ODA 사업동향 브리핑', included: true, detail: '해양·환경 ODA 프로젝트 동향' },
      { text: '이메일 브리핑 (주 5회)', included: true, detail: '화~토 오전 자동 발송' },
      { text: '키워드 맞춤 필터링', included: true, detail: '관심 분야 키워드 무제한' },
      { text: '법률·규제 동향', included: true, detail: '해양·환경 법률 개정 및 규제 변화 추적' },
      { text: '금융시황 보고서', included: true, detail: '국내외 시장 동향, 환율, 원자재 일일 분석' },
      { text: '주간 인사이트 리포트', included: true, detail: '매주 월요일 심층 투자 인사이트' },
    ],
    cta: '프리미엄 플랜 시작',
    popular: false,
  },
]

const additionalServices = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: '맞춤형 AI 에이전트 개발',
    description: '기관·기업 특화 정보분석 에이전트를 설계·구축합니다.',
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
          서비스 가격 안내
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          필요에 맞는 정보분석 서비스를 선택하세요. 모든 플랜은 월 단위 구독입니다.
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {subscriptionPlans.map((plan) => (
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
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-lg ml-2 opacity-90">{plan.unit}</span>
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
              >
                {plan.cta}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
