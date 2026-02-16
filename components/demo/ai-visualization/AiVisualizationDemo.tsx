'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/ai-visualization-scenes'

export default function AiVisualizationDemo() {
  return (
    <DemoPlayer
      title="AI 데이터 시각화"
      subtitle="자연어로 차트와 다이어그램을 요청하면 AI가 코드를 생성하고 렌더링합니다. 지도 시각화도 지원"
      scenes={scenes}
    />
  )
}
