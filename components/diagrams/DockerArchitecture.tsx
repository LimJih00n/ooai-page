'use client'

import { Database, Container, Zap, Shield, ChevronDown, Lock, RefreshCw, Package } from 'lucide-react'
import { motion } from 'framer-motion'

// Docker 고래 아이콘 SVG 컴포넌트
const DockerWhale = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 640 512" fill="currentColor">
    <path d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9z"/>
  </svg>
)

export default function DockerArchitecture() {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col items-center space-y-8">
        {/* Title with Docker Whale */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <DockerWhale className="w-10 h-10 text-blue-500" />
            <h3 className="text-2xl font-bold text-gray-900">
              Docker 기반 연구 환경 아키텍처
            </h3>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            컨테이너화로 실현하는 완벽한 재현성 - “내 컴퓨터에서는 됐는데” 문제를 영원히 해결
          </p>
        </div>

        {/* Docker Concept Explanation */}
        <div className="w-full bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">환경을 패키징</h4>
              <p className="text-sm text-gray-600">운영체제부터 라이브러리까지 전체 연구 환경을 하나의 이미지로</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Container className="w-8 h-8 text-slate-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">격리된 실행</h4>
              <p className="text-sm text-gray-600">호스트 시스템과 완전히 분리된 안전한 실행 환경</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">어디서나 실행</h4>
              <p className="text-sm text-gray-600">동일한 환경을 어떤 컴퓨터에서든 정확히 재현</p>
            </div>
          </div>
        </div>
        
        {/* Architecture Layers */}
        <div className="w-full space-y-4">
          {/* Research Applications Layer */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-blue-400"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">연구 애플리케이션 레이어</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">Jupyter Lab</div>
                <div className="text-xs text-gray-600">대화형 분석 환경</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">Gemini CLI</div>
                <div className="text-xs text-gray-600">AI 코딩 파트너</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">연구 스크립트</div>
                <div className="text-xs text-gray-600">분석 파이프라인</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Flow Arrow */}
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </motion.div>
          </div>

          {/* Python Environment Layer */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-blue-50/50 rounded-lg p-6 border-l-4 border-indigo-400"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">파이썬 환경 레이어</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">Conda/Mamba</div>
                <div className="text-xs text-gray-600">패키지 관리</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">Xarray</div>
                <div className="text-xs text-gray-600">다차원 데이터</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">Cartopy</div>
                <div className="text-xs text-gray-600">지리 시각화</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">과학 라이브러리</div>
                <div className="text-xs text-gray-600">NumPy, Pandas</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Flow Arrow */}
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </motion.div>
          </div>

          {/* Container Runtime Layer */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-indigo-50/50 rounded-lg p-6 border-l-4 border-slate-400"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Container className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">컨테이너 런타임 레이어</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">Docker Engine</div>
                <div className="text-xs text-gray-600">컨테이너 실행 환경</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">이미지 레지스트리</div>
                <div className="text-xs text-gray-600">버전 관리 및 배포</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Flow Arrow */}
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </motion.div>
          </div>

          {/* Infrastructure Layer */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-50/50 rounded-lg p-6 border-l-4 border-gray-400"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">인프라스트럭처 레이어</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">로컬 워크스테이션</div>
                <div className="text-xs text-gray-600">연구자 개인 환경</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">연구실 서버</div>
                <div className="text-xs text-gray-600">공유 컴퓨팅 자원</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">HPC 클러스터</div>
                <div className="text-xs text-gray-600">대규모 계산</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Key Benefits */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full bg-slate-900 text-white rounded-lg p-6 mt-8"
        >
          <h4 className="text-lg font-bold mb-4 text-center">핵심 이점</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center cursor-pointer"
            >
              <div className="flex items-center justify-center mb-2">
                <Lock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="font-semibold mb-1">완전한 격리</div>
              <div className="opacity-90">의존성 충돌 방지</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center cursor-pointer"
            >
              <div className="flex items-center justify-center mb-2">
                <RefreshCw className="w-5 h-5 text-green-400" />
              </div>
              <div className="font-semibold mb-1">재현 가능성</div>
              <div className="opacity-90">비트 단위 동일한 환경</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center cursor-pointer"
            >
              <div className="flex items-center justify-center mb-2">
                <Package className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="font-semibold mb-1">이식성</div>
              <div className="opacity-90">어디서나 동일하게 실행</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}