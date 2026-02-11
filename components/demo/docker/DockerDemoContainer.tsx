'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/docker-reproducibility-scenes'

export default function DockerDemoContainer() {
  return (
    <DemoPlayer
      title="Docker Reproducibility"
      subtitle="Dockerfile defines exact environment — same image, same results on any platform"
      scenes={scenes}
    />
  )
}
