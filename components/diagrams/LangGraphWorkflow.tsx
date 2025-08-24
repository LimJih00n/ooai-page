'use client'

import { Brain, Database, BarChart3, Users, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LangGraphWorkflow() {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
        LangGraph 다중 에이전트 워크플로우
      </h3>
      
      {/* Workflow Steps */}
      <div className="relative">
        {/* Connecting Lines - Animated */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 origin-left"
          />
        </div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* Step 1: Research Planner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200 flex-1"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 text-center">연구 계획가</h4>
            <div className="text-sm text-gray-600 text-center space-y-1">
              <div>• 연구 질문 분해</div>
              <div>• 데이터 소스 식별</div>
              <div>• 실행 계획 수립</div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-3 w-full shadow-sm"
            >
              <div className="text-xs text-blue-800 font-mono">
                &ldquo;특정 해역의 해수면 온도와 어종 출현 빈도의 상관관계를 분석하라&rdquo;
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="hidden md:block"
          >
            <ChevronRight className="w-6 h-6 text-gray-400 z-10 bg-white p-1 rounded-full" />
          </motion.div>

          {/* Step 2: Data Collectors */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-purple-200 flex-1"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Database className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 text-center">데이터 수집가</h4>
            <div className="text-sm text-gray-600 text-center space-y-1">
              <div>• 해양 DB 에이전트</div>
              <div>• 생태 DB 에이전트</div>
              <div>• 웹 검색 에이전트</div>
            </div>
            <div className="bg-white rounded-lg p-3 w-full space-y-2 shadow-sm">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-xs bg-blue-100 text-blue-800 p-2 rounded cursor-pointer"
              >
                Copernicus Marine
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-xs bg-indigo-100 text-indigo-800 p-2 rounded cursor-pointer"
              >
                NOAA 데이터
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-xs bg-purple-100 text-purple-800 p-2 rounded cursor-pointer"
              >
                논문 검색
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="hidden md:block"
          >
            <ChevronRight className="w-6 h-6 text-gray-400 z-10 bg-white p-1 rounded-full" />
          </motion.div>

          {/* Step 3: Data Synthesizer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200 flex-1"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 text-center">분석 종합가</h4>
            <div className="text-sm text-gray-600 text-center space-y-1">
              <div>• 다중 모달 분석</div>
              <div>• 상관관계 발견</div>
              <div>• 가설 생성</div>
            </div>
            <div className="bg-white rounded-lg p-3 w-full shadow-sm">
              <div className="text-xs text-indigo-800">
                <div className="flex items-center space-x-1 mb-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>양의 상관관계 0.73 발견</span>
                </div>
                <div className="flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>추가 검증 필요 영역 식별</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            className="hidden md:block"
          >
            <ChevronRight className="w-6 h-6 text-gray-400 z-10 bg-white p-1 rounded-full" />
          </motion.div>

          {/* Step 4: Human Review */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-purple-200 flex-1"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 text-center">인간 검토</h4>
            <div className="text-sm text-gray-600 text-center space-y-1">
              <div>• 전문가 검토</div>
              <div>• 피드백 통합</div>
              <div>• 최종 승인</div>
            </div>
            <div className="bg-white rounded-lg p-3 w-full shadow-sm">
              <div className="text-xs text-purple-800 space-y-1">
                <div>분석 방법론 검증</div>
                <div>추가 분석 요청</div>
                <div>워크플로우 재실행</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg cursor-pointer"
        >
          <h5 className="font-bold text-blue-900 mb-3">상태 기반 실행</h5>
          <div className="text-sm text-blue-800 space-y-1">
            <div>• 전체 워크플로우 상태 추적</div>
            <div>• 중간 결과 영속성 보장</div>
            <div>• 실패 지점에서 재시작 가능</div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg cursor-pointer"
        >
          <h5 className="font-bold text-purple-900 mb-3">제어 가능한 흐름</h5>
          <div className="text-sm text-purple-800 space-y-1">
            <div>• 조건부 분기 및 루프</div>
            <div>• 동적 에이전트 선택</div>
            <div>• 실시간 워크플로우 수정</div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg cursor-pointer"
        >
          <h5 className="font-bold text-indigo-900 mb-3">Human-in-the-Loop</h5>
          <div className="text-sm text-indigo-800 space-y-1">
            <div>• 중요 결정점에서 인간 개입</div>
            <div>• 실시간 피드백 반영</div>
            <div>• 도메인 전문가 검증</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}