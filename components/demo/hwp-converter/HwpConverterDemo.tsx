'use client'

import { DemoPlayer } from '@/components/demo/shared'
import { scenes } from '@/components/demo/scenes/hwp-converter-scenes'

export default function HwpConverterDemo() {
  return (
    <DemoPlayer
      title="HWP 문서 자동변환"
      subtitle="DOCX, Markdown을 한글(HWP)로 변환합니다. 정부과제 양식 스타일 자동 적용, 다중 파일 병합 지원"
      scenes={scenes}
    />
  )
}
