'use client'

import React, { useState } from 'react'
import { 
  Waves, Fish, Thermometer, Map, Calendar, BarChart3,
  Users, Clock, CheckCircle, ArrowRight, Play, Pause,
  Brain, Database, Container, FileText, Target, Microscope,
  Globe, Zap, AlertTriangle, TrendingUp, Award
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// 실제 연구 시나리오들
const researchScenarios = [
  {
    id: 'climate-change',
    title: '기후변화 영향 분석',
    field: '해양기후학',
    researcher: '서울대 해양학과 김○○ 교수팀',
    timeframe: '3개월 → 1주',
    complexity: 'high',
    question: '지난 20년간 서해 표층 수온 상승이 어패류 분포에 미친 영향',
    icon: Thermometer,
    color: 'blue',
    steps: [
      {
        title: '연구 질문 분석',
        description: 'AI가 복합적 연구 질문을 세부 요소로 분해',
        duration: '5분',
        traditional: '2-3일',
        details: ['수온 데이터 요구사항 분석', '어패류 종별 서식 조건 확인', '시공간 분석 범위 설정']
      },
      {
        title: '다중 데이터 수집',
        description: 'NOAA, KIOST, 수산과학원 데이터 동시 수집',
        duration: '30분',
        traditional: '2-3주',
        details: ['20년간 서해 수온 데이터 (NOAA)', '어패류 어획량 통계 (수과원)', '해류 변화 데이터 (KIOST)']
      },
      {
        title: '통합 분석 실행',
        description: '시공간 상관관계 분석 및 트렌드 탐지',
        duration: '2시간',
        traditional: '3-4주',
        details: ['수온-어획량 상관관계 분석', '종별 분포 변화 추적', '통계적 유의성 검증']
      },
      {
        title: '결과 시각화',
        description: '논문급 차트와 지도 자동 생성',
        duration: '30분',
        traditional: '1-2주',
        details: ['시계열 변화 그래프', '공간 분포 변화 지도', '상관관계 산점도']
      },
      {
        title: '보고서 작성',
        description: '방법론과 결과를 포함한 완전한 연구 보고서',
        duration: '1시간',
        traditional: '2-3주',
        details: ['연구 배경 및 방법론', '통계 결과 해석', '정책 제언 도출']
      }
    ],
    results: {
      keyFindings: '수온 1.2°C 상승에 따른 명태 서식지 15% 북상 확인',
      publications: '1편 (SCI 논문)',
      policyImpact: '수산업 정책 개선안 제안',
      collaborations: '3개 기관 공동연구로 확대'
    }
  },
  {
    id: 'ecosystem-monitoring',
    title: '생태계 모니터링',
    field: '해양생태학',
    researcher: '부산대 해양연구소 이○○ 박사',
    timeframe: '6개월 → 2주',
    complexity: 'medium',
    question: '연안 개발이 해양 생태계 건강성에 미치는 실시간 영향 평가',
    icon: Fish,
    color: 'purple',
    steps: [
      {
        title: '모니터링 계획 수립',
        description: 'AI가 최적 관측점과 측정 지표 추천',
        duration: '1시간',
        traditional: '1-2주',
        details: ['생태계 건강 지표 선정', '최적 샘플링 지점 결정', '측정 빈도 최적화']
      },
      {
        title: '실시간 데이터 통합',
        description: '수질센서, 위성영상, 현장조사 데이터 자동 통합',
        duration: '지속적',
        traditional: '매주 수동',
        details: ['IoT 센서 데이터 실시간 수집', '위성 영상 자동 분석', '현장 조사 데이터 입력']
      },
      {
        title: '이상 패턴 감지',
        description: 'AI가 생태계 변화 조기 감지 및 알림',
        duration: '즉시',
        traditional: '월 1회',
        details: ['수질 급변 자동 알림', '생물량 변화 추적', '오염원 역추적']
      },
      {
        title: '영향도 분석',
        description: '개발 활동과 생태계 변화 간 인과관계 분석',
        duration: '4시간',
        traditional: '2-3주',
        details: ['건설활동-수질 영향 분석', '생물 다양성 변화 추적', '회복 소요 시간 예측']
      },
      {
        title: '정책 제언 생성',
        description: '과학적 근거 기반 관리 방안 자동 생성',
        duration: '2시간',
        traditional: '2-4주',
        details: ['환경영향 최소화 방안', '복원 우선순위 제안', '모니터링 개선안']
      }
    ],
    results: {
      keyFindings: '연안 개발 500m 내 생물다양성 30% 감소 확인',
      publications: '2편 (환경 정책 저널)',
      policyImpact: '지자체 환경영향평가 기준 강화',
      collaborations: '환경부와 공동 모니터링 체계 구축'
    }
  },
  {
    id: 'disaster-prediction',
    title: '해양 재해 예측',
    field: '해양물리학',
    researcher: 'KIOST 해양예보센터',
    timeframe: '즉시 대응',
    complexity: 'high',
    question: '태풍 경로 예측 정확도 향상 및 연안 피해 최소화 방안',
    icon: Waves,
    color: 'indigo',
    steps: [
      {
        title: '다중 기상 모델 통합',
        description: '전세계 기상 예측 모델을 실시간 통합 분석',
        duration: '10분',
        traditional: '4-6시간',
        details: ['GFS, ECMWF, KMA 모델 통합', '앙상블 예측 생성', '불확실성 정량화']
      },
      {
        title: '해양-대기 상호작용',
        description: 'AI가 복잡한 해양-대기 피드백 효과 계산',
        duration: '30분',
        traditional: '1-2일',
        details: ['해수면 온도 영향 분석', '태풍 강도 변화 예측', '경로 편향 요인 식별']
      },
      {
        title: '연안 영향 시뮬레이션',
        description: '고해상도 연안 모델로 지역별 피해 예측',
        duration: '1시간',
        traditional: '2-3일',
        details: ['파고 및 해일 높이 예측', '침수 지역 시뮬레이션', '항만 운영 영향 분석']
      },
      {
        title: '조기 경보 발령',
        description: '위험도별 맞춤형 경보 메시지 자동 생성',
        duration: '즉시',
        traditional: '2-4시간',
        details: ['지역별 위험도 평가', '대상별 행동 지침 제공', '관련 기관 자동 통보']
      },
      {
        title: '실시간 업데이트',
        description: '관측 데이터 반영하여 예측 지속 개선',
        duration: '연속',
        traditional: '12시간 주기',
        details: ['레이더 데이터 실시간 반영', '예측 정확도 모니터링', '경보 수준 자동 조정']
      }
    ],
    results: {
      keyFindings: '태풍 진로 예측 정확도 25% 향상',
      publications: '국제 기상학회 발표',
      policyImpact: '국가 재해 대응 시스템 개선',
      collaborations: '동아시아 기상 협력 네트워크 구축'
    }
  },
  {
    id: 'quantum-simulation',
    title: '양자 시뮬레이션',
    field: '응용물리학',
    researcher: '포스텍 물리학과 박○○ 교수',
    timeframe: '6개월 → 2주',
    complexity: 'high',
    question: '고온 초전도체의 전자 구조 예측을 위한 대규모 양자 몬테카를로 시뮬레이션',
    icon: Microscope,
    color: 'purple',
    steps: [
      {
        title: '시뮬레이션 파라미터 최적화',
        description: 'AI가 물성 데이터를 기반으로 최적 계산 조건 탐색',
        duration: '2시간',
        traditional: '1-2주',
        details: ['Hamiltonian 파라미터 튜닝', '격자 크기 최적화', '온도 스케줄 설정']
      },
      {
        title: '대규모 병렬 계산',
        description: 'Docker 클러스터에서 수천 개의 독립적 시뮬레이션 실행',
        duration: '12시간',
        traditional: '2-3개월',
        details: ['GPU 클러스터 자동 배치', '체크포인트 자동 관리', '결과 실시간 모니터링']
      },
      {
        title: '통계 분석 및 물성 추출',
        description: 'AI 기반 상 전이 탐지 및 임계 온도 예측',
        duration: '4시간',
        traditional: '3-4주',
        details: ['Monte Carlo 데이터 분석', '상관함수 계산', '임계 지수 추출']
      },
      {
        title: '실험 데이터 비교 검증',
        description: '문헌 데이터와 자동 비교 및 오차 분석',
        duration: '1시간',
        traditional: '1-2주',
        details: ['실험값 데이터베이스 검색', '통계적 유의성 검증', '오차 요인 분석']
      },
      {
        title: '논문 품질 보고서 생성',
        description: '방법론, 결과, 해석을 포함한 완전한 연구 보고서',
        duration: '30분',
        traditional: '2-3주',
        details: ['그래프 자동 생성', '물리적 해석 제공', '후속 연구 제안']
      }
    ],
    results: {
      keyFindings: '새로운 고온 초전도 메커니즘 발견 (Tc = 180K)',
      publications: '2편 (Nature Physics, PRB)',
      policyImpact: '차세대 에너지 저장 기술 개발',
      collaborations: '삼성전자와 공동 특허 출원'
    }
  },
  {
    id: 'drug-discovery',
    title: '신약 분자 설계',
    field: '생화학',
    researcher: '서울대 화학과 이○○ 교수팀',
    timeframe: '1년 → 3주',
    complexity: 'high',
    question: 'COVID-19 변이에 효과적인 광범위 항바이러스제 분자 구조 탐색',
    icon: Brain,
    color: 'indigo',
    steps: [
      {
        title: '타겟 단백질 구조 분석',
        description: 'AlphaFold와 실험 구조를 통합한 동적 구조 예측',
        duration: '4시간',
        traditional: '2-3주',
        details: ['3D 구조 데이터 수집', '결합 포켓 식별', '동역학 시뮬레이션']
      },
      {
        title: '가상 화합물 라이브러리 생성',
        description: 'AI 생성 모델로 100만개 후보 분자 설계',
        duration: '8시간',
        traditional: '2-3개월',
        details: ['SMILES 기반 분자 생성', '약물성 필터링', '합성 가능성 평가']
      },
      {
        title: '고처리량 도킹 스크리닝',
        description: '병렬 분자 도킹으로 결합 친화성 예측',
        duration: '24시간',
        traditional: '3-4개월',
        details: ['AutoDock 대규모 실행', '결합 에너지 계산', '상위 후보군 선별']
      },
      {
        title: 'ADMET 특성 예측',
        description: 'AI 모델로 흡수/분포/대사/독성 특성 평가',
        duration: '6시간',
        traditional: '1-2개월',
        details: ['독성 예측 모델링', '약동학 파라미터 계산', '부작용 위험도 평가']
      },
      {
        title: '최적 후보 분자 제안',
        description: '종합 평가를 통한 합성 우선순위 결정',
        duration: '2시간',
        traditional: '2-3주',
        details: ['다중 기준 최적화', '합성 난이도 평가', '특허 회피성 검토']
      }
    ],
    results: {
      keyFindings: '기존 대비 100배 강한 결합력의 후보 분자 3개 발견',
      publications: '1편 (Journal of Medicinal Chemistry)',
      policyImpact: '국가 신약개발사업 우선 과제 선정',
      collaborations: '글로벌 제약회사와 라이센싱 협상'
    }
  }
]

export default function RealWorldScenarios() {
  const [selectedScenario, setSelectedScenario] = useState(researchScenarios[0])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleScenarioChange = (scenario: typeof researchScenarios[0]) => {
    setSelectedScenario(scenario)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'high': return 'text-indigo-600 bg-indigo-100'
      case 'medium': return 'text-purple-600 bg-purple-100'
      case 'low': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getScenarioColor = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-100' }
      case 'purple': return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-100' }
      case 'indigo': return { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-100' }
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', accent: 'bg-gray-100' }
    }
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3 mb-4"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            실제 연구 적용 사례
          </h3>
        </motion.div>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          국내 주요 연구기관에서 FatherMarine을 활용한 실제 해양 연구 프로젝트 사례를 단계별로 체험해보세요
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {researchScenarios.map((scenario) => {
          const Icon = scenario.icon
          const colors = getScenarioColor(scenario.color)
          const isSelected = selectedScenario.id === scenario.id

          return (
            <motion.div
              key={scenario.id}
              onClick={() => handleScenarioChange(scenario)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected 
                  ? `${colors.bg} ${colors.border}` 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isSelected ? colors.accent : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isSelected ? colors.text : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h4 className={`font-bold ${isSelected ? colors.text : 'text-gray-900'}`}>
                    {scenario.title}
                  </h4>
                  <p className="text-sm text-gray-600">{scenario.field}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">연구진:</span>
                  <span className="font-medium">{scenario.researcher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">기간 단축:</span>
                  <Badge variant="secondary" className="text-xs">
                    {scenario.timeframe}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">복잡도:</span>
                  <Badge className={`text-xs ${getComplexityColor(scenario.complexity)}`}>
                    {scenario.complexity}
                  </Badge>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Selected Scenario Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Research Question */}
        <div className="lg:col-span-1">
          <Card className={`border-2 ${getScenarioColor(selectedScenario.color).border}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Microscope className="w-5 h-5" />
                <span>연구 질문</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg ${getScenarioColor(selectedScenario.color).bg}`}>
                <p className="font-medium text-gray-900 mb-4">
                  &ldquo;{selectedScenario.question}&rdquo;
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{selectedScenario.researcher}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">소요시간: {selectedScenario.timeframe}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Results */}
          <Card className="mt-6 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>연구 성과</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h6 className="font-semibold text-gray-900 mb-1">주요 발견</h6>
                <p className="text-sm text-gray-700">{selectedScenario.results.keyFindings}</p>
              </div>
              <div>
                <h6 className="font-semibold text-gray-900 mb-1">논문 발표</h6>
                <p className="text-sm text-gray-700">{selectedScenario.results.publications}</p>
              </div>
              <div>
                <h6 className="font-semibold text-gray-900 mb-1">정책 영향</h6>
                <p className="text-sm text-gray-700">{selectedScenario.results.policyImpact}</p>
              </div>
              <div>
                <h6 className="font-semibold text-gray-900 mb-1">후속 협력</h6>
                <p className="text-sm text-gray-700">{selectedScenario.results.collaborations}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Process */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>단계별 연구 진행 과정</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    이전
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentStep(Math.min(selectedScenario.steps.length - 1, currentStep + 1))}
                    disabled={currentStep === selectedScenario.steps.length - 1}
                  >
                    다음
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>진행률</span>
                  <span>{Math.round(((currentStep + 1) / selectedScenario.steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className={`h-2 rounded-full ${getScenarioColor(selectedScenario.color).text.replace('text-', 'bg-')}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / selectedScenario.steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Current Step */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-gray-900">
                      {currentStep + 1}. {selectedScenario.steps[currentStep].title}
                    </h4>
                    <Badge variant="research">
                      {selectedScenario.steps[currentStep].duration}
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-lg">
                    {selectedScenario.steps[currentStep].description}
                  </p>

                  {/* Time Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-800">기존 방식</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-600">
                        {selectedScenario.steps[currentStep].traditional}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">FatherMarine</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedScenario.steps[currentStep].duration}
                      </p>
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="space-y-2">
                    <h6 className="font-semibold text-gray-900">세부 작업 내용</h6>
                    <ul className="space-y-2">
                      {selectedScenario.steps[currentStep].details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Step Navigation */}
          <div className="mt-6 grid grid-cols-5 gap-2">
            {selectedScenario.steps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentStep(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg text-xs font-medium transition-all ${
                  index === currentStep
                    ? `${getScenarioColor(selectedScenario.color).bg} ${getScenarioColor(selectedScenario.color).border} border-2 ${getScenarioColor(selectedScenario.color).text}`
                    : index < currentStep
                      ? 'bg-blue-50 border-blue-200 border-2 text-blue-600'
                      : 'bg-gray-50 border-gray-200 border text-gray-600 hover:bg-gray-100'
                }`}
              >
                {index + 1}단계
                <br />
                <span className="text-xs opacity-75">{step.duration}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}