'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/legal-tracking-scenes'

export default function LegalTrackingDemo() {
  return (
    <DemoPlayer
      title="법률/규제 동향 추적"
      subtitle="해양·환경 관련 법률 변화를 자동 추적하고, 고객 사업 영향도를 분석하여 대응 조치를 제안합니다"
      scenes={scenes}
    />
  )
}
