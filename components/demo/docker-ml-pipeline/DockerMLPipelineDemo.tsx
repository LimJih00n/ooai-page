'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/docker-ml-pipeline-scenes'

export default function DockerMLPipelineDemo() {
  return (
    <DemoPlayer
      title="Docker ML Pipeline"
      subtitle="End-to-end machine learning pipeline — from data ingestion to model deployment in a GPU container"
      scenes={scenes}
    />
  )
}
