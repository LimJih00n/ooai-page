'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Container, UserCheck, FileText, Waves, Wind, Users, Terminal, Server, Brain, Cpu } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const demos = [
  {
    title: 'Agentic AI Workspace',
    description: '프로젝트 컨텍스트를 이해하고 복잡한 연구 작업을 자율적으로 계획하고 실행하는 AI 에이전트입니다.',
    icon: Brain,
    href: '/demo/agentic-ai',
    isAvailable: true,
    isNew: true,
  },
  {
    title: 'Claude Code',
    description: 'AI 코딩 어시스턴트가 프로젝트 컨텍스트를 이해하고 연구용 Python 코드를 자동 생성합니다.',
    icon: Terminal,
    href: '/demo/claude-code',
    isAvailable: true,
    isNew: true,
  },
  {
    title: 'MCP Server',
    description: 'Model Context Protocol로 AI가 파일시스템, 데이터베이스, 외부 API에 안전하게 연결합니다.',
    icon: Server,
    href: '/demo/mcp-server',
    isAvailable: true,
    isNew: true,
  },
  {
    title: 'Chl-a 예측 파이프라인',
    description: '위성 데이터 기반 Chlorophyll-a 예측 ML 모델의 학습·검증·배포를 Docker로 자동화하는 파이프라인입니다.',
    icon: Cpu,
    href: '/demo/docker-ml-pipeline',
    isAvailable: true,
    isNew: true,
  },
  {
    title: '다중 에이전트 워크플로우',
    description: 'LangGraph 기반으로 여러 AI 에이전트가 협업하여 연구를 완성하는 과정을 시뮬레이션합니다.',
    icon: Users,
    href: '/demo/multi-agent',
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
    title: 'Docker 완전 재현성',
    description: '어떤 환경에서든 100% 동일한 연구 결과를 보장하는 Docker 기반 기술을 시연합니다.',
    icon: Container,
    href: '/demo/docker-reproducibility',
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
            O5I의 핵심 기술들이 실제 연구 과정에서 어떻게 작동하는지 직접 확인해보세요.
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
              <Card className="h-full flex flex-col group hover:border-blue-500 transition-colors relative">
                {'isNew' in demo && demo.isNew && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    NEW
                  </Badge>
                )}
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
