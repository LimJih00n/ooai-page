'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw, Brain, Database, BarChart3, Users, CheckCircle, AlertCircle, ChevronRight, Code, Terminal, FileText, Beaker, Globe, Zap, Clock, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ImprovedLangGraph from '@/components/demo/ImprovedLangGraph'
import CodeExecution from '@/components/demo/CodeExecution'

const demoSteps = [
  {
    id: 1,
    title: "연구 질문 입력",
    description: "연구자가 자연어로 질문을 입력합니다",
    component: "researcher",
    color: "blue",
    example: "동해 표층 수온 변화가 명태 서식지에 미치는 영향을 분석해주세요"
  },
  {
    id: 2,
    title: "AI 계획가 분석",
    description: "연구 질문을 세부 단계로 분해하고 데이터 소스를 식별합니다",
    component: "planner",
    color: "indigo",
    example: "1. 동해 해수면 온도 데이터 수집\n2. 명태 서식지 분포 데이터 수집\n3. 시공간 상관관계 분석\n4. 통계적 유의성 검증"
  },
  {
    id: 3,
    title: "다중 데이터 수집",
    description: "여러 에이전트가 병렬로 데이터를 수집합니다",
    component: "collectors",
    color: "purple",
    example: "• Copernicus Marine Service\n• NOAA Ocean Database\n• 한국해양과학기술원\n• 관련 연구논문 검색"
  },
  {
    id: 4,
    title: "분석 및 종합",
    description: "수집된 데이터를 분석하고 결과를 종합합니다",
    component: "analyzer",
    color: "purple",
    example: "상관계수: 0.73 (p < 0.001)\n수온 1°C 상승 시 서식지 15% 북상"
  }
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.25 // 더 천천히 증가
          if (newProgress >= 100) {
            setIsPlaying(false)
            // 마지막 단계가 아니면 다음 단계로
            if (currentStep < demoSteps.length - 1) {
              setTimeout(() => {
                setCurrentStep(prevStep => prevStep + 1)
                setProgress(0)
                setIsPlaying(true) // 자동으로 다음 단계 시작
              }, 1000) // 1초 대기
            }
            return 100
          }
          return newProgress
        })
      }, 50) // 더 느린 간격
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(false)
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < demoSteps.length) {
      setCurrentStep(stepIndex)
      setProgress(0)
      setIsPlaying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>홈으로 돌아가기</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FatherMarine Demo</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="research" className="mb-6 animate-fade-up flex items-center justify-center gap-2 mx-auto w-fit">
            <Beaker className="w-4 h-4" />
            <span>실시간 기술 데모</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-up">
            AI 연구 어시스턴트
            <br />
            <span className="gradient-text">실제 동작 과정</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-up">
            해양과학 연구 질문부터 최종 분석까지, 
            <span className="font-semibold text-blue-600">AI 다중 에이전트</span>가 어떻게 연구를 자동화하는지 확인해보세요
          </p>
        </div>
      </section>

      {/* Demo Controls */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">인터랙티브 데모</h2>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handlePlay}
                  variant="research"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isPlaying ? '일시정지' : '데모 시작'}</span>
                </Button>
                <Button
                  onClick={handleReset}
                  variant="research-outline"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>처음부터</span>
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>진행률</span>
                <span>{Math.min(100, Math.round((currentStep / (demoSteps.length - 1)) * 100 + (progress / demoSteps.length)))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (currentStep / (demoSteps.length - 1)) * 100 + (progress / demoSteps.length))}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {demoSteps.map((step, index) => {
                const getColorClasses = (color: string, isActive: boolean) => {
                  if (!isActive) return {
                    border: 'border-gray-200 bg-gray-50 hover:border-gray-300',
                    iconBg: 'bg-gray-100',
                    iconColor: 'text-gray-600'
                  }
                  
                  switch (color) {
                    case 'blue':
                      return {
                        border: 'border-blue-500 bg-blue-50',
                        iconBg: 'bg-blue-100',
                        iconColor: 'text-blue-600'
                      }
                    case 'indigo':
                      return {
                        border: 'border-indigo-500 bg-indigo-50',
                        iconBg: 'bg-indigo-100',
                        iconColor: 'text-indigo-600'
                      }
                    case 'purple':
                      return {
                        border: 'border-purple-500 bg-purple-50',
                        iconBg: 'bg-purple-100',
                        iconColor: 'text-purple-600'
                      }
                    default:
                      return {
                        border: 'border-gray-200 bg-gray-50',
                        iconBg: 'bg-gray-100',
                        iconColor: 'text-gray-600'
                      }
                  }
                }
                
                const colorClasses = getColorClasses(step.color, index === currentStep)
                
                return (
                <motion.div
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${colorClasses.border}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses.iconBg}`}>
                      {step.component === 'researcher' && <Users className={`w-4 h-4 ${colorClasses.iconColor}`} />}
                      {step.component === 'planner' && <Brain className={`w-4 h-4 ${colorClasses.iconColor}`} />}
                      {step.component === 'collectors' && <Database className={`w-4 h-4 ${colorClasses.iconColor}`} />}
                      {step.component === 'analyzer' && <BarChart3 className={`w-4 h-4 ${colorClasses.iconColor}`} />}
                    </div>
                    <span className="font-semibold text-sm text-gray-900">단계 {step.id}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Visualization */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {demoSteps[currentStep] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        demoSteps[currentStep].color === 'blue' ? 'bg-blue-100' :
                        demoSteps[currentStep].color === 'indigo' ? 'bg-indigo-100' :
                        demoSteps[currentStep].color === 'purple' ? 'bg-purple-100' :
                        'bg-gray-100'
                      }`}>
                        {demoSteps[currentStep].component === 'researcher' && <Users className={`w-6 h-6 ${
                          demoSteps[currentStep].color === 'blue' ? 'text-blue-600' :
                          demoSteps[currentStep].color === 'indigo' ? 'text-indigo-600' :
                          demoSteps[currentStep].color === 'purple' ? 'text-purple-600' :
                          'text-gray-600'
                        }`} />}
                        {demoSteps[currentStep].component === 'planner' && <Brain className={`w-6 h-6 ${
                          demoSteps[currentStep].color === 'blue' ? 'text-blue-600' :
                          demoSteps[currentStep].color === 'indigo' ? 'text-indigo-600' :
                          demoSteps[currentStep].color === 'purple' ? 'text-purple-600' :
                          'text-gray-600'
                        }`} />}
                        {demoSteps[currentStep].component === 'collectors' && <Database className={`w-6 h-6 ${
                          demoSteps[currentStep].color === 'blue' ? 'text-blue-600' :
                          demoSteps[currentStep].color === 'indigo' ? 'text-indigo-600' :
                          demoSteps[currentStep].color === 'purple' ? 'text-purple-600' :
                          'text-gray-600'
                        }`} />}
                        {demoSteps[currentStep].component === 'analyzer' && <BarChart3 className={`w-6 h-6 ${
                          demoSteps[currentStep].color === 'blue' ? 'text-blue-600' :
                          demoSteps[currentStep].color === 'indigo' ? 'text-indigo-600' :
                          demoSteps[currentStep].color === 'purple' ? 'text-purple-600' :
                          'text-gray-600'
                        }`} />}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{demoSteps[currentStep].title}</CardTitle>
                        <CardDescription className="text-lg mt-1">
                          {demoSteps[currentStep].description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* 입력/출력 예시 */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">입력 & 출력 예시</h4>
                        <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
                          <div className="flex items-center space-x-2 mb-3">
                            <Terminal className="w-4 h-4" />
                            <span className="text-gray-400">FatherMarine AI Assistant</span>
                          </div>
                          <div className="space-y-2">
                            {demoSteps[currentStep].example.split('\n').map((line, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                              >
                                <span className="text-gray-400">{'>'}</span> <span>{line}</span>
                              </motion.div>
                            ))}
                          </div>
                          
                          {isPlaying && (
                            <div className="mt-3 flex items-center space-x-2">
                              <div className="animate-pulse w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-gray-400">처리 중...</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 기술 구현 시각화 - 수직 배치로 개선 */}
                      <div className="space-y-6">
                        <h4 className="font-semibold text-gray-900 text-lg">기술 구현</h4>
                        {currentStep === 0 && (
                          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <h5 className="font-medium text-blue-900 mb-3">자연어 처리</h5>
                            <div className="space-y-3 text-sm text-blue-800">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                                <span>OpenAI GPT 모델을 통한 의도 파악</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                                <span>연구 질문 구조화 및 분해</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                                <span>필요한 데이터 소스 식별</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {currentStep === 1 && (
                          <CodeExecution currentStep={currentStep} />
                        )}
                        
                        {currentStep >= 2 && (
                          <ImprovedLangGraph currentStep={currentStep} />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Service Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              FatherMarine이 제공하는 핵심 기능
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              연구의 모든 단계를 자동화하여 연구자가 핵심 업무에 집중할 수 있도록 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>자연어 질문 처리</CardTitle>
                <CardDescription>
                  복잡한 연구 질문을 자연어로 입력하면 AI가 자동으로 이해하고 분석합니다
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-indigo-200">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>다중 데이터 소스 연동</CardTitle>
                <CardDescription>
                  Copernicus, NOAA 등 전세계 해양 데이터베이스와 자동 연결하여 데이터를 수집합니다
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>고급 통계 분석</CardTitle>
                <CardDescription>
                  시공간 상관관계, 회귀분석, 머신러닝 등 다양한 통계 기법을 자동 적용합니다
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>재현 가능한 코드</CardTitle>
                <CardDescription>
                  모든 분석 과정이 Docker 환경에서 실행되어 100% 재현 가능한 결과를 보장합니다
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-indigo-200">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>자동 보고서 생성</CardTitle>
                <CardDescription>
                  분석 결과를 논문 수준의 보고서로 자동 생성하여 연구 문서화 시간을 단축합니다
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Human-in-the-Loop</CardTitle>
                <CardDescription>
                  중요한 결정점에서 연구자의 검토를 받아 AI와 인간의 협업을 최적화합니다
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Example */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              실제 연구 사례
            </h2>
            <p className="text-xl text-gray-600">
              서울대학교 해양학과에서 실제 진행된 연구 프로젝트 결과
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>기존 방식</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">데이터 수집</span>
                  <span className="font-bold text-gray-700">3주</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">환경 설정</span>
                  <span className="font-bold text-gray-700">1주</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">분석 및 시각화</span>
                  <span className="font-bold text-gray-700">2주</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">문서 작성</span>
                  <span className="font-bold text-gray-700">1주</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <span className="font-semibold">총 소요 시간</span>
                    <span className="font-bold text-gray-900 text-lg">7주</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span>FatherMarine 사용</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">데이터 수집</span>
                  <span className="font-bold text-blue-600">2시간</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">환경 설정</span>
                  <span className="font-bold text-blue-600">자동</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">분석 및 시각화</span>
                  <span className="font-bold text-blue-600">1시간</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">문서 작성</span>
                  <span className="font-bold text-blue-600">30분</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg">
                    <span className="font-semibold">총 소요 시간</span>
                    <span className="font-bold text-blue-600 text-lg">3.5시간</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-block">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Target className="w-8 h-8" />
                  <div>
                    <div className="text-3xl font-bold">20x 속도 향상</div>
                    <div className="text-sm opacity-90">7주 → 3.5시간으로 단축</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            직접 체험해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            무료 파일럿 프로젝트로 연구실의 생산성 혁신을 경험해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 group">
              무료 파일럿 신청하기
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                더 많은 정보 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}