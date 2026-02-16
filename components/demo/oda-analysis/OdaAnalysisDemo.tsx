'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/oda-analysis-scenes'

export default function OdaAnalysisDemo() {
  return (
    <DemoPlayer
      title="ODA/국제동향 분석"
      subtitle="KOICA, EDCF, UNDP, World Bank에서 해양/환경 ODA 사업을 수집하고 참여 전략을 분석합니다"
      scenes={scenes}
    />
  )
}
