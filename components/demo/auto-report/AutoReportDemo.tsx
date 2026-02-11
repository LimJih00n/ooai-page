'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/auto-report-scenes'

export default function AutoReportDemo() {
  return (
    <DemoPlayer
      title="Automated Report Generation"
      subtitle="From 5.8M data points to a conference-ready report — fully automated, fully reproducible"
      scenes={scenes}
    />
  )
}
