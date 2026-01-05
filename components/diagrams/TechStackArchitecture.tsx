'use client'

import React, { useState } from 'react'
import {
  Brain, Database, Container, Layers, Zap, Shield,
  Monitor, Server, ChevronDown, ChevronUp,
  Code, RefreshCw, Network,
  HardDrive, FileText, Palette,
  BarChart3, Bot, Link, TrendingUp, Calculator,
  Map, Waves, Package, Settings, Notebook, Folder,
  Building, Scale
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Technology Stack Data
const techStack = {
  frontend: {
    name: 'Frontend Layer',
    description: '사용자 인터페이스 및 인터랙션',
    color: 'blue',
    icon: Monitor,
    technologies: [
      { name: 'Next.js 15.5', description: 'React 19 프레임워크', logo: Zap },
      { name: 'TypeScript', description: '타입 안전성', logo: FileText },
      { name: 'Tailwind CSS', description: '스타일링', logo: Palette },
      { name: 'Framer Motion', description: '애니메이션', logo: RefreshCw },
      { name: 'Recharts', description: '데이터 시각화', logo: BarChart3 }
    ]
  },
  ai: {
    name: 'AI Processing Layer',
    description: 'LangGraph 다중 에이전트 시스템',
    color: 'purple',
    icon: Brain,
    technologies: [
      { name: 'LangGraph', description: 'StateGraph 워크플로우', logo: Brain },
      { name: 'GPT-4o / Claude 3.5', description: '최신 LLM 모델', logo: Bot },
      { name: 'LangChain 0.3.x', description: 'LCEL 기반 LLM 통합', logo: Link },
      { name: 'Claude Code', description: 'AI 코딩 어시스턴트', logo: Code },
      { name: 'MCP Server', description: 'AI 도구 확장 프로토콜', logo: Network }
    ]
  },
  data: {
    name: 'Data Processing Layer',
    description: '데이터 수집, 처리 및 분석',
    color: 'indigo',
    icon: Database,
    technologies: [
      { name: 'Xarray', description: '다차원 데이터', logo: TrendingUp },
      { name: 'Pandas', description: '데이터 처리', logo: Database },
      { name: 'NumPy', description: '수치 연산', logo: Calculator },
      { name: 'Cartopy', description: '지리 시각화', logo: Map },
      { name: 'APIs', description: 'NOAA, Copernicus', logo: Waves }
    ]
  },
  container: {
    name: 'Container Layer',
    description: 'Docker 기반 환경 격리',
    color: 'indigo',
    icon: Container,
    technologies: [
      { name: 'Docker', description: '컨테이너화', logo: Container },
      { name: 'Docker Compose', description: '멀티 컨테이너', logo: Package },
      { name: 'Conda', description: '패키지 관리', logo: Settings },
      { name: 'Jupyter Lab', description: '개발 환경', logo: Notebook },
      { name: 'Git LFS', description: '대용량 파일', logo: Folder }
    ]
  },
  infrastructure: {
    name: 'Infrastructure Layer',
    description: '시스템 인프라 및 보안',
    color: 'slate',
    icon: Server,
    technologies: [
      { name: 'Local Deployment', description: '온프레미스', logo: Building },
      { name: 'GPU Support', description: 'CUDA 가속', logo: Zap },
      { name: 'Load Balancer', description: '부하 분산', logo: Scale },
      { name: 'Monitoring', description: '시스템 모니터링', logo: BarChart3 },
      { name: 'Backup', description: '데이터 백업', logo: HardDrive }
    ]
  }
}

const dataFlowSteps = [
  {
    id: 1,
    title: '연구 질문 입력',
    description: 'React UI에서 자연어로 질문 입력',
    layer: 'frontend',
    icon: Monitor,
    color: 'blue'
  },
  {
    id: 2,
    title: 'AI 워크플로우 생성',
    description: 'LangGraph가 연구 계획 수립',
    layer: 'ai',
    icon: Brain,
    color: 'purple'
  },
  {
    id: 3,
    title: '데이터 수집 실행',
    description: '다중 에이전트가 병렬 데이터 수집',
    layer: 'data',
    icon: Database,
    color: 'indigo'
  },
  {
    id: 4,
    title: 'Docker 환경 실행',
    description: '격리된 환경에서 안전한 분석',
    layer: 'container',
    icon: Container,
    color: 'indigo'
  },
  {
    id: 5,
    title: '결과 저장 및 배포',
    description: '분석 결과를 안전하게 저장',
    layer: 'infrastructure',
    icon: Server,
    color: 'slate'
  }
]

export default function TechStackArchitecture() {
  const [selectedLayer, setSelectedLayer] = useState<string>('ai')
  const [showDataFlow, setShowDataFlow] = useState(false)
  const [currentFlowStep, setCurrentFlowStep] = useState(0)

  const layers = Object.entries(techStack)
  const selectedTech = techStack[selectedLayer as keyof typeof techStack]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { 
          bg: 'bg-blue-50', 
          border: 'border-blue-200', 
          text: 'text-blue-600',
          accent: 'bg-blue-100'
        }
      case 'purple':
        return { 
          bg: 'bg-purple-50', 
          border: 'border-purple-200', 
          text: 'text-purple-600',
          accent: 'bg-purple-100'
        }
      case 'indigo':
        return { 
          bg: 'bg-indigo-50', 
          border: 'border-indigo-200', 
          text: 'text-indigo-600',
          accent: 'bg-indigo-100'
        }
      default:
        return { 
          bg: 'bg-gray-50', 
          border: 'border-gray-200', 
          text: 'text-gray-600',
          accent: 'bg-gray-100'
        }
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
          <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
            <Layers className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            완전한 기술 스택 아키텍처
          </h3>
        </motion.div>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          프론트엔드부터 인프라까지, 연구의 모든 단계를 지원하는 통합 기술 플랫폼
        </p>
      </div>

      {/* Toggle View */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setShowDataFlow(false)}
            className={`px-6 py-2 rounded-md transition-all ${
              !showDataFlow 
                ? 'bg-white shadow-sm text-gray-900 font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            기술 스택 구조
          </button>
          <button
            onClick={() => setShowDataFlow(true)}
            className={`px-6 py-2 rounded-md transition-all ${
              showDataFlow 
                ? 'bg-white shadow-sm text-gray-900 font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            데이터 플로우
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showDataFlow ? (
          <motion.div
            key="tech-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Architecture Layers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Layer Navigator */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 mb-4">기술 레이어</h4>
                {layers.map(([key, layer]) => {
                  const Icon = layer.icon
                  const colors = getColorClasses(layer.color)
                  const isSelected = selectedLayer === key
                  
                  return (
                    <motion.div
                      key={key}
                      onClick={() => setSelectedLayer(key)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? `${colors.bg} ${colors.border}` 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? colors.accent : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isSelected ? colors.text : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h5 className={`font-semibold ${
                            isSelected ? colors.text : 'text-gray-900'
                          }`}>
                            {layer.name}
                          </h5>
                          <p className="text-sm text-gray-600">{layer.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Selected Layer Detail */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLayer}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card className={`border-2 ${getColorClasses(selectedTech.color).border}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-6">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            getColorClasses(selectedTech.color).accent
                          }`}>
                            {React.createElement(selectedTech.icon, {
                              className: `w-6 h-6 ${getColorClasses(selectedTech.color).text}`
                            })}
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">
                              {selectedTech.name}
                            </h4>
                            <p className="text-gray-600">{selectedTech.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedTech.technologies.map((tech, index) => (
                            <motion.div
                              key={tech.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 flex items-center justify-center">
                                  {React.createElement(tech.logo, { className: "w-6 h-6 text-gray-600" })}
                                </div>
                                <div>
                                  <h6 className="font-semibold text-gray-900">{tech.name}</h6>
                                  <p className="text-sm text-gray-600">{tech.description}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Integration Benefits */}
                        <div className={`mt-6 p-4 rounded-lg ${getColorClasses(selectedTech.color).bg}`}>
                          <h6 className={`font-semibold mb-2 ${getColorClasses(selectedTech.color).text}`}>
                            통합 이점
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Shield className={`w-4 h-4 ${getColorClasses(selectedTech.color).text}`} />
                              <span>보안성</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Zap className={`w-4 h-4 ${getColorClasses(selectedTech.color).text}`} />
                              <span>성능 최적화</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RefreshCw className={`w-4 h-4 ${getColorClasses(selectedTech.color).text}`} />
                              <span>확장성</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="data-flow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Data Flow Visualization */}
            <div className="space-y-8">
              <h4 className="text-xl font-bold text-center text-gray-900 mb-8">
                연구 데이터 플로우
              </h4>

              {/* Flow Steps */}
              <div className="relative">
                {/* Connection Lines */}
                <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 rounded-full hidden md:block">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-gray-600 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentFlowStep + 1) / dataFlowSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                  {dataFlowSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index <= currentFlowStep
                    const isCurrent = index === currentFlowStep
                    const colors = getColorClasses(step.color)

                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isActive ? 1 : 0.3, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setCurrentFlowStep(index)}
                        className="cursor-pointer"
                      >
                        <div className={`text-center p-4 rounded-lg border-2 transition-all ${
                          isCurrent
                            ? `${colors.bg} ${colors.border}`
                            : isActive
                              ? 'border-gray-300 bg-gray-50'
                              : 'border-gray-200 bg-white'
                        }`}>
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                            isCurrent ? colors.accent : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              isCurrent ? colors.text : 'text-gray-600'
                            }`} />
                          </div>
                          <h5 className="font-semibold text-sm text-gray-900 mb-2">
                            {step.title}
                          </h5>
                          <p className="text-xs text-gray-600">{step.description}</p>
                          <Badge variant={isCurrent ? 'research' : 'secondary'} className="text-xs mt-2">
                            {step.id}단계
                          </Badge>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Flow Navigation */}
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={() => setCurrentFlowStep(Math.max(0, currentFlowStep - 1))}
                  disabled={currentFlowStep === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>이전</span>
                </button>
                <button
                  onClick={() => setCurrentFlowStep(Math.min(dataFlowSteps.length - 1, currentFlowStep + 1))}
                  disabled={currentFlowStep === dataFlowSteps.length - 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg disabled:opacity-50"
                >
                  <span>다음</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Architecture Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white rounded-xl p-8"
      >
        <h4 className="text-2xl font-bold mb-6 text-center">아키텍처 핵심 이점</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center cursor-pointer"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-blue-300" />
            </div>
            <h6 className="font-bold mb-2">완전한 보안</h6>
            <p className="text-sm opacity-90">100% 로컬 실행으로 데이터 주권 확보</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center cursor-pointer"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Layers className="w-8 h-8 text-purple-300" />
            </div>
            <h6 className="font-bold mb-2">모듈형 설계</h6>
            <p className="text-sm opacity-90">필요에 따른 컴포넌트 조합 가능</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center cursor-pointer"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="w-8 h-8 text-blue-300" />
            </div>
            <h6 className="font-bold mb-2">완벽한 재현성</h6>
            <p className="text-sm opacity-90">Docker 기반 비트 단위 환경 복제</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center cursor-pointer"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Network className="w-8 h-8 text-indigo-300" />
            </div>
            <h6 className="font-bold mb-2">확장성</h6>
            <p className="text-sm opacity-90">연구실 규모에 맞는 유연한 확장</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}