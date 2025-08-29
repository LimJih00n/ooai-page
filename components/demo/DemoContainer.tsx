'use client'

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

    const timeouts = [
      // 계획 수립
      () => setLogs(prev => [...prev, { step: 'planning', message: '필요한 데이터 소스와 분석 모델을 식별했습니다.' }]),
      // 데이터 수집
      () => setLogs(prev => [...prev, { step: 'collecting', message: '전세계 데이터베이스에서 관련 논문 및 데이터를 수집합니다...' }]),
      () => setLogs(prev => [...prev, { step: 'collecting', message: 'Copernicus, NOAA에서 해양 데이터를 가져왔습니다.' }]),
      // 분석 실행
      () => setLogs(prev => [...prev, { step: 'analyzing', message: 'AI 모델을 사용하여 시계열 분석을 실행합니다...' }]),
      () => setLogs(prev => [...prev, { step: 'analyzing', message: '수온과 오징어 개체 수의 상관관계를 분석 중입니다.' }]),
      // 결과 검증
      () => setLogs(prev => [...prev, { step: 'validating', message: '통계적 유의성을 검증하고 이상치를 확인합니다...' }]),
      () => setLogs(prev => [...prev, { step: 'validating', message: 'Human-in-the-Loop: 전문가 검토 대기 중... (자동 승인)' }]),
      // 보고서 생성
      () => setLogs(prev => [...prev, { step: 'reporting', message: '분석 결과와 시각 자료를 종합하여 보고서를 생성합니다...' }]),
      () => setLogs(prev => [...prev, { step: 'reporting', message: '최종 보고서가 생성되었습니다.' }]),
    ];

    const stepDurations = [1000, 1500, 2000, 1500, 1000];
    
    const timer = setTimeout(() => {
      setCurrentStep(currentStep + 1);
      // Set initial log for the next step
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

    // Simulate logs within a step
    if (currentStep === 0) { // Planning
        setTimeout(() => timeouts[0](), 1000);
    }
    if (currentStep === 1) { // Collecting
        setTimeout(() => timeouts[1](), 1000);
        setTimeout(() => timeouts[2](), 2500);
    }
    if (currentStep === 2) { // Analyzing
        setTimeout(() => timeouts[3](), 1000);
        setTimeout(() => timeouts[4](), 3000);
    }
    if (currentStep === 3) { // Validating
        setTimeout(() => timeouts[5](), 1000);
        setTimeout(() => timeouts[6](), 2500);
    }
    if (currentStep === 4) { // Reporting
        setTimeout(() => timeouts[7](), 1000);
        setTimeout(() => timeouts[8](), 1800);
    }


    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  const activeStepId = isRunning || isComplete ? steps[Math.min(currentStep, steps.length - 1)]?.id : 'idle';

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">LabA 기술 데모</h2>
        <p className="text-gray-600">AI 에이전트가 연구를 자동화하는 과정을 직접 확인해보세요.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <div className="mb-8">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono">
              <span className="text-gray-500">연구 질문:</span>
              <span className="font-semibold text-blue-600 ml-2">
                “동해 표층 수온 변화가 오징어 서식지에 미치는 영향”
              </span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <Button onClick={startDemo} disabled={isRunning} size="lg" className="w-full">
            {isComplete ? <RefreshCw className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isComplete ? '데모 다시 시작' : (isRunning ? '분석 진행 중...' : '데모 시작')}
          </Button>
        </div>

        <ProgressTracker steps={steps} currentStep={currentStep} isRunning={isRunning} isComplete={isComplete} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AgentWorkflow activeStep={activeStepId} />
          <OutputDisplay logs={logs} isComplete={isComplete} />
        </div>
      </div>
    </div>
  );
}
