'use client'

import { ArrowRight, Beaker, Brain, Database, GitBranch, Globe, Lightbulb, Lock, MessageCircle, Microscope, PieChart, Rocket, Shield, Users, Zap, Activity, Settings, FileText, Network, BarChart3, Workflow, Timer, TrendingUp, CheckCircle, AlertTriangle, FileX, Clock, Container, Code, Play, Target, Mail, RefreshCw, Bug, Egg } from 'lucide-react'
import { GiButterfly, GiCaterpillar } from 'react-icons/gi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import DockerArchitecture from '@/components/diagrams/DockerArchitecture'
import LangGraphWorkflow from '@/components/diagrams/LangGraphWorkflow'
import UltraThinkService from '@/components/diagrams/UltraThinkService'
import ResearchProcessComparison from '@/components/diagrams/ResearchProcessComparison'
import TechStackArchitecture from '@/components/diagrams/TechStackArchitecture'
import InteractiveFeatureShowcase from '@/components/diagrams/InteractiveFeatureShowcase'
import SolutionsOverview from '@/components/diagrams/SolutionsOverview'
import DetailedServiceOfferings from '@/components/diagrams/DetailedServiceOfferings'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 research-pattern">
      {/* Navigation */}
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
              <Button variant="research" className="shadow-lg">
                파일럿 프로젝트 시작
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="research" className="mb-6 animate-fade-up flex items-center justify-center gap-2 mx-auto w-fit">
              <Microscope className="w-4 h-4" />
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
              <Button variant="research" size="xl" className="group">
                무료 파일럿 시작하기
                <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/demo">
                <Button variant="research-outline" size="xl" className="group">
                  기술 데모 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
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

      {/* Research Problems Section */}
      <section id="problems" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              대한민국 연구실의 현실
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              과학 연구에서 발생하는 체계적인 문제들을 데이터로 확인해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">70%</div>
              <div className="text-gray-600 font-medium mb-2">실험 재현 실패율</div>
              <div className="text-xs text-gray-500">Nature Survey, 1,576명 과학자</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-indigo-200">
              <div className="text-3xl font-bold text-indigo-600 mb-2">23%</div>
              <div className="text-gray-600 font-medium mb-2">실제 연구에 쓰는 시간</div>
              <div className="text-xs text-gray-500">Stanford University 연구</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">14.9개</div>
              <div className="text-gray-600 font-medium mb-2">연구자당 평균 도구 개수</div>
              <div className="text-xs text-gray-500">Software Carpentry 설문</div>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">€102B</div>
              <div className="text-gray-600 font-medium mb-2">EU 연간 데이터 손실 비용</div>
              <div className="text-xs text-gray-500">European Commission</div>
            </Card>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              “내 컴퓨터에서는 됐는데...” 문제
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">의존성 지옥 (Dependency Hell)</h4>
                    <p className="text-gray-600 text-sm">패키지 버전 충돌로 인한 환경 파괴</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileX className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">부정확한 문서화</h4>
                    <p className="text-gray-600 text-sm">README 파일의 불완전한 설치 가이드</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">코드 부패 (Code Rot)</h4>
                    <p className="text-gray-600 text-sm">시간이 지나면서 실행 불가능해지는 분석 스크립트</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">협업의 어려움</h4>
                    <p className="text-gray-600 text-sm">환경 차이로 인한 동료 검토 지연</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <InteractiveFeatureShowcase />
      </section>


      {/* Research Process Comparison Section */}
      <section id="process-comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <ResearchProcessComparison />
      </section>

      {/* Solutions Overview Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 research-gradient">
        <SolutionsOverview />
      </section>

      {/* Detailed Service Offerings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <DetailedServiceOfferings />
      </section>

      {/* Service Tiers Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              3단계 진화 경로
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              연구실의 현재 상황에 맞는 단계별 AI 도입 전략
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tier 1: Catalyst */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-blue-200">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50" />
              <CardHeader className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <GiCaterpillar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-gray-500">
                    <div className="font-semibold">애벌레 단계</div>
                    <div>작지만 강력한 시작</div>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">
                  LabA Catalyst
                  <span className="text-lg text-gray-600 ml-2">(촉매)</span>
                </CardTitle>
                <Badge variant="research" className="w-fit mb-4">
                  The Enabler
                </Badge>
                <CardDescription className="text-base">
                  최소한의 리스크로 Agentic AI의 첫 성공 사례를 만들어내는 기폭제 역할
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    현재 연구 환경 Docker 컨테이너화
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    Command Line Interface 통합 개발환경 구축
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    기본 워크플로우 자동화 스크립트
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    연구진 대상 사용법 교육
                  </li>
                </ul>
                <Button variant="research" className="w-full group">
                  파일럿 시작하기
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Tier 2: Nexus */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-indigo-200 bg-white">
              <div className="absolute -top-1 -left-1 -right-1 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="absolute top-4 right-4">
                <Badge variant="research" className="text-xs">
                  추천
                </Badge>
              </div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Egg className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-gray-500">
                    <div className="font-semibold">번데기 단계</div>
                    <div>내부 혁신의 시기</div>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">
                  LabA Nexus
                  <span className="text-lg text-gray-600 ml-2">(연결점)</span>
                </CardTitle>
                <Badge variant="success" className="w-fit mb-4">
                  The Operator
                </Badge>
                <CardDescription className="text-base">
                  모든 R&D 요소를 하나로 연결하는 중앙 허브로 완전 자동화 실현
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    다중 데이터 소스 자동 수집
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    AI 에이전트 기반 분석 자동화
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    Human-in-the-Loop 검토 시스템
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    연구실 지식 그래프 구축
                  </li>
                </ul>
                <Button variant="research" className="w-full group bg-indigo-600 hover:bg-indigo-700">
                  스케일링 시작
                  <Rocket className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Tier 3: Vanguard */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-purple-200">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50" />
              <CardHeader className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <GiButterfly className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-gray-500">
                    <div className="font-semibold">나비 단계</div>
                    <div>완전한 변태의 실현</div>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">
                  LabA Vanguard
                  <span className="text-lg text-gray-600 ml-2">(선도자)</span>
                </CardTitle>
                <Badge variant="research" className="w-fit mb-4">
                  The Partner
                </Badge>
                <CardDescription className="text-base">
                  R&D 혁명의 최전선에서 업계를 이끄는 전략적 동반자
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    연구실 전체 AI 시스템 설계
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    공동 특허 및 IP 개발
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    장기 기술 로드맵 수립
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    차세대 연구진 AI 교육
                  </li>
                </ul>
                <Button variant="research-outline" className="w-full group border-purple-600 text-purple-600 hover:bg-purple-600">
                  파트너십 논의
                  <MessageCircle className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>어느 단계부터 시작해야 할까요?</span>
              </h3>
              <p className="text-gray-600 mb-4">
                15분 무료 상담으로 연구실에 최적화된 AI 도입 전략을 받아보세요
              </p>
              <Button variant="research" size="lg">
                무료 상담 신청하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Architecture Section */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 research-gradient">
        <TechStackArchitecture />
      </section>

      {/* Technology Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              왜 LabA인가?
            </h2>
            <p className="text-lg text-gray-600">
              기존 AI 도구들과의 핵심 차별점
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-6 font-semibold text-gray-900">핵심 특징</th>
                    <th className="py-4 px-6 font-semibold text-gray-900 text-center">ChatGPT/Claude</th>
                    <th className="py-4 px-6 font-semibold text-gray-900 text-center">LabA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Lock className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">데이터 보안</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="secondary" className="text-xs">외부 클라우드 의존</Badge>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="research" className="text-xs">100% 로컬 실행</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Network className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">실험실 장비 연동</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="secondary" className="text-xs">지원 불가</Badge>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="research" className="text-xs">실시간 IoT 연동</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Database className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-medium text-gray-900">연구실 지식베이스</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="secondary" className="text-xs">일반 지식만</Badge>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="research" className="text-xs">전용 지식그래프</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <RefreshCw className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">실험 재현성</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="secondary" className="text-xs">보장 불가</Badge>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="research" className="text-xs">Docker 완전 재현</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">규제 준수</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="warning" className="text-xs">제한적 준수</Badge>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant="research" className="text-xs">완전 규제 준수</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              연구실 전용으로 설계된 유일한 AI 플랫폼
            </p>
            <Button variant="research" size="lg" className="group">
              차별점 자세히 보기
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            연구실의 AI 혁신을 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            파일럿 프로젝트로 시작해서 연구실 전체의 디지털 트랜스포메이션까지
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 group">
              무료 파일럿 프로젝트 신청
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
              기술 상담 예약하기
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm opacity-80">
            <div className="flex flex-col items-center">
              <Mail className="w-5 h-5 mb-2" />
              <div className="font-semibold mb-1">이메일</div>
              <div>LabA@ocean5i.com</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-5 h-5 mb-2" />
              <div className="font-semibold mb-1">상담 시간</div>
              <div>평일 9:00-18:00</div>
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-5 h-5 mb-2" />
              <div className="font-semibold mb-1">응답 시간</div>
              <div>24시간 내 회신 보장</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-2 bg-white rounded-full"></div>
                  <div className="absolute w-1.5 h-1.5 bg-blue-700 rounded-full left-2"></div>
                  <div className="absolute w-1.5 h-1.5 bg-blue-700 rounded-full right-2"></div>
                </div>
              </div>
              <span className="text-xl font-bold">LabA</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 LabA. 대한민국 연구실을 위한 AI 혁신.</p>
              <p className="mt-1">문의: LabA@ocean5i.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
