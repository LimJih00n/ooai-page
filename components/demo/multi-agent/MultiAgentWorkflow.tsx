'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/multi-agent-scenes'

export default function MultiAgentWorkflow() {
  return (
    <DemoPlayer
      title="Multi-Agent Workflow"
      subtitle="Multiple AI agents collaborate — Planner, DataFetcher, Synthesizer, and ReportGen with human review"
      scenes={scenes}
    />
  )
}
