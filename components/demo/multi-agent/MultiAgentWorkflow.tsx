'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RefreshCw, UserCheck, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressTracker from '../ProgressTracker';
import OutputDisplay from '../OutputDisplay';
import { Brain, Database, Search, BarChart3, FileText, User } from 'lucide-react';

const nodes = [
  { id: 'planner', name: '연구 계획가', icon: Brain, description: '사용자 목표를 분석하여 실행 계획 수립' },
  { id: 'data_fetcher', name: '데이터 수집가', icon: Database, description: '계획에 따라 다양한 소스에서 데이터 수집' },
  { id: 'synthesizer', name: '데이터 분석가', icon: BarChart3, description: '수집된 데이터를 종합하고 통계 분석 수행' },
  { id: 'report_generator', name: '보고서 생성가', icon: FileText, description: '분석 결과를 바탕으로 최종 보고서 작성' },
  { id: 'human_review', name: '인간 검토자', icon: User, description: '중간/최종 결과물을 검토하고 피드백 제공' },
];

const initialLogs = [{ step: 'idle', message: '다중 에이전트 분석을 시작하려면 "데모 시작" 버튼을 클릭하세요.' }];

const MultiAgentWorkflow = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [logs, setLogs] = useState(initialLogs);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const [showHumanReview, setShowHumanReview] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetDemo = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsRunning(false);
    setIsComplete(false);
    setLogs(initialLogs);
    setActiveNode(null);
    setCompletedNodes([]);
    setReport(null);
    setShowHumanReview(false);
  };

  const startDemo = () => {
    resetDemo();
    setIsRunning(true);
    runWorkflow();
  };
  
  const runWorkflow = (restartWithFeedback = false) => {
    let delay = 1000;

    const steps = [
      // 1. Planner
      () => {
        setLogs(prev => [...prev, { step: 'planner', message: restartWithFeedback ? '피드백을 반영하여 계획을 재수립합니다...' : '목표를 분석하여 실행 계획을 수립합니다...' }]);
        setActiveNode('planner');
      },
      () => setLogs(prev => [...prev, { step: 'planner', message: '계획: 1. 해양 DB 조회, 2. 생태 DB 조회, 3. 웹 검색' }]),
      () => setCompletedNodes(prev => [...prev, 'planner']),

      // 2. Data Fetcher
      () => {
        setLogs(prev => [...prev, { step: 'data_fetcher', message: '데이터 수집 에이전트 활성화...' }]);
        setActiveNode('data_fetcher');
      },
      () => setLogs(prev => [...prev, { step: 'data_fetcher', message: '[해양 DB] 해수면 온도 데이터를 가져왔습니다.' }]),
      () => setLogs(prev => [...prev, { step: 'data_fetcher', message: '[생태 DB] 어종 출현 빈도 데이터를 가져왔습니다.' }]),
      () => setLogs(prev => [...prev, { step: 'data_fetcher', message: '[웹 검색] 관련 논문 2건을 확인했습니다.' }]),
      () => setCompletedNodes(prev => [...prev, 'data_fetcher']),

      // 3. Synthesizer
      () => {
        setLogs(prev => [...prev, { step: 'synthesizer', message: '데이터 분석 에이전트 활성화...' }]);
        setActiveNode('synthesizer');
      },
      () => setLogs(prev => [...prev, { step: 'synthesizer', message: '데이터를 종합하여 상관관계 분석을 수행합니다.' }]),
      () => setLogs(prev => [...prev, { step: 'synthesizer', message: '분석 결과: 해수면 온도와 어종 출현 빈도 간 강한 양의 상관관계 발견.' }]),
      () => setCompletedNodes(prev => [...prev, 'synthesizer']),

      // 4. Report Generator
      () => {
        setLogs(prev => [...prev, { step: 'report_generator', message: '보고서 생성 에이전트 활성화...' }]);
        setActiveNode('report_generator');
      },
      () => setLogs(prev => [...prev, { step: 'report_generator', message: '분석 결과를 바탕으로 보고서 초안을 작성합니다.' }]),
      () => {
        setReport('## 최종 분석 보고서\n\n- **분석 기간:** 2020-2025\n- **주요 결과:** 해수면 온도가 1°C 상승할 때마다 해당 어종의 출현 빈도가 15% 증가하는 강한 양의 상관관계가 통계적으로 유의미하게 나타남.\n- **결론:** 해수면 온도 변화는 어종 분포에 직접적인 영향을 미치는 핵심 요인으로 판단됨.');
        setCompletedNodes(prev => [...prev, 'report_generator']);
      },

      // 5. Human Review
      () => {
        setLogs(prev => [...prev, { step: 'human_review', message: '인간 검토자에게 보고서 초안이 전달되었습니다.' }]);
        setActiveNode('human_review');
        setShowHumanReview(true);
        setIsRunning(false);
      }
    ];

    steps.forEach((step, index) => {
      timeoutRef.current = setTimeout(step, delay);
      delay += (index % 2 === 0) ? 1500 : 1000;
    });
  };

  const handleHumanReview = (approved: boolean) => {
    setShowHumanReview(false);
    setCompletedNodes(prev => [...prev, 'human_review']);
    if (approved) {
      setLogs(prev => [...prev, { step: 'human_review', message: '보고서가 최종 승인되었습니다. 워크플로우를 종료합니다.' }]);
      setIsComplete(true);
      setActiveNode(null);
    } else {
      setLogs(prev => [...prev, { step: 'human_review', message: '수정 요청이 접수되었습니다. 계획 단계로 돌아갑니다.' }]);
      setActiveNode(null);
      setCompletedNodes([]);
      setReport(null);
      setIsRunning(true);
      runWorkflow(true);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border w-full">
      <div className="mb-6">
        <Button onClick={startDemo} disabled={isRunning || showHumanReview} size="lg" className="w-full h-16 text-xl">
          {isComplete ? <RefreshCw className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isComplete ? '데모 다시 시작' : (isRunning ? '분석 진행 중...' : '데모 시작')}
        </Button>
      </div>

      {/* LangGraph Visualization */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-lg font-semibold text-center mb-4">다중 에이전트 워크플로우</h3>
        <div className="flex items-center justify-center space-x-2">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <motion.div
                className={`flex flex-col items-center p-3 rounded-lg border-2 w-32 h-32 justify-center text-center
                  ${activeNode === node.id ? 'border-blue-500 bg-blue-100 shadow-md' : ''}
                  ${completedNodes.includes(node.id) ? 'border-green-500 bg-green-100' : 'bg-white'}`}
                animate={{ scale: activeNode === node.id ? 1.05 : 1 }}
              >
                <node.icon className={`h-6 w-6 mb-2 ${activeNode === node.id ? 'text-blue-600' : completedNodes.includes(node.id) ? 'text-green-600' : 'text-gray-500'}`} />
                <p className="text-sm font-bold">{node.name}</p>
              </motion.div>
              {index < nodes.length - 1 && (
                <ChevronsRight className="text-gray-300" size={24} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OutputDisplay logs={logs} isComplete={isComplete} />
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold mb-2 text-gray-800">에이전트 결과물</h3>
          <div className="bg-white p-3 rounded min-h-[200px] text-sm text-gray-700 whitespace-pre-wrap">
            {report || "결과물이 여기에 표시됩니다."}
          </div>
          {showHumanReview && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center"><UserCheck className="mr-2" /> 인간 검토 필요</h4>
              <p className="text-sm text-yellow-700 mb-3">보고서 초안이 생성되었습니다. 검토 후 다음 단계를 선택하세요.</p>
              <div className="flex space-x-2">
                <Button onClick={() => handleHumanReview(true)} size="sm" className="bg-green-600 hover:bg-green-700">승인</Button>
                <Button onClick={() => handleHumanReview(false)} size="sm" variant="outline">수정 요청</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiAgentWorkflow;