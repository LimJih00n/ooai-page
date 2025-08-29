'use client'

import React, { useState } from 'react'
import { 
  ArrowRight, Shield, Clock, TrendingUp, Zap, 
  Container, Brain, Database, CheckCircle, Target,
  BarChart3, RefreshCw, Lock, Globe, Layers
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// 핵심 솔루션 데이터
const solutionPillars = [
  {
    id: 'docker',
    title: 'Docker 완전 재현성',
    icon: Container,
    description: '비트 단위 동일한 연구 환경',
    color: 'blue',
    achievement: '95% → 5%',
    metric: '재현 실패율 감소',
    detail: 'Docker 환경으로 비트 단위 재현성',
    benefits: [
      '의존성 충돌 완전 해결',
      '환경 설정 자동화',
      '버전 관리 통합',
      '플랫폼 독립적 실행'
    ],
    beforeProblems: [
      '“내 컴퓨터에서는 됐는데” 문제',
      '패키지 버전 충돌',
      '환경 설정에 수일 소요',
      '협업 시 재현 불가능'
    ]
  },
  {
    id: 'langgraph',
    title: 'LangGraph + AI 자동화',
    icon: Brain,
    description: '다중 AI 에이전트 협업 시스템',
    color: 'purple',
    achievement: '23% → 60%',
    metric: '실제 연구 시간 증가',
    detail: 'AI 자동화로 반복 작업 제거',
    benefits: [
      '데이터 수집 자동화',
      '분석 파이프라인 생성',
      '결과 해석 지원',
      '보고서 자동 작성'
    ],
    beforeProblems: [
      '수동 데이터 수집 (수주 소요)',
      '반복적 분석 작업',
      '문서화 작업 부담',
      '단순 업무에 시간 낭비'
    ]
  },
  {
    id: 'security',
    title: '완전한 데이터 보안',
    icon: Shield,
    description: '100% 로컬 실행 환경',
    color: 'indigo',
    achievement: '100%',
    metric: '로컬 데이터 보안',
    detail: '외부 클라우드 없이 데이터 주권 확보',
    benefits: [
      '민감 데이터 외부 유출 방지',
      '연구 기밀성 완전 보장',
      '규제 준수 자동화',
      '기관 보안 정책 충족'
    ],
    beforeProblems: [
      '클라우드 AI 서비스 의존',
      '데이터 유출 위험',
      '보안 규정 위반 우려',
      '외부 서비스 제약'
    ]
  }
]

// 통합 성과 데이터
const integratedResults = [
  {
    metric: '연구 생산성',
    improvement: '2배 증가',
    description: '전체 워크플로우 최적화',
    icon: TrendingUp,
    details: ['분석 시간 단축', '자동화 효과', '품질 향상']
  },
  {
    metric: '시간 활용도',
    improvement: '90% 절약',
    description: '반복 작업 자동화',
    icon: Clock,
    details: ['데이터 수집', '환경 설정', '문서 작성']
  },
  {
    metric: '협업 효율성',
    improvement: '5배 향상',
    description: '완벽한 재현성 보장',
    icon: Globe,
    details: ['환경 통일', '결과 공유', '검토 과정']
  },
  {
    metric: '연구 품질',
    improvement: '3배 개선',
    description: 'AI 검증 및 최적화',
    icon: Target,
    details: ['정확도 향상', '오류 감소', '표준화']
  }
]

export default function SolutionsOverview() {
  const [selectedPillar, setSelectedPillar] = useState(solutionPillars[0])
  const [showComparison, setShowComparison] = useState(false)

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { 
          bg: 'bg-blue-50', 
          border: 'border-blue-200', 
          text: 'text-blue-600',
          accent: 'bg-blue-100',
          gradient: 'from-blue-500 to-blue-600'
        }
      case 'purple':
        return { 
          bg: 'bg-purple-50', 
          border: 'border-purple-200', 
          text: 'text-purple-600',
          accent: 'bg-purple-100',
          gradient: 'from-purple-500 to-purple-600'
        }
      case 'indigo':
        return { 
          bg: 'bg-indigo-50', 
          border: 'border-indigo-200', 
          text: 'text-indigo-600',
          accent: 'bg-indigo-100',
          gradient: 'from-indigo-500 to-indigo-600'
        }
      default:
        return { 
          bg: 'bg-gray-50', 
          border: 'border-gray-200', 
          text: 'text-gray-600',
          accent: 'bg-gray-100',
          gradient: 'from-gray-500 to-gray-600'
        }
    }
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            LabA의 해답
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Docker + LangGraph + AI로 구축하는 차세대 연구 플랫폼
          </p>
        </motion.div>
      </div>

      {/* Three Pillars Visualization */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          3대 핵심 솔루션
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {solutionPillars.map((pillar, index) => {
            const Icon = pillar.icon
            const colors = getColorClasses(pillar.color)
            const isSelected = selectedPillar.id === pillar.id

            return (
              <motion.div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isSelected ? 'transform -translate-y-2' : ''
                }`}
              >
                <Card className={`border-2 h-full ${
                  isSelected ? colors.border : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      isSelected ? colors.accent : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        isSelected ? colors.text : 'text-gray-600'
                      }`} />
                    </div>
                    <CardTitle className={`text-xl ${
                      isSelected ? colors.text : 'text-gray-900'
                    }`}>
                      {pillar.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">{pillar.description}</p>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    {/* Achievement Metric */}
                    <div className={`p-4 rounded-lg mb-4 ${
                      isSelected ? colors.bg : 'bg-gray-50'
                    }`}>
                      <div className={`text-3xl font-bold mb-1 ${
                        isSelected ? colors.text : 'text-gray-700'
                      }`}>
                        {pillar.achievement}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {pillar.metric}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {pillar.detail}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-3 h-3 rounded-full mx-auto ${colors.text.replace('text-', 'bg-')}`}
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Selected Pillar Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPillar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefits */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-2 ${getColorClasses(selectedPillar.color).text}`} />
                  핵심 이점
                </h4>
                <div className="space-y-3">
                  {selectedPillar.benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${getColorClasses(selectedPillar.color).text.replace('text-', 'bg-')}`} />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Before Problems */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-gray-600" />
                  해결되는 문제들
                </h4>
                <div className="space-y-3">
                  {selectedPillar.beforeProblems.map((problem, index) => (
                    <motion.div
                      key={problem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 rounded-full mt-2 bg-gray-400" />
                      <span className="text-gray-700 line-through opacity-75">{problem}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Integrated Results Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          실제로 달성 가능한 성과
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integratedResults.map((result, index) => {
            const Icon = result.icon
            
            return (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center cursor-pointer"
              >
                <Card className="border-2 border-gray-200 hover:border-blue-200 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {result.improvement}
                    </div>
                    
                    <div className="font-semibold text-gray-900 mb-2">
                      {result.metric}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {result.description}
                    </div>

                    <div className="space-y-1">
                      {result.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-gray-500 flex items-center justify-center">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Technology Integration Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white rounded-xl p-8"
      >
        <h3 className="text-2xl font-bold text-center mb-12">
          통합 기술 플랫폼 효과
        </h3>
        
        <div className="relative max-w-5xl mx-auto h-96 flex justify-center">
          {/* Connection Lines - Triangle Formation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Docker to LangGraph (bottom line) */}
            <motion.line
              x1="20%"
              y1="78%"
              x2="80%"
              y2="78%"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="3"
              strokeDasharray="8,8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            
            {/* LangGraph to Security (right diagonal) */}
            <motion.line
              x1="80%"
              y1="78%"
              x2="50%"
              y2="18%"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="3"
              strokeDasharray="8,8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
            
            {/* Security to Docker (left diagonal) */}
            <motion.line
              x1="50%"
              y1="18%"
              x2="20%"
              y2="78%"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="3"
              strokeDasharray="8,8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.1 }}
            />

            {/* Center connection point */}
            <motion.circle
              cx="50%"
              cy="55%"
              r="4"
              fill="rgba(255,255,255,0.6)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            />
          </svg>

          {/* Docker Layer - Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="absolute left-4 bottom-0 cursor-pointer"
            style={{ zIndex: 2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-400/50 hover:border-blue-400 transition-all w-64">
              <div className="w-20 h-20 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-300">
                <Container className="w-10 h-10 text-blue-200" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-center text-blue-200">Docker 기반</h4>
              <p className="text-sm opacity-90 text-center mb-4">완벽한 환경 재현성</p>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-1">95% → 5%</div>
                <div className="text-xs opacity-75">재현 실패율</div>
              </div>
            </div>
          </motion.div>

          {/* LangGraph Layer - Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="absolute right-4 bottom-0 cursor-pointer"
            style={{ zIndex: 2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-400/50 hover:border-purple-400 transition-all w-64">
              <div className="w-20 h-20 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-purple-300">
                <Brain className="w-10 h-10 text-purple-200" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-center text-purple-200">LangGraph AI</h4>
              <p className="text-sm opacity-90 text-center mb-4">지능형 자동화</p>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-300 mb-1">23% → 60%</div>
                <div className="text-xs opacity-75">실제 연구 시간</div>
              </div>
            </div>
          </motion.div>

          {/* Security Layer - Top Center */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="absolute top-0 left-1/2 cursor-pointer"
            style={{ 
              zIndex: 2,
              marginLeft: '-128px'
            }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-400/50 hover:border-indigo-400 transition-all w-64">
              <div className="w-20 h-20 bg-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-indigo-300">
                <Shield className="w-10 h-10 text-indigo-200" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-center text-indigo-200">완전 보안</h4>
              <p className="text-sm opacity-90 text-center mb-4">로컬 실행 환경</p>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-300 mb-1">100%</div>
                <div className="text-xs opacity-75">데이터 주권</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30">
              = 차세대 연구 플랫폼
            </Badge>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}