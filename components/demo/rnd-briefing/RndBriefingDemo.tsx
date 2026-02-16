'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/rnd-briefing-scenes'

export default function RndBriefingDemo() {
  return (
    <DemoPlayer
      title="R&D 과제공고 브리핑"
      subtitle="정부 R&D 포털에서 과제공고를 자동 수집하고, O5I 역량 기반 적합도 분석 후 브리핑 보고서를 발송합니다"
      scenes={scenes}
    />
  )
}
