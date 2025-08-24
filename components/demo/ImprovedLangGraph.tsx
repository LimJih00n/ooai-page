'use client'

import { useState, useEffect } from 'react'
import { Brain, Database, BarChart3, Users, ArrowRight, CheckCircle, GitBranch, Settings, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface FlowStep {
  id: string
  label: string
  icon: any
  x: number
  y: number
  status: 'idle' | 'active' | 'completed'
  color: string
}

export default function ImprovedLangGraph({ currentStep }: { currentStep: number }) {
  const [activeStep, setActiveStep] = useState(0)

  const steps: FlowStep[] = [
    { id: 'input', label: '연구 질문\n입력', icon: Users, x: 10, y: 100, status: 'idle', color: 'blue' },
    { id: 'planner', label: '연구 계획가\n에이전트', icon: Brain, x: 140, y: 100, status: 'idle', color: 'indigo' },
    { id: 'router', label: '라우터\n조건부 분기', icon: GitBranch, x: 270, y: 100, status: 'idle', color: 'purple' },
    { id: 'collector1', label: '해양 DB\n수집기', icon: Database, x: 400, y: 50, status: 'idle', color: 'blue' },
    { id: 'collector2', label: '생태 DB\n수집기', icon: Database, x: 400, y: 100, status: 'idle', color: 'indigo' },
    { id: 'collector3', label: '논문 검색\n에이전트', icon: Database, x: 400, y: 150, status: 'idle', color: 'purple' },
    { id: 'analyzer', label: '분석 종합가\n에이전트', icon: BarChart3, x: 530, y: 100, status: 'idle', color: 'blue' },
    { id: 'reviewer', label: '인간 검토\n시스템', icon: Users, x: 660, y: 100, status: 'idle', color: 'indigo' },
    { id: 'output', label: '최종 결과\n출력', icon: CheckCircle, x: 790, y: 100, status: 'idle', color: 'purple' }
  ]

  const connections = [
    { from: 'input', to: 'planner' },
    { from: 'planner', to: 'router' },
    { from: 'router', to: 'collector1' },
    { from: 'router', to: 'collector2' },
    { from: 'router', to: 'collector3' },
    { from: 'collector1', to: 'analyzer' },
    { from: 'collector2', to: 'analyzer' },
    { from: 'collector3', to: 'analyzer' },
    { from: 'analyzer', to: 'reviewer' },
    { from: 'reviewer', to: 'output' }
  ]

  useEffect(() => {
    const stepMapping = [
      ['input'],
      ['input', 'planner'],
      ['input', 'planner', 'router', 'collector1', 'collector2', 'collector3'],
      ['input', 'planner', 'router', 'collector1', 'collector2', 'collector3', 'analyzer', 'reviewer', 'output']
    ]

    const activeSteps = stepMapping[Math.min(currentStep, stepMapping.length - 1)] || []
    setActiveStep(currentStep)
  }, [currentStep])

  const getStepStatus = (stepId: string): 'idle' | 'active' | 'completed' => {
    const stepMapping = [
      ['input'],
      ['input', 'planner'],
      ['input', 'planner', 'router', 'collector1', 'collector2', 'collector3'],
      ['input', 'planner', 'router', 'collector1', 'collector2', 'collector3', 'analyzer', 'reviewer', 'output']
    ]

    const activeSteps = stepMapping[Math.min(currentStep, stepMapping.length - 1)] || []
    
    if (activeSteps.includes(stepId)) {
      // 현재 단계에서 마지막에 활성화되는 단계들은 'active', 나머지는 'completed'
      const lastSteps = ['collector1', 'collector2', 'collector3', 'analyzer', 'reviewer', 'output']
      if (currentStep === 2 && ['collector1', 'collector2', 'collector3'].includes(stepId)) return 'active'
      if (currentStep === 3 && ['analyzer', 'reviewer', 'output'].includes(stepId)) return 'active'
      return activeSteps.indexOf(stepId) < activeSteps.length - 1 ? 'completed' : 'active'
    }
    return 'idle'
  }

  const getConnectionStatus = (from: string, to: string): 'idle' | 'active' => {
    const fromStatus = getStepStatus(from)
    const toStatus = getStepStatus(to)
    return fromStatus !== 'idle' && toStatus !== 'idle' ? 'active' : 'idle'
  }

  const getColorClasses = (color: string, status: 'idle' | 'active' | 'completed') => {
    if (status === 'idle') {
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        border: 'border-gray-300'
      }
    }
    
    if (status === 'completed') {
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-400'
      }
    }

    // active status
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-400' }
      case 'indigo':
        return { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-400' }
      case 'purple':
        return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-400' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' }
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">LangGraph 워크플로우 실행</h3>
        <p className="text-sm text-gray-600">각 단계별로 노드가 활성화되며 데이터가 흘러갑니다</p>
      </div>
      
      <div className="relative overflow-x-auto">
        <div className="relative w-full h-64" style={{ minWidth: '850px' }}>
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {connections.map((conn, index) => {
              const fromStep = steps.find(s => s.id === conn.from)
              const toStep = steps.find(s => s.id === conn.to)
              if (!fromStep || !toStep) return null

              const status = getConnectionStatus(conn.from, conn.to)
              
              return (
                <motion.line
                  key={`${conn.from}-${conn.to}`}
                  x1={fromStep.x + 85}
                  y1={fromStep.y + 25}
                  x2={toStep.x + 5}
                  y2={toStep.y + 25}
                  stroke={status === 'active' ? '#3b82f6' : '#d1d5db'}
                  strokeWidth="2"
                  markerEnd={status === 'active' ? 'url(#arrowhead-active)' : 'url(#arrowhead-idle)'}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: status === 'active' ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                />
              )
            })}
            
            {/* Arrow markers - 더 작은 크기 */}
            <defs>
              <marker id="arrowhead-active" markerWidth="6" markerHeight="4" 
                      refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#3b82f6" />
              </marker>
              <marker id="arrowhead-idle" markerWidth="6" markerHeight="4" 
                      refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#d1d5db" />
              </marker>
            </defs>
          </svg>

          {/* Nodes */}
          {steps.map((step) => {
            const Icon = step.icon
            const status = getStepStatus(step.id)
            const colors = getColorClasses(step.color, status)
            
            return (
              <motion.div
                key={step.id}
                className={`absolute flex flex-col items-center p-2 rounded-lg border-2 ${colors.bg} ${colors.border} shadow-sm`}
                style={{ 
                  left: step.x, 
                  top: step.y,
                  width: '80px',
                  height: '50px',
                  zIndex: 2
                }}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ 
                  scale: status !== 'idle' ? 1 : 0.8,
                  opacity: status !== 'idle' ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon className={`w-4 h-4 mb-1 ${colors.text}`} />
                <div className={`text-xs text-center font-medium leading-tight ${colors.text}`}>
                  {step.label.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                
                {/* Status indicator */}
                {status === 'active' && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
                {status === 'completed' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
          <span>대기</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-100 border border-blue-400 rounded"></div>
          <span>실행중</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-100 border border-green-400 rounded"></div>
          <span>완료</span>
        </div>
      </div>
    </div>
  )
}