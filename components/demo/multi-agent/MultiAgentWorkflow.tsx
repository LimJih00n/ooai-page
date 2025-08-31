'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Languages, Code, Zap } from 'lucide-react';

const agents = [
  { id: 'jeni_plan', name: 'Jeni (Strategist)', icon: BrainCircuit, description: '전략 수립 및 오케스트레이션' },
  { id: 'exaone_optimize', name: 'Exaone (Optimizer)', icon: Languages, description: '한국어 뉘앙스 분석 및 프롬프트 최적화' },
  { id: 'specialist_implement', name: 'Specialist (Implementer)', icon: Code, description: '최적화된 프롬프트 기반 코드 생성' },
  { id: 'jeni_verify', name: 'Jeni (Verifier)', icon: BrainCircuit, description: '결과 검증, 디버깅 및 최종 통합' },
];

interface HybridAgentWorkflowProps {
  activeStep: string;
}

export default function HybridAgentWorkflow({ activeStep }: HybridAgentWorkflowProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border h-full">
      <h3 className="text-lg font-semibold mb-4 text-center">하이브리드 AI 에이전트 워크플로우</h3>
      <div className="relative flex flex-col items-center justify-around h-[400px]">
        {/* Connection Lines */}
        <svg className="absolute w-full h-full" style={{ zIndex: 0 }}>
          <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {agents.map((agent) => {
          const isActive = agent.id === activeStep;
          return (
            <motion.div
              key={agent.id}
              className="relative z-10"
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-300 ${isActive ? 'bg-purple-100 border-purple-400 shadow-lg' : 'bg-white border-gray-200'}`}>
                <div className={`p-2 rounded-full ${isActive ? 'bg-purple-500' : 'bg-gray-300'}`}>
                  <agent.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <p className={`font-bold ${isActive ? 'text-purple-700' : 'text-gray-800'}`}>{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.description}</p>
                </div>
                {isActive && (
                  <motion.div
                    className="absolute -right-2 -top-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
