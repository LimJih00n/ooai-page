'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/market-report-scenes'

export default function MarketReportDemo() {
  return (
    <DemoPlayer
      title="금융경제 시황 보고서"
      subtitle="매일 아침 암호화폐·증시·환율·원자재 데이터를 수집하고, AI가 기술적 분석과 인사이트를 생성합니다"
      scenes={scenes}
    />
  )
}
