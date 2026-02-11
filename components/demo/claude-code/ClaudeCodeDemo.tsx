'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/claude-code-scenes'

export default function ClaudeCodeDemo() {
  return (
    <DemoPlayer
      title="Claude Code"
      subtitle="AI coding assistant that scans your project, generates code, reviews it, and executes — all in one flow"
      scenes={scenes}
    />
  )
}
