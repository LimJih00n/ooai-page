'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, BarChart3, CheckCircle, FileText, Zap } from 'lucide-react';

const agents = [
  { id: 'planning', name: 'Planner', icon: Brain, description: '계획 수립 AI' },
  { id: 'collecting', name: 'Collector', icon: Database, description: '데이터 수집 AI' },
  { id: 'analyzing', name: 'Analyzer', icon: BarChart3, description: '데이터 분석 AI' },
  { id: 'validating', name: 'Validator', icon: CheckCircle, description: '결과 검증 AI' },
  { id: 'reporting', name: 'Reporter', icon: FileText, description: '보고서 생성 AI' },
];

interface AgentWorkflowProps {
  activeStep: string;
}

export default function AgentWorkflow({ activeStep }: AgentWorkflowProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border h-full">
      <h3 className="text-lg font-semibold mb-4 text-center">AI 에이전트 워크플로우</h3>
      <div className="relative flex flex-col items-center justify-around h-[400px]">
        {/* Connection Lines */}
        <svg className="absolute w-full h-full" style={{ zIndex: 0 }}>
          <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
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
              <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-300 ${isActive ? 'bg-blue-100 border-blue-400 shadow-lg' : 'bg-white border-gray-200'}`}>
                <div className={`p-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <agent.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <p className={`font-bold ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>{agent.name}</p>
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
