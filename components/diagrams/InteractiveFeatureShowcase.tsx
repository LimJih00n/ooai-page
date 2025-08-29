'use client'

import React, { useState } from 'react'
import { 
  Brain, Database, Zap, Users, FileText, Shield, 
  Clock, Target, CheckCircle, ArrowRight, Play, 
  MessageSquare, Lightbulb, Search, BarChart3,
  Code, Container, RefreshCw, Eye, Settings
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import CodeModal from '../demo/CodeModal' // CodeModal import

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
    example: 'Google Datasets, Kaggle 등 공개 데이터셋 / DBpedia, Wikidata 등 지식그래프 / Scopus, Web of Science 등 학술 DB 자동 연동',
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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

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
        {/* ... 기존 컴포넌트 내용 ... */}
        <div className="lg:col-span-2">
          {/* ... */}
          {/* 체험하기 버튼 */}
          <div className="pt-4 border-t space-y-3">
            <div className="flex gap-3">
              <Link href="/demo" className="flex-1">
                <Button 
                  variant="research" 
                  className="w-full group"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  라이브 데모
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="research-outline" 
                className="flex-1 group"
                size="lg"
                onClick={() => setIsModalOpen(true)} // 모달 열기
              >
                <Code className="w-4 h-4 mr-2" />
                코드 보기
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 text-center">
              • 실제 동작 환경에서 테스트 • 완전 무료 • 설치 불필요
            </div>
          </div>
          {/* ... */}
        </div>
      </div>
    </>
  )
}
