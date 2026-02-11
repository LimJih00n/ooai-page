'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/agentic-ai-scenes'

export default function AgenticAIDemo() {
  return (
    <DemoPlayer
      title="Agentic AI Workspace"
      subtitle="AI agent that understands project context, plans complex research tasks, and executes them autonomously"
      scenes={scenes}
    />
  )
}
