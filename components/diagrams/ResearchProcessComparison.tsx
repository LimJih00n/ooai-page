'use client'

import React, { useState } from 'react'
import { Clock, AlertTriangle, CheckCircle, Zap, Users, Database, FileX, RefreshCw, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// 기존 연구 프로세스 단계
const traditionalSteps = [
  {
    id: 1,
    title: "연구 질문 설정",
    duration: "3-5일",
    problems: ["모호한 연구 범위", "선행연구 검토 부족"],
    icon: Users,
    color: "gray"
  },
  {
    id: 2,
    title: "데이터 소스 탐색",
    duration: "1-2주",
    problems: ["수동 검색", "접근성 문제", "데이터 형식 불일치"],
    icon: Database,
    color: "gray"
  },
  {
    id: 3,
    title: "환경 설정",
    duration: "3-7일",
    problems: ["의존성 충돌", "버전 호환성", "플랫폼 차이"],
    icon: RefreshCw,
    color: "gray"
  },
  {
    id: 4,
    title: "데이터 수집",
    duration: "1-3주",
    problems: ["수동 다운로드", "API 제한", "형식 변환"],
    icon: Database,
    color: "gray"
  },
  {
    id: 5,
    title: "분석 및 처리",
    duration: "2-4주",
    problems: ["반복적 시행착오", "코드 재작성", "메모리 부족"],
    icon: AlertTriangle,
    color: "gray"
  },
  {
    id: 6,
    title: "결과 해석",
    duration: "1-2주",
    problems: ["주관적 해석", "통계적 검증 부족", "재현성 없음"],
    icon: FileX,
    color: "gray"
  },
  {
    id: 7,
    title: "문서화",
    duration: "1-2주",
    problems: ["불완전한 기록", "방법론 누락", "재현 불가능"],
    icon: FileX,
    color: "gray"
  }
]

// LabA 프로세스 단계
const labASteps = [
  {
    id: 1,
    title: "자연어 질문 입력",
    duration: "5분",
    benefits: ["AI 질문 구조화", "자동 범위 설정", "관련 문헌 추천"],
    icon: Users,
    color: "blue"
  },
  {
    id: 2,
    title: "AI 연구 계획",
    duration: "10분",
    benefits: ["최적 데이터 소스 식별", "분석 방법론 추천", "워크플로우 자동 생성"],
    icon: Zap,
    color: "blue"
  },
  {
    id: 3,
    title: "Docker 환경 구성",
    duration: "자동",
    benefits: ["완전 격리된 환경", "의존성 자동 해결", "100% 재현성"],
    icon: CheckCircle,
    color: "blue"
  },
  {
    id: 4,
    title: "다중 소스 데이터 수집",
    duration: "30분",
    benefits: ["병렬 자동 수집", "API 통합", "형식 자동 변환"],
    icon: Database,
    color: "blue"
  },
  {
    id: 5,
    title: "AI 분석 실행",
    duration: "1-2시간",
    benefits: ["최적화된 알고리즘", "자동 파라미터 튜닝", "에러 자동 복구"],
    icon: Zap,
    color: "blue"
  },
  {
    id: 6,
    title: "결과 검증 및 해석",
    duration: "30분",
    benefits: ["통계적 검증 자동", "시각화 자동 생성", "Human-in-the-Loop"],
    icon: CheckCircle,
    color: "blue"
  },
  {
    id: 7,
    title: "자동 보고서 생성",
    duration: "10분",
    benefits: ["방법론 자동 기록", "재현 가능한 코드", "논문급 문서화"],
    icon: CheckCircle,
    color: "blue"
  }
]

export default function ResearchProcessComparison() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [viewMode, setViewMode] = useState<'traditional' | 'laba'>('traditional')

  // 자동 진행 useEffect 추가
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        const maxSteps = viewMode === 'traditional' ? traditionalSteps.length : fatherMarineSteps.length
        setCurrentStep(prev => {
          if (prev < maxSteps - 1) {
            return prev + 1
          } else {
            setIsPlaying(false) // 마지막 단계에서 자동 정지
            return prev
          }
        })
      }, 2000) // 2초마다 다음 단계로
    }
    return () => clearInterval(interval)
  }, [isPlaying, viewMode])

  // 애니메이션 제어
  const handlePlay = () => {
    const maxSteps = viewMode === 'traditional' ? traditionalSteps.length : fatherMarineSteps.length
    
    if (!isPlaying && currentStep === maxSteps - 1) {
      // 마지막 단계에서 재생 버튼을 누르면 처음부터 시작
      setCurrentStep(0)
      setIsPlaying(true)
    } else {
      // 일반적인 재생/일시정지 토글
      setIsPlaying(!isPlaying)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const steps = viewMode === 'traditional' ? traditionalSteps : labASteps
  const totalDuration = viewMode === 'traditional' ? '7-15주' : '3.5시간'
  const successRate = viewMode === 'traditional' ? '30%' : '95%'

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3 mb-4"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            연구 프로세스 혁신
          </h3>
        </motion.div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          기존 방식과 LabA의 차이를 단계별로 비교해보세요
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setViewMode('traditional')
              setCurrentStep(0)
              setIsPlaying(false)
            }}
            className={`px-6 py-2 rounded-md transition-all ${
              viewMode === 'traditional' 
                ? 'bg-white shadow-sm text-gray-900 font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>기존 방식</span>
            </div>
          </button>
          <button
            onClick={() => {
              setViewMode('laba')
              setCurrentStep(0)
              setIsPlaying(false)
            }}
            className={`px-6 py-2 rounded-md transition-all ${
              viewMode === 'laba' 
                ? 'bg-white shadow-sm text-gray-900 font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>LabA 방식</span>
            </div>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-8">
        <Button onClick={handlePlay} variant="research" size="lg" className="group">
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              일시정지
            </>
          ) : currentStep === (viewMode === 'traditional' ? traditionalSteps.length - 1 : labASteps.length - 1) ? (
            <>
              <RotateCcw className="w-5 h-5 mr-2" />
              다시 시연
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              자동 시연 시작
            </>
          )}
        </Button>
        <Button onClick={handleReset} variant="research-outline" size="lg">
          <RotateCcw className="w-5 h-5 mr-2" />
          처음부터
        </Button>
      </div>
      
      {/* Progress Indicator */}
      {isPlaying && (
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-700 font-medium">
              자동 진행 중... (2초마다 다음 단계)
            </span>
          </div>
        </div>
      )}

      {/* Process Timeline */}
      <div className="relative mb-12">
        {/* Timeline Line */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <motion.div
            className={`h-full rounded-full ${
              viewMode === 'traditional' 
                ? 'bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500' 
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'
            }`}
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index <= currentStep
            const isCurrent = index === currentStep
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.3,
                  y: 0,
                  scale: isCurrent ? 1.05 : 1
                }}
                transition={{ delay: index * 0.1 }}
                className={`relative cursor-pointer ${isCurrent ? 'z-10' : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`text-center p-4 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? viewMode === 'traditional'
                      ? 'border-gray-500 bg-gray-50'
                      : 'border-blue-500 bg-blue-50'
                    : isActive
                      ? 'border-gray-300 bg-gray-50'
                      : 'border-gray-200 bg-white'
                }`}>
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    step.color === 'gray' ? 'bg-gray-100' :
                    step.color === 'blue' ? 'bg-blue-100' :
                    'bg-blue-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      step.color === 'gray' ? 'text-gray-600' :
                      step.color === 'blue' ? 'text-blue-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">{step.title}</h4>
                  <Badge 
                    variant={step.color === 'blue' ? 'research' : 'secondary'} 
                    className="text-xs"
                  >
                    {step.duration}
                  </Badge>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Current Step Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${currentStep}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    steps[currentStep].color === 'gray' ? 'bg-gray-100' :
                    steps[currentStep].color === 'blue' ? 'bg-blue-100' :
                    'bg-blue-100'
                  }`}>
                    {React.createElement(steps[currentStep].icon, {
                      className: `w-6 h-6 ${
                        steps[currentStep].color === 'gray' ? 'text-gray-600' :
                        steps[currentStep].color === 'blue' ? 'text-blue-600' :
                        'text-blue-600'
                      }`
                    })}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>소요시간: {steps[currentStep].duration}</span>
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={steps[currentStep].color === 'blue' ? 'research' : 'secondary'}>
                  {currentStep + 1}/{steps.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    {viewMode === 'traditional' ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-gray-600 mr-2" />
                        주요 문제점
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                        핵심 이점
                      </>
                    )}
                  </h5>
                  <ul className="space-y-2">
                    {(viewMode === 'traditional' 
                      ? ('problems' in steps[currentStep] ? steps[currentStep].problems : [])
                      : ('benefits' in steps[currentStep] ? steps[currentStep].benefits : [])
                    )?.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          viewMode === 'traditional' ? 'bg-gray-400' : 'bg-blue-400'
                        }`} />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Progress Visualization */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-900 mb-3">진행률</h5>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>완료도</span>
                        <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            viewMode === 'traditional' 
                              ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>예상 성공률</span>
                        <span>{successRate}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            viewMode === 'traditional'
                              ? 'bg-gray-400'
                              : 'bg-blue-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: successRate }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Summary Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <Card className="border-2 border-gray-200">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <AlertTriangle className="w-5 h-5" />
              <span>기존 방식</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>총 소요시간</span>
                <span className="font-bold text-gray-600">7-15주</span>
              </div>
              <div className="flex justify-between">
                <span>성공률</span>
                <span className="font-bold text-gray-600">30%</span>
              </div>
              <div className="flex justify-between">
                <span>재현성</span>
                <span className="font-bold text-gray-600">낮음</span>
              </div>
              <div className="flex justify-between">
                <span>인력 투입</span>
                <span className="font-bold text-gray-600">높음</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <CheckCircle className="w-5 h-5" />
              <span>LabA 방식</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>총 소요시간</span>
                <span className="font-bold text-blue-600">3.5시간</span>
              </div>
              <div className="flex justify-between">
                <span>성공률</span>
                <span className="font-bold text-blue-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span>재현성</span>
                <span className="font-bold text-blue-600">100%</span>
              </div>
              <div className="flex justify-between">
                <span>인력 투입</span>
                <span className="font-bold text-blue-600">최소</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}