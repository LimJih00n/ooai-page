'use client'

import React, { useState } from 'react'
import { ArrowRight, ChevronDown, FileText, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import InteractiveFeatureShowcase from '@/components/diagrams/InteractiveFeatureShowcase'
import ResearchProcessComparison from '@/components/diagrams/ResearchProcessComparison'
import SolutionsOverview from '@/components/diagrams/SolutionsOverview'
import DetailedServiceOfferings from '@/components/diagrams/DetailedServiceOfferings'
import TechStackArchitecture from '@/components/diagrams/TechStackArchitecture'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default function Home() {
  const [showDemos, setShowDemos] = useState(false)

  const demos = [
    { name: '전체 데모 허브', href: '/demo' },
    { name: '다중 AI 에이전트', href: '/demo/multi-agent' },
    { name: 'Docker 완전 재현성', href: '/demo/docker-reproducibility' },
    { name: 'Human-in-the-Loop', href: '/demo/human-loop' },
    { name: '자동 보고서 생성', href: '/demo/auto-report' },
    { name: '[Live] 해양 데이터 수집', href: '/auto-data-demo.html', target: '_blank' },
    { name: '[Live] 대기 데이터 수집', href: '/auto-data-demo-ncei.html', target: '_blank' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 research-pattern">
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-2 bg-white rounded-full"></div>
                      <div className="absolute w-1.5 h-1.5 bg-blue-700 rounded-full left-2"></div>
                      <div className="absolute w-1.5 h-1.5 bg-blue-700 rounded-full right-2"></div>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">LabA</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="#problems" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    연구 현황
                  </a>
                  <a href="#solutions" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    솔루션
                  </a>
                  <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    기능
                  </a>
                  <a href="#technology" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    기술
                  </a>
                  <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    서비스
                  </a>
                  <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                    문의
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Button asChild variant="research" className="shadow-lg">
                <a href="/pilot-application.html">
                  파일럿 프로그램 신청
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <Badge variant="research" className="mb-6 animate-fade-up flex items-center justify-center gap-2 mx-auto w-fit">
                <span>대한민국 연구실을 위한 AI 혁신</span>
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-up">
                연구실의{' '}
                <span className="gradient-text">
                  생산성
                </span>
                을
                <br />
                2배로 높이다
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-up">
                AI와 컨테이너 기술로 구축하는{' '}
                <span className="font-semibold text-blue-600">차세대 연구 플랫폼</span>
                <br />
                <span className="text-lg text-gray-500">재현 가능하고, 자동화되며, 완전히 안전한 연구 환경</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
                <Button asChild variant="research" size="xl" className="group">
                  <a href="/pilot-application.html">
                    무료 연구 환경 진단 신청
                    <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                
                <div className="relative" onMouseEnter={() => setShowDemos(true)} onMouseLeave={() => setShowDemos(false)}>
                  <Button variant="research-outline" size="xl" className="group">
                    기술 데모 보기
                    <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </Button>
                  {showDemos && (
                    <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-2 text-left">
                      {demos.map((demo) => (
                        <a
                          key={demo.href}
                          href={demo.href}
                          target={demo.target || '_self'}
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        >
                          {demo.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <a href="/education-program.html" target="_blank" rel="noopener noreferrer">
                  <Button variant="research-outline" size="xl" className="group">
                    교육 과정 바로가기
                    <FileText className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
              
              {/* Key Stats */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center glass p-6 rounded-xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
                  <div className="text-gray-600">시간 절약</div>
                  <div className="text-xs text-gray-500 mt-1">데이터 수집 → 분석 → 보고서</div>
                </div>
                <div className="text-center glass p-6 rounded-xl">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">5x</div>
                  <div className="text-gray-600">분석 속도 향상</div>
                  <div className="text-xs text-gray-500 mt-1">병렬 처리 + AI 최적화</div>
                </div>
                <div className="text-center glass p-6 rounded-xl">
                  <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600">무중단 AI 지원</div>
                  <div className="text-xs text-gray-500 mt-1">로컬 실행으로 안전 보장</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problems" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          {/* ... content for problems section ... */}
        </section>

        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <InteractiveFeatureShowcase />
        </section>

        <section id="process-comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <ResearchProcessComparison />
        </section>

        <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 research-gradient">
          <SolutionsOverview />
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <DetailedServiceOfferings />
        </section>

        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          {/* ... content for services section ... */}
        </section>

        <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 research-gradient">
          <TechStackArchitecture />
        </section>

        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
          {/* ... content for contact section ... */}
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        {/* ... content for footer ... */}
      </footer>
    </div>
  )
}