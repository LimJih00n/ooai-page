'use client'

import React from 'react'
import { ArrowRight, Rocket, Mail, Phone, MapPin, Anchor, Brain, BarChart3, Globe, Waves, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import InteractiveFeatureShowcase from '@/components/diagrams/InteractiveFeatureShowcase'
import ResearchProcessComparison from '@/components/diagrams/ResearchProcessComparison'
import SolutionsOverview from '@/components/diagrams/SolutionsOverview'
import DetailedServiceOfferings from '@/components/diagrams/DetailedServiceOfferings'
import TechStackArchitecture from '@/components/diagrams/TechStackArchitecture'
import DemoShowcase from '@/components/diagrams/DemoShowcase'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 research-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#1B3A5C] to-[#2E6B9E] rounded-full flex items-center justify-center">
                    <Anchor className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">O5I</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="#about" className="text-gray-700 hover:text-[#1B3A5C] px-3 py-2 text-sm font-medium transition-colors">
                    회사소개
                  </a>
                  <a href="#services" className="text-gray-700 hover:text-[#1B3A5C] px-3 py-2 text-sm font-medium transition-colors">
                    서비스
                  </a>
                  <a href="#solutions" className="text-gray-700 hover:text-[#1B3A5C] px-3 py-2 text-sm font-medium transition-colors">
                    솔루션
                  </a>
                  <a href="#technology" className="text-gray-700 hover:text-[#1B3A5C] px-3 py-2 text-sm font-medium transition-colors">
                    기술
                  </a>
                  <a href="#demos" className="text-gray-700 hover:text-[#1B3A5C] px-3 py-2 text-sm font-medium transition-colors">
                    데모
                  </a>
                  <a href="#pricing" className="text-gray-700 hover:text-[#1B3A5C] px-3 py-2 text-sm font-medium transition-colors">
                    가격
                  </a>
                  <a href="#contact" className="text-gray-700 hover:text-[#1B3A5C] px-3 py-2 text-sm font-medium transition-colors">
                    문의
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Button asChild variant="research" className="shadow-lg">
                <a href="#contact">
                  무료 상담 신청
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <Badge variant="research" className="mb-6 animate-fade-up flex items-center justify-center gap-2 mx-auto w-fit">
                <span>해양과학기술 AI 전문 기업</span>
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-up">
                <span className="gradient-text">Agentic AI</span> 기반
                <br />
                해양과학기술 플랫폼
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-up">
                AI 에이전트가 정보를 수집·분석·보고하는{' '}
                <span className="font-semibold text-[#1B3A5C]">연구 및 업무효율화 플랫폼</span>
                <br />
                <span className="text-lg text-gray-500">R&D 과제공고, 금융시황, 법률동향까지 자동으로 브리핑합니다</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
                <Button asChild variant="research" size="xl" className="group">
                  <a href="#contact">
                    무료 상담 신청
                    <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <a href="#services">
                  <Button variant="research-outline" size="xl" className="group">
                    서비스 둘러보기
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>

              {/* Key Stats */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center glass p-6 rounded-xl">
                  <div className="text-4xl font-bold text-[#1B3A5C] mb-2">90%</div>
                  <div className="text-gray-600">시간 절약</div>
                  <div className="text-xs text-gray-500 mt-1">정보 수집 → 분석 → 보고서 자동화</div>
                </div>
                <div className="text-center glass p-6 rounded-xl">
                  <div className="text-4xl font-bold text-[#2E6B9E] mb-2">24/7</div>
                  <div className="text-gray-600">무중단 모니터링</div>
                  <div className="text-xs text-gray-500 mt-1">AI 에이전트 상시 가동</div>
                </div>
                <div className="text-center glass p-6 rounded-xl">
                  <div className="text-4xl font-bold text-[#D4A52D] mb-2">5x</div>
                  <div className="text-gray-600">분석 속도 향상</div>
                  <div className="text-xs text-gray-500 mt-1">병렬 처리 + AI 최적화</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                오오아이(O5I)를 소개합니다
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                해양과학기술과 AI의 융합으로 새로운 가치를 창출합니다
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">우리의 비전</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  O5I(오오아이)는 <span className="font-semibold text-[#1B3A5C]">Agentic AI 기술</span>을 활용하여
                  해양과학기술 분야의 연구 생산성을 혁신하고, 기업과 기관의 업무 효율을 극대화하는
                  AI 전문 기업입니다.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  자율형 AI 에이전트가 데이터 수집부터 분석, 보고서 작성까지 전 과정을 자동화하여,
                  전문가들이 핵심 의사결정에 집중할 수 있는 환경을 만듭니다.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="glass p-6 rounded-xl text-center">
                  <Brain className="w-10 h-10 text-[#1B3A5C] mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Agentic AI</h4>
                  <p className="text-sm text-gray-600">자율형 AI 에이전트 기반 자동화</p>
                </div>
                <div className="glass p-6 rounded-xl text-center">
                  <Waves className="w-10 h-10 text-[#2E6B9E] mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">해양과학</h4>
                  <p className="text-sm text-gray-600">해양 데이터 분석 전문성</p>
                </div>
                <div className="glass p-6 rounded-xl text-center">
                  <BarChart3 className="w-10 h-10 text-[#D4A52D] mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">정보분석</h4>
                  <p className="text-sm text-gray-600">맞춤형 정보 브리핑 서비스</p>
                </div>
                <div className="glass p-6 rounded-xl text-center">
                  <Shield className="w-10 h-10 text-[#1B3A5C] mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">보안</h4>
                  <p className="text-sm text-gray-600">온프레미스 배포 지원</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                정보분석 서비스
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AI 에이전트가 매일 핵심 정보를 수집·분석하여 이메일로 브리핑합니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-[#1B3A5C]/10 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-[#1B3A5C]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">R&D 과제공고</h3>
                <p className="text-gray-600 mb-4">
                  정부·공공기관 R&D 과제공고를 실시간 모니터링하고 관심 분야에 맞는 공고를 선별하여 브리핑합니다.
                </p>
                <Badge variant="research">기본 서비스</Badge>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-[#2E6B9E]/10 rounded-xl flex items-center justify-center mb-6">
                  <Waves className="w-7 h-7 text-[#2E6B9E]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">ODA 사업동향</h3>
                <p className="text-gray-600 mb-4">
                  해양·환경 분야 ODA 사업 동향과 국제기구 프로젝트 정보를 분석하여 보고합니다.
                </p>
                <Badge variant="research">기본 서비스</Badge>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-[#D4A52D]/10 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-[#D4A52D]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">연구과제 기획지원</h3>
                <p className="text-gray-600 mb-4">
                  RFP 분석, 유사과제 이력 조사, 연구 트렌드 파악으로 과제 기획서 작성을 지원합니다.
                </p>
                <Badge variant="research">표준 이상</Badge>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-[#1B3A5C]/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-[#1B3A5C]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">법률·규제 동향</h3>
                <p className="text-gray-600 mb-4">
                  해양·환경 관련 법률 개정, 규제 변화, 정책 동향을 추적하여 알려드립니다.
                </p>
                <Badge variant="secondary">표준 이상</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <DemoShowcase />

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <InteractiveFeatureShowcase />
        </section>

        {/* Process Comparison */}
        <section id="process-comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <ResearchProcessComparison />
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 research-gradient">
          <SolutionsOverview />
        </section>

        {/* Technology Section */}
        <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 research-gradient">
          <TechStackArchitecture />
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <DetailedServiceOfferings />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1B3A5C] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                문의하기
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                서비스에 대해 궁금한 점이 있으시면 언제든 연락해 주세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Mail className="w-10 h-10 text-[#D4A52D] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">이메일</h3>
                <a href="mailto:contact@ocean5i.com" className="text-blue-200 hover:text-white transition-colors">
                  contact@ocean5i.com
                </a>
              </div>
              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Phone className="w-10 h-10 text-[#D4A52D] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">전화</h3>
                <a href="tel:070-0000-0000" className="text-blue-200 hover:text-white transition-colors">
                  070-0000-0000
                </a>
              </div>
              <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <MapPin className="w-10 h-10 text-[#D4A52D] mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">주소</h3>
                <p className="text-blue-200">
                  부산광역시 해운대구
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="xl" className="border-white text-white hover:bg-white/10 group">
                <a href="mailto:contact@ocean5i.com">
                  무료 상담 요청하기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#1B3A5C] to-[#2E6B9E] rounded-full flex items-center justify-center">
                  <Anchor className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">O5I</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Agentic AI 기반 해양과학기술 연구 및 업무효율화 플랫폼.
                AI 에이전트가 정보를 수집·분석·보고합니다.
              </p>
              <p className="text-sm text-gray-500">
                주식회사 오오아이 (O5I Inc.)
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-300">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">정보분석 서비스</a></li>
                <li><a href="#solutions" className="hover:text-white transition-colors">연구 자동화</a></li>
                <li><a href="#demos" className="hover:text-white transition-colors">기술 데모</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">가격 안내</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-300">회사</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">회사소개</a></li>
                <li><a href="#technology" className="hover:text-white transition-colors">기술</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">문의하기</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} O5I Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
