'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/human-loop-scenes'

export default function HumanLoopDemo() {
  return (
    <DemoPlayer
      title="Human-in-the-Loop"
      subtitle="AI generates initial analysis, researcher provides feedback, AI iterates — collaborative refinement"
      scenes={scenes}
    />
  )
}
