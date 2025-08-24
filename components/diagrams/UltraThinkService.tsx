'use client'

import { Brain, Database, Microscope, FileText, Users, TrendingUp, Shield, Zap, ArrowRight, CheckCircle, Target, Layers, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UltraThinkService() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
        UltraThink AI 플랫폼 아키텍처
      </h3>
      
      {/* Three Layers Architecture with Flow */}
      <div className="space-y-8">
        {/* Layer 1: Input Layer */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">데이터 입력 레이어</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Microscope className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm font-semibold text-gray-900">실험 데이터</div>
                <div className="text-xs text-gray-600 mt-1">PCR, 분광기, FACS</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <FileText className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm font-semibold text-gray-900">논문 & 문서</div>
                <div className="text-xs text-gray-600 mt-1">PDF, 연구노트</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Database className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm font-semibold text-gray-900">외부 DB</div>
                <div className="text-xs text-gray-600 mt-1">NOAA, Copernicus</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm font-semibold text-gray-900">연구팀 지식</div>
                <div className="text-xs text-gray-600 mt-1">노하우, 프로토콜</div>
              </motion.div>
            </div>
          </div>
          
          {/* Flow Arrow */}
          <div className="flex justify-center my-4">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronRight className="w-8 h-8 text-blue-500 rotate-90" />
            </motion.div>
          </div>
        </motion.div>

        {/* Layer 2: Processing Layer */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">UltraThink AI 처리 레이어</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center mb-3">
                  <Layers className="w-5 h-5 text-purple-600 mr-2" />
                  <div className="text-sm font-bold text-gray-900">Multi-Agent System</div>
                </div>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>연구 계획 에이전트</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>데이터 수집 에이전트</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>분석 종합 에이전트</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center mb-3">
                  <Brain className="w-5 h-5 text-purple-600 mr-2" />
                  <div className="text-sm font-bold text-gray-900">Knowledge Graph</div>
                </div>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>실험 관계 매핑</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>실패 학습 시스템</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>패턴 발견 엔진</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-purple-600 mr-2" />
                  <div className="text-sm font-bold text-gray-900">Security & Control</div>
                </div>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>100% 로컬 실행</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>Human-in-the-Loop</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-blue-500 mr-1 mt-0.5" />
                    <span>버전 관리 시스템</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
          
          {/* Flow Arrow */}
          <div className="flex justify-center my-4">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronRight className="w-8 h-8 text-purple-500 rotate-90" />
            </motion.div>
          </div>
        </motion.div>

        {/* Layer 3: Output Layer */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">인사이트 출력 레이어</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Target className="w-6 h-6 text-indigo-600 mb-2" />
                <div className="text-sm font-semibold text-gray-900">실험 제안</div>
                <div className="text-xs text-gray-600 mt-1">다음 단계 추천</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <FileText className="w-6 h-6 text-indigo-600 mb-2" />
                <div className="text-sm font-semibold text-gray-900">자동 보고서</div>
                <div className="text-xs text-gray-600 mt-1">분석 결과 문서화</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <TrendingUp className="w-6 h-6 text-indigo-600 mb-2" />
                <div className="text-sm font-semibold text-gray-900">트렌드 분석</div>
                <div className="text-xs text-gray-600 mt-1">패턴 & 상관관계</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Zap className="w-6 h-6 text-indigo-600 mb-2" />
                <div className="text-sm font-semibold text-gray-900">실시간 알림</div>
                <div className="text-xs text-gray-600 mt-1">이상치 감지</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6"
      >
        <h4 className="text-xl font-bold mb-6 text-center">UltraThink 핵심 성과 지표</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-3xl font-bold mb-2"
            >
              2x
            </motion.div>
            <div className="text-sm opacity-90">연구 속도 향상</div>
          </div>
          <div className="text-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="text-3xl font-bold mb-2"
            >
              95%
            </motion.div>
            <div className="text-sm opacity-90">재현 성공률</div>
          </div>
          <div className="text-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              className="text-3xl font-bold mb-2"
            >
              60%
            </motion.div>
            <div className="text-sm opacity-90">실제 연구 시간</div>
          </div>
          <div className="text-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
              className="text-3xl font-bold mb-2"
            >
              100%
            </motion.div>
            <div className="text-sm opacity-90">데이터 보안</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}