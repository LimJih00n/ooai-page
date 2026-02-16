'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Waves, BarChart3, Zap, MapPin, Phone, Mail } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1B3A5C] to-[#2E6B9E] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B3A5C]/10 to-transparent"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4A52D]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-[#8BBAD6]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Image
                src="https://lh3.googleusercontent.com/d/1mMXhPzyfrtkhpsMkjrjOPLHuU426bvu-"
                alt="O5I Ocean5I Logo"
                width={180}
                height={60}
                className="mx-auto lg:mx-0"
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              <span className="gradient-text">AI가 연결하는</span>
              <br />
              바다와 기술
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-[#8BBAD6] mb-8 leading-relaxed font-medium"
            >
              Agentic AI 기반 해양과학기술 연구 및
              <br className="hidden sm:block" />
              업무효율화 플랫폼
            </motion.p>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-12"
            >
              <div className="flex items-center gap-2 text-white/90">
                <Zap className="w-5 h-5 text-[#D4A52D]" />
                <span className="text-sm font-medium">AI 에이전트 자동화</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <BarChart3 className="w-5 h-5 text-[#D4A52D]" />
                <span className="text-sm font-medium">데이터 분석 서비스</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Waves className="w-5 h-5 text-[#D4A52D]" />
                <span className="text-sm font-medium">해양과학기술</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12"
            >
              <Button 
                variant="research" 
                size="lg"
                className="bg-[#D4A52D] hover:bg-[#B8931F] text-[#1B3A5C] font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                무료 상담 신청
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="research-outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                서비스 둘러보기
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 text-[#8BBAD6] text-sm"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>부산 해양 허브</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>010-5160-6735</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>ocean5i@ocean5i.com</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-8 h-[500px] sm:h-[600px] relative overflow-hidden">
              {/* Ocean Data Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Animated Ocean Waves */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#8BBAD6]/30 to-transparent rounded-b-2xl"
                  >
                    <Waves className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 text-[#8BBAD6]/60" />
                  </motion.div>

                  {/* Data Points */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#D4A52D] rounded-full shadow-lg"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#8BBAD6] rounded-full shadow-lg"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ 
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#D4A52D]/80 rounded-full shadow-lg"
                  />

                  {/* AI Network Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.path
                      d="M 100 150 Q 200 100 300 180 T 450 160"
                      stroke="#8BBAD6"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.path
                      d="M 150 250 Q 250 200 350 280 T 500 260"
                      stroke="#D4A52D"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="3,3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </svg>

                  {/* Central AI Hub */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A52D] to-[#8BBAD6] flex items-center justify-center shadow-2xl">
                      <span className="text-white font-bold text-lg">AI</span>
                    </div>
                  </motion.div>

                  {/* Floating Labels */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm"
                  >
                    해양 데이터 분석
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8
                    }}
                    className="absolute bottom-20 left-8 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm"
                  >
                    AI 자동화
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}