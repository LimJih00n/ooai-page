'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/mcp-server-scenes'

export default function MCPServerDemo() {
  return (
    <DemoPlayer
      title="MCP Server"
      subtitle="Model Context Protocol — the gateway that connects AI to external tools, databases, and APIs"
      scenes={scenes}
    />
  )
}
