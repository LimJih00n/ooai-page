'use client'

import { useState, useEffect } from 'react'
import { Terminal, Play, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CodeStep {
  id: number
  code: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'error'
  output?: string
  duration?: number
}

export default function CodeExecution({ currentStep }: { currentStep: number }) {
  const [executingSteps, setExecutingSteps] = useState<number[]>([])
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const codeSteps: CodeStep[] = [
    {
      id: 1,
      code: `from langgraph import StateGraph, END
from research_agents import PlannerAgent, DataCollector

# 연구 상태 정의
class ResearchState:
    query: str
    plan: dict
    data: dict
    analysis: dict`,
      description: "LangGraph 기본 설정 및 상태 정의",
      status: 'pending',
      output: "✓ 연구 상태 클래스 초기화 완료"
    },
    {
      id: 2,
      code: `# 연구 계획 에이전트 노드
def planning_node(state: ResearchState):
    planner = PlannerAgent()
    plan = planner.create_plan(state.query)
    return {"plan": plan}

# 데이터 수집 에이전트 노드
def collection_node(state: ResearchState):
    collectors = [
        DataCollector("copernicus"),
        DataCollector("noaa"),
        DataCollector("papers")
    ]
    data = {}
    for collector in collectors:
        data[collector.source] = collector.collect(state.plan)
    return {"data": data}`,
      description: "에이전트 노드 함수 정의",
      status: 'pending',
      output: "✓ 계획 에이전트 노드 생성\n✓ 데이터 수집 노드 생성"
    },
    {
      id: 3,
      code: `# LangGraph 워크플로우 구성
workflow = StateGraph(ResearchState)

# 노드 추가
workflow.add_node("planner", planning_node)
workflow.add_node("collectors", collection_node)
workflow.add_node("analyzer", analysis_node)
workflow.add_node("reviewer", human_review_node)

# 엣지 연결
workflow.add_edge("planner", "collectors")
workflow.add_edge("collectors", "analyzer")
workflow.add_edge("analyzer", "reviewer")
workflow.add_edge("reviewer", END)

# 시작점 설정
workflow.set_entry_point("planner")`,
      description: "워크플로우 그래프 구성",
      status: 'pending',
      output: "✓ 4개 노드 추가 완료\n✓ 엣지 연결 완료\n✓ 시작점 설정 완료"
    },
    {
      id: 4,
      code: `# 워크플로우 실행
app = workflow.compile()

# 연구 질문으로 실행
result = app.invoke({
    "query": "동해 표층 수온 변화가 오징어 서식지에 미치는 영향"
})

print("분석 완료:", result["analysis"]["correlation"])
print("검토 상태:", result["review"]["approved"])`,
      description: "워크플로우 컴파일 및 실행",
      status: 'pending',
      output: "분석 완료: 0.73 (강한 양의 상관관계)\n검토 상태: True\n\n🎉 연구 워크플로우 성공적으로 완료!"
    }
  ]

  useEffect(() => {
    if (currentStep > 0) {
      const stepIndex = Math.min(currentStep - 1, codeSteps.length - 1)
      
      // 이전 단계들은 완료 상태로
      const newCompleted = Array.from({ length: stepIndex }, (_, i) => i + 1)
      setCompletedSteps(newCompleted)
      
      // 현재 단계는 실행 중
      if (stepIndex + 1 <= codeSteps.length) {
        setExecutingSteps([stepIndex + 1])
        
        // 2초 후 현재 단계도 완료로 변경
        setTimeout(() => {
          setExecutingSteps([])
          setCompletedSteps(prev => [...prev, stepIndex + 1])
        }, 2000)
      }
    } else {
      setExecutingSteps([])
      setCompletedSteps([])
    }
  }, [currentStep])

  const getStepStatus = (step: CodeStep) => {
    if (completedSteps.includes(step.id)) return 'completed'
    if (executingSteps.includes(step.id)) return 'running'
    return 'pending'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'running': return <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Clock className="w-4 h-4 text-blue-500" /></motion.div>
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50'
      case 'running': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white max-h-96 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-4">
        <Terminal className="w-5 h-5 text-blue-400" />
        <span className="text-blue-400 font-semibold">LangGraph 실행 환경</span>
      </div>
      
      <div className="space-y-4">
        {codeSteps.map((step) => {
          const status = getStepStatus(step)
          return (
            <motion.div
              key={step.id}
              className={`border rounded-lg p-4 ${getStatusColor(status)}`}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: status === 'pending' ? 0.3 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start space-x-3 mb-2">
                {getStatusIcon(status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">
                      단계 {step.id}: {step.description}
                    </span>
                    {status === 'running' && (
                      <motion.div
                        className="flex space-x-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                  
                  <pre className="text-xs bg-gray-800 text-gray-300 p-2 rounded overflow-x-auto">
                    {step.code}
                  </pre>
                  
                  {(status === 'completed' || status === 'running') && step.output && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-2 bg-green-900/50 rounded text-xs text-green-400"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <Terminal className="w-3 h-3" />
                          <span>출력:</span>
                        </div>
                        <pre className="whitespace-pre-wrap">{step.output}</pre>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}