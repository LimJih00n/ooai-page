'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  ArrowRight,
  Users,
  Cpu,
  FileSearch,
  Globe,
  TrendingUp,
  Scale,
  FileOutput,
  BarChart3,
  FlaskConical,
  Target,
  ClipboardList,
  Wrench,
} from 'lucide-react'

type Category = 'all' | 'research-execution' | 'research-planning' | 'research-admin' | 'general'

interface Demo {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  category: Category
  categoryLabel: string
  tags: string[]
}

const categories: { key: Category; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { key: 'all', label: '전체', icon: FlaskConical, color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
  { key: 'research-execution', label: '연구수행', icon: FlaskConical, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  { key: 'research-planning', label: '연구기획', icon: Target, color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
  { key: 'research-admin', label: '연구행정', icon: ClipboardList, color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
  { key: 'general', label: '일반업무', icon: Wrench, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
]

const categoryBadgeColors: Record<string, string> = {
  '연구수행': 'bg-blue-50 text-blue-700 border-blue-200',
  '연구기획': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  '연구행정': 'bg-amber-50 text-amber-700 border-amber-200',
  '일반업무': 'bg-purple-50 text-purple-700 border-purple-200',
}

const demos: Demo[] = [
  // === Research Execution ===
  {
    title: '다중 에이전트 연구 협업',
    description: 'LangGraph 기반 AI 에이전트들이 문헌 검색, 데이터 분석, 결과 종합까지 연구 전 과정을 자율적으로 협업합니다.',
    icon: Users,
    href: '/demo/multi-agent',
    category: 'research-execution',
    categoryLabel: '연구수행',
    tags: ['LangGraph', 'Multi-Agent'],
  },
  {
    title: 'Chl-a 예측 ML 파이프라인',
    description: '위성 데이터 기반 Chlorophyll-a 예측 모델의 학습·검증·배포를 Docker로 자동화하는 재현 가능한 파이프라인입니다.',
    icon: Cpu,
    href: '/demo/docker-ml-pipeline',
    category: 'research-execution',
    categoryLabel: '연구수행',
    tags: ['Docker', 'ML Pipeline'],
  },
  // === Research Planning ===
  {
    title: 'R&D 과제공고 브리핑',
    description: 'NTIS·IRIS·NIPA·KAIA 등 R&D 공고를 자동 수집하고, 기관 프로필 기반으로 적합도를 평가하여 맞춤 브리핑을 제공합니다.',
    icon: FileSearch,
    href: '/demo/rnd-briefing',
    category: 'research-planning',
    categoryLabel: '연구기획',
    tags: ['Auto-Crawl', 'Matching'],
  },
  {
    title: 'ODA 사업 분석',
    description: 'KOICA·EDCF·UNDP·World Bank 등 국제개발협력 사업을 자동 분석하고, 참여 기회를 식별하여 브리핑합니다.',
    icon: Globe,
    href: '/demo/oda-analysis',
    category: 'research-planning',
    categoryLabel: '연구기획',
    tags: ['ODA', 'Global'],
  },
  // === Research Administration ===
  {
    title: '금융경제 시황 리포트',
    description: '글로벌 금융·암호화폐·환율 데이터를 수집하고, 기술 분석(RSI/MACD)을 적용하여 일일·주간 리포트를 자동 생성합니다.',
    icon: TrendingUp,
    href: '/demo/market-report',
    category: 'research-admin',
    categoryLabel: '연구행정',
    tags: ['Finance', 'Auto-Report'],
  },
  {
    title: '법령·정책 변동 추적',
    description: '국회·법제처·해수부·환경부의 법령 제·개정을 실시간 추적하고, AI가 연구 영향도를 분석하여 긴급 알림을 발송합니다.',
    icon: Scale,
    href: '/demo/legal-tracking',
    category: 'research-admin',
    categoryLabel: '연구행정',
    tags: ['Legal', 'Monitoring'],
  },
  // === General ===
  {
    title: 'HWP 문서 변환기',
    description: 'DOCX·MD·PDF 파일을 HWP/HWPX 형식으로 변환합니다. 스타일 템플릿 적용과 대량 일괄 변환을 지원합니다.',
    icon: FileOutput,
    href: '/demo/hwp-converter',
    category: 'general',
    categoryLabel: '일반업무',
    tags: ['HWP', 'Converter'],
  },
  {
    title: 'AI 시각화 생성기',
    description: '자연어 설명만으로 Plotly 차트, Graphviz 다이어그램 등을 AI가 자동 생성합니다. 코딩 없이 연구 시각화를 완성합니다.',
    icon: BarChart3,
    href: '/demo/ai-visualization',
    category: 'general',
    categoryLabel: '일반업무',
    tags: ['Plotly', 'Graphviz'],
  },
]

export default function DemoShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredDemos = activeCategory === 'all'
    ? demos
    : demos.filter(d => d.category === activeCategory)

  return (
    <section id="demos" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            서비스 데모
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O5I의 Agentic AI가 연구의 각 단계에서 어떻게 작동하는지 직접 확인해보세요.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                transition-all duration-200 border
                ${activeCategory === cat.key
                  ? cat.key === 'all'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : cat.key === 'research-execution'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : cat.key === 'research-planning'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : cat.key === 'research-admin'
                          ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                          : 'bg-purple-600 text-white border-purple-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
              {cat.key !== 'all' && (
                <span className={`
                  text-xs px-1.5 py-0.5 rounded-full
                  ${activeCategory === cat.key ? 'bg-white/20' : 'bg-gray-100'}
                `}>
                  {demos.filter(d => d.category === cat.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Demo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDemos.map((demo) => (
              <motion.div
                key={demo.href}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col group hover:shadow-lg hover:border-blue-300 transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <demo.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${categoryBadgeColors[demo.categoryLabel] || ''}`}
                      >
                        {demo.categoryLabel}
                      </Badge>
                    </div>
                    <CardTitle className="text-base leading-snug">{demo.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col pt-0">
                    <p className="text-sm text-gray-500 mb-4 flex-grow leading-relaxed">
                      {demo.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {demo.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      asChild
                      variant="research-outline"
                      className="w-full mt-auto group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                      <Link href={demo.href}>
                        데모 체험 <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
