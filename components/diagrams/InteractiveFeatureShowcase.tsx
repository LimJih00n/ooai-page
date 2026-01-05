'use client'

import React, { useState } from 'react'
import {
  Brain, Database, Zap, Users, FileText, Shield,
  Clock, Target, CheckCircle, ArrowRight, Play,
  MessageSquare, Lightbulb,
  Code, Container, Eye
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeModal from '../demo/CodeModal'

// 핵심 기능들
const coreFeatures = [
  {
    id: 'natural-query',
    title: '자연어 연구 질문',
    description: '복잡한 연구 질문을 일상 언어로 입력',
    icon: MessageSquare,
    color: 'blue',
    example: '“동해 표층 수온 변화가 오징어 서식지에 미치는 영향을 분석해주세요”',
    benefits: ['기술 장벽 제거', '직관적 인터페이스', '빠른 질문 구조화'],
    beforeAfter: {
      before: '복잡한 쿼리 언어 학습 → 코드 작성 → 디버깅',
      after: '자연어 입력 → 즉시 이해 → 자동 실행'
    }
  },
  {
    id: 'multi-agent',
    title: '다중 AI 에이전트',
    description: '각 전문 분야별 AI가 협업하여 연구 수행',
    icon: Brain,
    color: 'purple',
    example: '계획가 + 수집가 + 분석가 + 검증가가 동시에 작업',
    benefits: ['전문성 극대화', '병렬 처리', '품질 보장'],
    beforeAfter: {
      before: '연구자 혼자서 모든 단계 처리',
      after: '전문 AI 팀이 각자 최적화된 역할 수행'
    }
  },
  {
    id: 'auto-data',
    title: '자동 데이터 수집',
    description: '전세계 데이터베이스에서 실시간 수집',
    icon: Database,
    color: 'indigo',
    example: '인도양 특정 해역의 2025년 1월 해양 데이터 수집 / Google Datasets, Kaggle 등 공개 데이터셋 / DBpedia, Wikidata 등 지식그래프 / Scopus, Web of Science 등 학술 DB 자동 연동',
    benefits: ['시간 절약', '누락 방지', '최신 데이터'],
    beforeAfter: {
      before: '수동 검색 → 개별 다운로드 → 형식 변환',
      after: '키워드 입력 → 자동 수집 → 통합 포맷'
    }
  },
  {
    id: 'docker-env',
    title: 'Docker 완전 재현성',
    description: '비트 단위로 동일한 연구 환경 보장',
    icon: Container,
    color: 'indigo',
    example: '연구실 A 결과 = 연구실 B 결과 (100% 보장)',
    benefits: ['재현성 보장', '환경 문제 해결', '협업 원활'],
    beforeAfter: {
      before: '“내 컴퓨터에서는 됐는데...” 문제',
      after: '어디서나 동일한 결과 보장'
    }
  },
  {
    id: 'human-loop',
    title: 'Human-in-the-Loop',
    description: '중요 결정점에서 연구자 검토 및 피드백',
    icon: Users,
    color: 'blue',
    example: 'AI 분석 → 전문가 검토 → 피드백 반영 → 재분석',
    benefits: ['전문성 활용', '품질 검증', '학습 효과'],
    beforeAfter: {
      before: '블랙박스 AI 결과를 그대로 사용',
      after: '연구자와 AI의 협력적 분석'
    }
  },
  {
    id: 'auto-report',
    title: '자동 보고서 생성',
    description: '논문 수준의 연구 보고서 자동 작성',
    icon: FileText,
    color: 'purple',
    example: '방법론 + 결과 + 시각화 + 해석이 포함된 완전한 문서',
    benefits: ['문서화 자동화', '표준 형식', '시간 단축'],
    beforeAfter: {
      before: '수동 보고서 작성 (1-2주 소요)',
      after: '자동 생성 + 검토 (30분 완료)'
    }
  }
]

const demoCode = `'use client'

import React, { useState, useEffect } from 'react';
import ProgressTracker from './ProgressTracker';
import AgentWorkflow from './AgentWorkflow';
import OutputDisplay from './OutputDisplay';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw } from 'lucide-react';

const steps = [
  { id: 'planning', name: '계획 수립' },
  { id: 'collecting', name: '데이터 수집' },
  { id: 'analyzing', name: '분석 실행' },
  { id: 'validating', name: '결과 검증' },
  { id: 'reporting', name: '보고서 생성' },
];

const initialLogs = [{ step: 'idle', message: '분석을 시작하려면 "데모 시작" 버튼을 클릭하세요.' }];

export default function DemoContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(initialLogs);
  const [isComplete, setIsComplete] = useState(false);

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setLogs(initialLogs);
    setIsComplete(false);
  };

  const startDemo = () => {
    if (isComplete) {
      resetDemo();
    }
    setIsRunning(true);
    setLogs([{ step: 'planning', message: '연구 질문을 분석하여 최적의 실행 계획을 수립합니다...' }]);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep >= steps.length) {
      setIsRunning(false);
      setIsComplete(true);
      return;
    }

    const stepDurations = [1000, 1500, 2000, 1500, 1000];
    
    const timer = setTimeout(() => {
      setCurrentStep(currentStep + 1);
      if (currentStep < steps.length -1) {
        const nextStep = steps[currentStep + 1].id;
        let initialMessage = '';
        if (nextStep === 'collecting') initialMessage = '데이터 수집 에이전트를 활성화합니다...';
        if (nextStep === 'analyzing') initialMessage = '분석 에이전트를 활성화합니다...';
        if (nextStep === 'validating') initialMessage = '검증 에이전트를 활성화합니다...';
        if (nextStep === 'reporting') initialMessage = '보고서 생성 에이전트를 활성화합니다...';
        if(initialMessage) setLogs(prev => [...prev, { step: nextStep, message: initialMessage }]);
      }
    }, stepDurations[currentStep]);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  const activeStepId = isRunning || isComplete ? steps[Math.min(currentStep, steps.length - 1)]?.id : 'idle';

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* ... UI ... */}
    </div>
  );
}`;


export default function InteractiveFeatureShowcase() {
  const [selectedFeature, setSelectedFeature] = useState(coreFeatures[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [showBeforeAfter, setShowBeforeAfter] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeatureSelect = (feature: typeof coreFeatures[0]) => {
    if (feature.id === selectedFeature.id) return
    
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedFeature(feature)
      setIsAnimating(false)
    }, 200)
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-100' }
      case 'purple': return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-100' }
      case 'indigo': return { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-100' }
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', accent: 'bg-gray-100' }
    }
  }

  return (
    <>
      <CodeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        code={demoCode}
        title="데모 핵심 로직 (DemoContainer.tsx)"
      />
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3 mb-4"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            핵심 기능 체험하기
          </h3>
        </motion.div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          LabA의 6가지 핵심 기능을 인터랙티브하게 탐색하고 실제 동작 원리를 이해해보세요
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feature Selector */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900 mb-4">기능 선택</h4>
          {coreFeatures.map((feature) => {
            const Icon = feature.icon
            const colors = getColorClasses(feature.color)
            const isSelected = selectedFeature.id === feature.id

            return (
              <motion.div
                key={feature.id}
                onClick={() => handleFeatureSelect(feature)}
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
                  <div className="flex-1">
                    <h5 className={`font-semibold ${
                      isSelected ? colors.text : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h5>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-3 h-3 rounded-full ${colors.text.replace('text-', 'bg-')}`}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Detail */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 20 : 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`border-2 ${getColorClasses(selectedFeature.color).border}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      getColorClasses(selectedFeature.color).accent
                    }`}>
                      {React.createElement(selectedFeature.icon, {
                        className: `w-6 h-6 ${getColorClasses(selectedFeature.color).text}`
                      })}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedFeature.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{selectedFeature.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 실제 사용 예시 */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      실제 사용 예시
                    </h5>
                    <div className={`p-4 rounded-lg ${getColorClasses(selectedFeature.color).bg}`}>
                      <div className="font-mono text-sm">
                        <span className="text-gray-500">예시:</span>{' '}
                        <span className={`font-medium ${getColorClasses(selectedFeature.color).text}`}>
                          {selectedFeature.example}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 핵심 이점 */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      핵심 이점
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedFeature.benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className={`w-4 h-4 ${getColorClasses(selectedFeature.color).text}`} />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Before/After 비교 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-gray-900 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        변화 비교
                      </h5>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                      >
                        {showBeforeAfter ? '숨기기' : '자세히 보기'}
                      </Button>
                    </div>
                    
                    <AnimatePresence>
                      {showBeforeAfter && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                <span className="font-medium text-gray-800">기존 방식</span>
                              </div>
                              <p className="text-sm text-gray-700">{selectedFeature.beforeAfter.before}</p>
                            </div>
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                <span className="font-medium text-blue-800">LabA</span>
                              </div>
                              <p className="text-sm text-blue-700">{selectedFeature.beforeAfter.after}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 체험하기 버튼 */}
                  <div className="pt-4 border-t space-y-3">
                    {selectedFeature.id === 'auto-data' ? (
                      <div className="flex gap-3">
                        <Button asChild className="flex-1" size="lg" variant="research">
                          <a href="/auto-data-demo.html" target="_blank" rel="noopener noreferrer" className="group">
                            <Play className="w-4 h-4 mr-2" />
                            해양 데이터 데모
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                        <Button asChild className="flex-1" size="lg" variant="research">
                          <a href="/auto-data-demo-ncei.html" target="_blank" rel="noopener noreferrer" className="group">
                            <Play className="w-4 h-4 mr-2" />
                            대기 데이터 데모
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <Button asChild className="flex-1" size="lg" variant="research">
                          <a 
                            href={
                              selectedFeature?.id === 'natural-language' ? '/demo' :
                              selectedFeature?.id === 'multi-agent' ? '/demo/multi-agent' :
                              selectedFeature?.id === 'docker-env' ? '/demo/docker-reproducibility' :
                              selectedFeature?.id === 'human-loop' ? '/demo/human-loop' :
                              selectedFeature?.id === 'auto-report' ? '/demo/auto-report' :
                              '/demo'
                            } 
                            className="group"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            라이브 데모
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                        <Button 
                          variant="research-outline" 
                          className="flex-1 group"
                          size="lg"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Code className="w-4 h-4 mr-2" />
                          코드 보기
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 text-center">
                      • 실제 동작 환경에서 테스트 • 완전 무료 • 설치 불필요
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-xl p-8"
      >
        <h4 className="text-xl font-bold text-center text-gray-900 mb-6">
          6개 핵심 기능의 통합 효과
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer"
            >
              <Clock className="w-8 h-8 text-blue-600" />
            </motion.div>
            <div className="text-2xl font-bold text-blue-600 mb-1">90%</div>
            <div className="text-sm text-gray-600">시간 절약</div>
          </div>
          <div className="text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer"
            >
              <Shield className="w-8 h-8 text-purple-600" />
            </motion.div>
            <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">재현성</div>
          </div>
          <div className="text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer"
            >
              <Zap className="w-8 h-8 text-indigo-600" />
            </motion.div>
            <div className="text-2xl font-bold text-indigo-600 mb-1">5x</div>
            <div className="text-sm text-gray-600">분석 속도</div>
          </div>
          <div className="text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer"
            >
              <Users className="w-8 h-8 text-blue-600" />
            </motion.div>
            <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">AI 지원</div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  )
}
