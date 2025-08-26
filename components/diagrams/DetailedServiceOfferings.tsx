'use client'

import { useState } from 'react'
import { 
  ArrowRight, 
  Beaker, 
  Brain, 
  Shield, 
  Lightbulb, 
  Code, 
  Users, 
  Settings, 
  Database, 
  GitBranch, 
  Monitor, 
  Building, 
  Rocket, 
  FileSearch, 
  Cpu, 
  Cloud, 
  Lock, 
  UserCheck, 
  Calendar, 
  HeadphonesIcon,
  TrendingUp,
  Target,
  Puzzle,
  BookOpen,
  Search,
  Workflow,
  Bot,
  Link,
  Package,
  CheckCircle,
  Bug,
  Egg
} from 'lucide-react'
import { GiButterfly, GiCaterpillar } from 'react-icons/gi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function DetailedServiceOfferings() {
  const [activeTab, setActiveTab] = useState(1)

  const services = {
    1: {
      title: "labA Catalyst",
      subtitle: "촉매",
      stage: "1단계: 기반 서비스",
      badge: "The Enabler",
      description: "최소한의 리스크로 Agentic AI를 처음 도입하여, R&D 혁신의 '첫 성공 사례'를 만들어내는 단계",
      meaning: "화학 반응을 촉진하는 촉매처럼, labA가 고객의 R&D 조직에 AI 도입이라는 혁신적인 변화를 빠르고 효과적으로 일으키는 기폭제 역할을 합니다.",
      gradient: "from-blue-500 to-cyan-500",
      icon: <GiCaterpillar className="w-6 h-6" />,
      evolutionStage: "애벌레",
      evolutionDescription: "작지만 강력한 시작, 성장의 잠재력을 품은 첫 단계",
      categories: [
        {
          name: "컨설팅 서비스",
          icon: <Lightbulb className="w-5 h-5" />,
          color: "blue",
          items: [
            {
              title: "AI 기회 발굴 워크숍",
              description: "연구실의 AI 활용 가능 영역 발굴 및 로드맵 수립",
              duration: "2일",
              deliverables: ["AI 기회 맵", "투자 대비 효과 분석", "우선순위 매트릭스"],
              icon: <Search className="w-4 h-4" />
            },
            {
              title: "R&D 데이터 준비 상태 평가",
              description: "현재 데이터 인프라와 품질을 평가하고 개선 방향 제시",
              duration: "1주",
              deliverables: ["데이터 성숙도 보고서", "개선 로드맵", "데이터 거버넌스 가이드"],
              icon: <Database className="w-4 h-4" />
            },
            {
              title: "AI 도입 우선순위 과제 선정",
              description: "빠른 성과를 낼 수 있는 use case 선별 및 파일럿 계획",
              duration: "3일",
              deliverables: ["Use case 카탈로그", "파일럿 실행 계획", "성공 지표 정의"],
              icon: <Target className="w-4 h-4" />
            }
          ]
        },
        {
          name: "구현 서비스",
          icon: <Code className="w-5 h-5" />,
          color: "purple",
          items: [
            {
              title: "단일 에이전트 배포",
              description: "연구 자동화를 위한 Auto-GPT 기반 에이전트 설정",
              duration: "2주",
              deliverables: ["설정된 AI 에이전트", "사용자 매뉴얼", "초기 교육"],
              icon: <Bot className="w-4 h-4" />
            },
            {
              title: "RAG 시스템 구축",
              description: "내부 논문과 연구 자료를 활용한 지식베이스 구축",
              duration: "3주",
              deliverables: ["RAG 시스템", "지식 임베딩", "검색 인터페이스"],
              icon: <BookOpen className="w-4 h-4" />
            },
            {
              title: "워크플로우 자동화",
              description: "n8n, Make 등을 활용한 반복 작업 자동화",
              duration: "1-2주",
              deliverables: ["자동화된 워크플로우", "모니터링 대시보드", "유지보수 가이드"],
              icon: <Workflow className="w-4 h-4" />
            }
          ]
        }
      ]
    },
    2: {
      title: "labA Nexus",
      subtitle: "연결점",
      stage: "2단계: 매니지드 플랫폼",
      badge: "The Operator",
      description: "연구원들이 인프라 관리 부담 없이 핵심 연구에만 집중할 수 있도록, 완전히 관리되는 안정적이고 확장 가능한 R&D 환경 제공",
      meaning: "여러 요소가 모이는 중심점처럼, 데이터, AI 에이전트, 워크플로우, 연구원 등 R&D에 필요한 모든 것을 하나로 연결하는 중앙 허브 역할을 합니다.",
      gradient: "from-indigo-500 to-purple-500",
      icon: <Egg className="w-6 h-6" />,
      evolutionStage: "번데기",
      evolutionDescription: "내부에서 혁신이 일어나는 변화의 시기, 도약을 준비하는 단계",
      categories: [
        {
          name: "플랫폼 서비스",
          icon: <Monitor className="w-5 h-5" />,
          color: "indigo",
          items: [
            {
              title: "관리형 Agentic R&D 환경",
              description: "SaaS 기반 연구 자동화 플랫폼 제공",
              duration: "구독형",
              deliverables: ["전용 워크스페이스", "무제한 에이전트", "API 액세스"],
              icon: <Cloud className="w-4 h-4" />
            },
            {
              title: "독점 R&D 에이전트 라이브러리",
              description: "과학 연구에 특화된 사전 훈련된 에이전트 접근권",
              duration: "구독형",
              deliverables: ["50+ 전문 에이전트", "커스터마이징 도구", "정기 업데이트"],
              icon: <Package className="w-4 h-4" />
            }
          ]
        },
        {
          name: "매니지드 서비스",
          icon: <Settings className="w-5 h-5" />,
          color: "green",
          items: [
            {
              title: "MLOps 및 모델 수명주기 관리",
              description: "모델 훈련, 배포, 모니터링 전체 과정 관리",
              duration: "상시",
              deliverables: ["자동화된 파이프라인", "성능 모니터링", "A/B 테스팅"],
              icon: <GitBranch className="w-4 h-4" />
            },
            {
              title: "데이터 파이프라인 관리",
              description: "실시간 데이터 수집, 처리, 저장 인프라 운영",
              duration: "상시",
              deliverables: ["실시간 ETL", "데이터 품질 보장", "확장 가능한 아키텍처"],
              icon: <Cpu className="w-4 h-4" />
            },
            {
              title: "24/7 플랫폼 지원",
              description: "전문 엔지니어의 실시간 기술 지원",
              duration: "상시",
              deliverables: ["99.9% SLA", "전담 엔지니어", "우선 지원"],
              icon: <HeadphonesIcon className="w-4 h-4" />
            },
            {
              title: "보안 및 규정 준수 관리",
              description: "데이터 보안과 규제 준수 자동화",
              duration: "상시",
              deliverables: ["보안 감사", "규정 준수 보고서", "자동 백업"],
              icon: <Shield className="w-4 h-4" />
            }
          ]
        }
      ]
    },
    3: {
      title: "labA Vanguard",
      subtitle: "선도자",
      stage: "3단계: 전략적 혁신",
      badge: "The Partner",
      description: "고객과 하나의 팀처럼 긴밀하게 협력하여 R&D 프로세스를 근본적으로 재설계하고, 독점적인 IP를 공동 개발하여 시장을 파괴하는 혁신을 이끌어냅니다",
      meaning: "Agentic AI를 활용한 R&D 혁명의 최전선에서 업계를 이끄는 전략적 동반자. '처음부터 다시 시작'하는 과감한 접근을 통해 지속 가능한 경쟁 우위를 함께 만들어갑니다.",
      gradient: "from-purple-500 to-pink-500",
      icon: <GiButterfly className="w-6 h-6" />,
      evolutionStage: "나비",
      evolutionDescription: "완전한 변태를 거쳐 날아오른 혁신, 무한한 가능성의 실현",
      categories: [
        {
          name: "전략 자문",
          icon: <Brain className="w-5 h-5" />,
          color: "purple",
          items: [
            {
              title: "AI 네이티브 R&D 혁신 로드맵",
              description: "3-5년 장기 AI 전환 전략 수립",
              duration: "분기별",
              deliverables: ["전략 로드맵", "마일스톤 계획", "투자 계획"],
              icon: <TrendingUp className="w-4 h-4" />
            },
            {
              title: "인간-AI 협업 조직 설계",
              description: "AI와 연구원의 최적 협업 체계 구축",
              duration: "6개월",
              deliverables: ["조직 재설계", "역할 정의", "변화 관리"],
              icon: <Users className="w-4 h-4" />
            },
            {
              title: "AI 생성 IP 전략 수립",
              description: "AI 기반 발명과 특허에 대한 법률 전략",
              duration: "상시",
              deliverables: ["IP 가이드라인", "특허 전략", "라이선싱 모델"],
              icon: <Lock className="w-4 h-4" />
            }
          ]
        },
        {
          name: "공동 개발",
          icon: <Rocket className="w-5 h-5" />,
          color: "orange",
          items: [
            {
              title: "공동 연구 프로젝트",
              description: "특정 연구 과제에 대한 공동 연구 수행",
              duration: "프로젝트별",
              deliverables: ["공동 논문", "특허 출원", "상용화 계획"],
              icon: <Beaker className="w-4 h-4" />
            },
            {
              title: "맞춤형 다중 에이전트 시스템",
              description: "연구실 전용 복잡한 에이전트 시스템 설계",
              duration: "3-6개월",
              deliverables: ["커스텀 시스템", "소스 코드", "기술 이전"],
              icon: <Puzzle className="w-4 h-4" />
            },
            {
              title: "독점 모델 미세조정",
              description: "연구실 데이터로 전용 AI 모델 훈련",
              duration: "2-4개월",
              deliverables: ["전용 모델", "성능 벤치마크", "배포 지원"],
              icon: <Brain className="w-4 h-4" />
            }
          ]
        }
      ]
    }
  }

  const currentService = services[activeTab as keyof typeof services]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          단계별 상세 서비스 오퍼링
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          연구실의 현재 상황과 목표에 맞춰 선택할 수 있는 구체적인 서비스 패키지
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-col lg:flex-row gap-4 mb-12 justify-center">
        {Object.entries(services).map(([key, service]) => (
          <button
            key={key}
            onClick={() => setActiveTab(Number(key))}
            className={`
              relative px-8 py-6 rounded-2xl border-2 transition-all duration-300 transform group
              ${activeTab === Number(key) 
                ? `bg-gradient-to-r ${service.gradient} text-white border-transparent scale-105 shadow-2xl` 
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-xl'
              }
            `}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <div className={`
                  p-2 rounded-full transition-all duration-300
                  ${activeTab === Number(key) 
                    ? 'bg-white/20 scale-110' 
                    : 'bg-gray-100'
                  }
                `}>
                  {service.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">{service.title}</span>
                    <span className="text-base opacity-90">({service.subtitle})</span>
                  </div>
                  <div className="text-xs opacity-70">
                    {service.evolutionStage}: {service.evolutionDescription}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Badge 
                  variant={activeTab === Number(key) ? "secondary" : "outline"}
                  className={activeTab === Number(key) ? "bg-white/20 text-white border-white/30" : ""}
                >
                  {service.badge}
                </Badge>
                <div className="text-xs opacity-80">
                  {service.stage}
                </div>
              </div>
            </div>
            {activeTab === Number(key) && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 
                border-l-[15px] border-l-transparent 
                border-r-[15px] border-r-transparent 
                border-t-[15px] border-t-white">
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Service Details */}
      <div className="animate-fade-up">
        {/* Service Header with Meaning */}
        <div className={`bg-gradient-to-r ${currentService.gradient} rounded-2xl p-1 mb-8`}>
          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${currentService.gradient} text-white`}>
                      {currentService.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {currentService.title} 
                        <span className="text-2xl text-gray-600 ml-3">({currentService.subtitle})</span>
                      </h3>
                      <div className="flex items-center space-x-3 mt-2">
                        <Badge variant="outline" className="text-sm">{currentService.stage}</Badge>
                        <Badge variant="research" className="text-sm">{currentService.badge}</Badge>
                        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                          {currentService.evolutionStage}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 font-medium mb-4">{currentService.description}</p>
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 italic">
                <span className="font-semibold text-gray-700">이름의 의미:</span> {currentService.meaning}
              </p>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="space-y-8">
          {currentService.categories.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className={`bg-gradient-to-r from-${category.color}-50 to-${category.color}-100 px-6 py-4 border-b border-${category.color}-200`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                    {category.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">{category.name}</h4>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="hover:shadow-lg transition-all duration-300 border-gray-200 overflow-hidden group">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            {item.icon}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.duration}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="text-sm mt-2">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">산출물</p>
                          <ul className="space-y-1">
                            {item.deliverables.map((deliverable, delIndex) => (
                              <li key={delIndex} className="flex items-start text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            어떤 서비스가 우리 연구실에 맞을까요?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            연구실의 현재 상황과 목표를 분석하여 최적의 서비스 조합을 추천해 드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="research" size="lg" className="group">
              무료 컨설팅 신청
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="research-outline" size="lg">
              서비스 카탈로그 다운로드
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}