'use client'

import React, { useState, useEffect } from 'react';
import MultiAgentProgressTracker from './MultiAgentProgressTracker';
import MultiAgentWorkflow from './MultiAgentWorkflow';
import MultiAgentOutputDisplay from './MultiAgentOutputDisplay';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw } from 'lucide-react';

const multiAgentSteps = [
  { id: 'jeni_plan', name: 'Jeni: 전략 수립' },
  { id: 'exaone_optimize', name: 'Exaone: 프롬프트 최적화' },
  { id: 'specialist_implement', name: 'Specialist: 코드 구현' },
  { id: 'jeni_verify', name: 'Jeni: 검증 및 통합' },
];

const initialLogs = [{ step: 'idle', message: '다중 AI 에이전트 워크플로우를 시작하려면 "데모 시작" 버튼을 클릭하세요.' }];

export default function MultiAgentDemoContainer() {
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
    setLogs([{ step: 'Jeni', message: '사용자 요청 분석 및 전체 컨텍스트 파악 시작...' }]);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep >= multiAgentSteps.length) {
      setIsRunning(false);
      setIsComplete(true);
      return;
    }

    const stepDurations = [2000, 2000, 2500, 1500];
    
    const timer = setTimeout(() => {
      setCurrentStep(currentStep + 1);
      if (currentStep < multiAgentSteps.length - 1) {
        const nextStep = multiAgentSteps[currentStep + 1].id;
        let initialMessage = '';
        if (nextStep === 'exaone_optimize') initialMessage = 'Exaone 에이전트 활성화: 프롬프트 최적화 요청...';
        if (nextStep === 'specialist_implement') initialMessage = 'Specialist LLM 활성화: 코드 구현 요청...';
        if (nextStep === 'jeni_verify') initialMessage = 'Jeni 에이전트 재활성화: 결과 검증 및 통합 시작...';
        if(initialMessage) setLogs(prev => [...prev, { step: multiAgentSteps[currentStep + 1].id.split('_')[0].toUpperCase(), message: initialMessage }]);
      }
    }, stepDurations[currentStep]);

    // Simulate logs within a step
    if (currentStep === 0) { // Jeni: Plan
        setTimeout(() => setLogs(prev => [...prev, { step: 'Jeni', message: "사용자 요청 '엽록소와 SST 상관관계 분석' 확인." }]), 500);
        setTimeout(() => setLogs(prev => [...prev, { step: 'Jeni', message: '작업 계획 수립: 1. 데이터 로드 2. 상관관계 분석 3. 시각화' }]), 1200);
    }
    if (currentStep === 1) { // Exaone: Optimize
        setTimeout(() => setLogs(prev => [...prev, { step: 'Exaone', message: '한국어 요청의 미묘한 뉘앙스 분석 중...' }]), 500);
        setTimeout(() => setLogs(prev => [...prev, { step: 'Exaone', message: 'Specialist LLM을 위한 최적의 영어 프롬프트 생성 완료.' }]), 1500);
    }
    if (currentStep === 2) { // Specialist: Implement
        setTimeout(() => setLogs(prev => [...prev, { step: 'Specialist', message: 'xarray를 사용하여 엽록소, SST 데이터 로드...' }]), 500);
        setTimeout(() => setLogs(prev => [...prev, { step: 'Specialist', message: '상관계수 계산: pearson correlation' }]), 1200);
        setTimeout(() => setLogs(prev => [...prev, { step: 'Specialist', message: 'matplotlib 및 cartopy를 사용한 시각화 코드 생성 완료.' }]), 2000);
    }
    if (currentStep === 3) { // Jeni: Verify
        setTimeout(() => setLogs(prev => [...prev, { step: 'Jeni', message: '생성된 코드 실행 및 결과 검증...' }]), 500);
        setTimeout(() => setLogs(prev => [...prev, { step: 'Jeni', message: '✅ 검증 완료. 최종 결과물을 `analysis/chl_sst_correlation.py`에 저장합니다.' }]), 1200);
    }

    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  const activeStepId = isRunning || isComplete ? multiAgentSteps[Math.min(currentStep, multiAgentSteps.length - 1)]?.id : 'idle';

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">다중 AI 에이전트 워크플로우 데모</h2>
        <p className="text-gray-600">Jeni + Exaone + Specialist LLM의 협업 연구 과정을 확인해보세요.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <div className="mb-8">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono">
              <span className="text-gray-500">연구 질문:</span>
              <span className="font-semibold text-purple-600 ml-2">
                “엽록소와 SST의 상관관계 분석 및 시각화 코드 작성”
              </span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <Button onClick={startDemo} disabled={isRunning} size="lg" className="w-full">
            {isComplete ? <RefreshCw className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isComplete ? '데모 다시 시작' : (isRunning ? 'AI 에이전트 작업 중...' : '데모 시작')}
          </Button>
        </div>

        <MultiAgentProgressTracker steps={multiAgentSteps} currentStep={currentStep} isRunning={isRunning} isComplete={isComplete} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <MultiAgentWorkflow />
          <MultiAgentOutputDisplay logs={logs} isComplete={isComplete} />
        </div>
      </div>
    </div>
  );
}
