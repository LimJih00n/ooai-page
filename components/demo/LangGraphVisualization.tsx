'use client'

import { useState, useEffect } from 'react'
import { Brain, Database, BarChart3, Users, ArrowRight, CheckCircle, GitBranch, Settings, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface Node {
  id: string
  type: 'start' | 'agent' | 'condition' | 'end'
  label: string
  position: { x: number; y: number }
  status: 'idle' | 'active' | 'completed'
  icon: any
}

interface Edge {
  from: string
  to: string
  label?: string
  status: 'idle' | 'active' | 'completed'
}

export default function LangGraphVisualization({ currentStep }: { currentStep: number }) {
  const [activeNodes, setActiveNodes] = useState<string[]>([])
  const [activeEdges, setActiveEdges] = useState<string[]>([])

  const nodes: Node[] = [
    { id: 'start', type: 'start', label: '연구 질문 입력', position: { x: 50, y: 150 }, status: 'idle', icon: Users },
    { id: 'planner', type: 'agent', label: '연구 계획가', position: { x: 200, y: 80 }, status: 'idle', icon: Brain },
    { id: 'condition1', type: 'condition', label: '데이터 소스 확인', position: { x: 350, y: 80 }, status: 'idle', icon: Settings },
    { id: 'collector1', type: 'agent', label: '해양 DB 수집', position: { x: 500, y: 50 }, status: 'idle', icon: Database },
    { id: 'collector2', type: 'agent', label: '생태 DB 수집', position: { x: 500, y: 120 }, status: 'idle', icon: Database },
    { id: 'collector3', type: 'agent', label: '논문 검색', position: { x: 500, y: 190 }, status: 'idle', icon: Database },
    { id: 'synthesizer', type: 'agent', label: '분석 종합가', position: { x: 650, y: 120 }, status: 'idle', icon: BarChart3 },
    { id: 'human_review', type: 'agent', label: '인간 검토', position: { x: 800, y: 120 }, status: 'idle', icon: Users },
    { id: 'end', type: 'end', label: '최종 결과', position: { x: 950, y: 150 }, status: 'idle', icon: CheckCircle }
  ]

  const edges: Edge[] = [
    { from: 'start', to: 'planner', status: 'idle' },
    { from: 'planner', to: 'condition1', status: 'idle' },
    { from: 'condition1', to: 'collector1', label: 'Copernicus', status: 'idle' },
    { from: 'condition1', to: 'collector2', label: 'NOAA', status: 'idle' },
    { from: 'condition1', to: 'collector3', label: 'Papers', status: 'idle' },
    { from: 'collector1', to: 'synthesizer', status: 'idle' },
    { from: 'collector2', to: 'synthesizer', status: 'idle' },
    { from: 'collector3', to: 'synthesizer', status: 'idle' },
    { from: 'synthesizer', to: 'human_review', status: 'idle' },
    { from: 'human_review', to: 'end', status: 'idle' }
  ]

  useEffect(() => {
    const stepToNodeMapping = [
      ['start'],
      ['start', 'planner'],
      ['start', 'planner', 'condition1', 'collector1', 'collector2', 'collector3'],
      ['start', 'planner', 'condition1', 'collector1', 'collector2', 'collector3', 'synthesizer', 'human_review', 'end']
    ]

    const stepToEdgeMapping = [
      [],
      ['start-planner'],
      ['start-planner', 'planner-condition1', 'condition1-collector1', 'condition1-collector2', 'condition1-collector3'],
      ['start-planner', 'planner-condition1', 'condition1-collector1', 'condition1-collector2', 'condition1-collector3', 'collector1-synthesizer', 'collector2-synthesizer', 'collector3-synthesizer', 'synthesizer-human_review', 'human_review-end']
    ]

    if (currentStep < stepToNodeMapping.length) {
      setActiveNodes(stepToNodeMapping[currentStep])
      setActiveEdges(stepToEdgeMapping[currentStep])
    }
  }, [currentStep])

  const getNodeColor = (node: Node) => {
    if (activeNodes.includes(node.id)) {
      switch (node.type) {
        case 'start': return 'bg-blue-500 text-white'
        case 'agent': return 'bg-purple-500 text-white'
        case 'condition': return 'bg-indigo-500 text-white'
        case 'end': return 'bg-green-500 text-white'
        default: return 'bg-gray-300'
      }
    }
    return 'bg-gray-200 text-gray-600'
  }

  const getEdgeColor = (edge: Edge) => {
    const edgeId = `${edge.from}-${edge.to}`
    return activeEdges.includes(edgeId) ? 'stroke-blue-500' : 'stroke-gray-300'
  }

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 overflow-auto">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">LangGraph 워크플로우 실행</h3>
        <p className="text-sm text-gray-600">실시간으로 노드와 엣지가 활성화되는 것을 확인하세요</p>
      </div>
      
      <div className="relative w-full h-80" style={{ minWidth: '1000px' }}>
        <svg className="absolute inset-0 w-full h-full">
          {/* Edges */}
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from)
            const toNode = nodes.find(n => n.id === edge.to)
            if (!fromNode || !toNode) return null
            
            return (
              <g key={index}>
                <motion.line
                  x1={fromNode.position.x + 40}
                  y1={fromNode.position.y + 20}
                  x2={toNode.position.x}
                  y2={toNode.position.y + 20}
                  className={`${getEdgeColor(edge)} stroke-2`}
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: activeEdges.includes(`${edge.from}-${edge.to}`) ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                {edge.label && (
                  <text
                    x={(fromNode.position.x + toNode.position.x) / 2 + 20}
                    y={(fromNode.position.y + toNode.position.y) / 2 + 15}
                    className="text-xs fill-gray-600"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon
          return (
            <motion.div
              key={node.id}
              className={`absolute flex items-center space-x-2 px-3 py-2 rounded-lg border-2 ${getNodeColor(node)} ${
                activeNodes.includes(node.id) ? 'border-blue-400 shadow-lg' : 'border-gray-300'
              }`}
              style={{
                left: node.position.x,
                top: node.position.y,
                minWidth: '80px'
              }}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: activeNodes.includes(node.id) ? 1 : 0.8,
                opacity: activeNodes.includes(node.id) ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium truncate">{node.label}</span>
              {activeNodes.includes(node.id) && (
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}