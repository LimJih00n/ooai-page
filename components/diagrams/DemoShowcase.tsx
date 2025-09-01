'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Bot, Container, UserCheck, FileText, Waves, Wind, Users } from 'lucide-react'
import Link from 'next/link'

const demos = [
  {
    title: '다중 에이전트 워크플로우',
    description: 'LangGraph 기반으로 여러 AI 에이전트가 협업하고, 인간이 중간에 개입하여 연구를 완성하는 과정을 시뮬레이션합니다.',
    icon: Users,
    href: '/demo/multi-agent',
    isAvailable: true,
  },
  {
    title: '하이브리드 AI 워크플로우',
    description: 'Jeni, Exaone, Specialist LLM이 각자의 전문성을 발휘하여 최적의 코드를 생성해내는 과정을 보여줍니다.',
    icon: Bot,
    href: '/demo/hybrid-ai-workflow',
    isAvailable: true,
  },
  {
    title: '자동 연구 데모',
    description: '단일 AI 에이전트가 연구 전 과정을 자동화하는 기본적인 과정을 시뮬레이션합니다.',
    icon: Bot,
    href: '/demo',
    isAvailable: true,
  },
  {
    title: 'Docker 완전 재현성',
    description: '어떤 환경에서든 100% 동일한 연구 결과를 보장하는 기술을 시연합니다.',
    icon: Container,
    href: '/demo/docker-reproducibility',
    isAvailable: true,
  },
  {
    title: 'Human-in-the-Loop',
    description: 'AI의 분석 과정에 연구자가 개입하여 결과의 신뢰도를 높이는 협업 워크플로우입니다.',
    icon: UserCheck,
    href: '/demo/human-loop',
    isAvailable: true,
  },
  {
    title: '자동 보고서 생성',
    description: '분석 결과를 바탕으로 논문 수준의 보고서 초안을 자동으로 작성합니다.',
    icon: FileText,
    href: '/demo/auto-report',
    isAvailable: true,
  },
  {
    title: '[Live] 해양 데이터 수집',
    description: 'AI가 Copernicus 위성 데이터 서버에 직접 접속하여 해양 데이터를 수집합니다.',
    icon: Waves,
    href: '/auto-data-demo.html',
    isAvailable: true,
    isExternal: true,
  },
  {
    title: '[Live] 대기 데이터 수집',
    description: 'AI가 NOAA 실시간 API를 호출하여 특정 지역의 대기 데이터를 수집합니다.',
    icon: Wind,
    href: '/auto-data-demo-ncei.html',
    isAvailable: true,
    isExternal: true,
  },
]

export default function DemoShowcase() {
  const availableDemos = demos.filter(demo => demo.isAvailable)

  return (
    <section id="demos" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            기술 데모 허브
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            LabA의 핵심 기술들이 실제 연구 과정에서 어떻게 작동하는지 직접 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableDemos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col group hover:border-blue-500 transition-colors">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <demo.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>{demo.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-gray-600 mb-6 flex-grow">{demo.description}</p>
                  <Button asChild variant="research-outline" className="w-full mt-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {demo.isExternal ? (
                      <a href={demo.href} target="_blank" rel="noopener noreferrer">
                        데모 보기 <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    ) : (
                      <Link href={demo.href}>
                        데모 보기 <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
