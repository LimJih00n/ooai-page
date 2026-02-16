'use client'

import { useRef, useEffect } from 'react'
import { type TerminalLine } from './types'

interface Props {
  title: string
  lines: TerminalLine[]
  progress?: number // 0-1, default 1 = show all (backward compat)
}

const lineColors: Record<TerminalLine['type'], string> = {
  command: 'text-white',
  output: 'text-gray-300',
  success: 'text-green-400',
  error: 'text-red-400',
  comment: 'text-gray-500 italic',
}

export default function TerminalWindow({ title, lines, progress = 1 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const totalLines = lines.length

  // Calculate visible lines based on progress
  let visibleCount = totalLines
  let lastLineCharProgress = 1

  if (progress < 1 && totalLines > 0) {
    const raw = progress * totalLines
    visibleCount = Math.ceil(raw) || 0
    // Progress within the last visible line (0-1)
    lastLineCharProgress = visibleCount > 0 ? raw - (visibleCount - 1) : 0
  }

  // Auto-scroll to bottom when new lines appear
  useEffect(() => {
    if (containerRef.current && progress < 1) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })

  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
      {/* Title bar */}
      <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-xs font-mono ml-2">{title}</span>
      </div>
      {/* Content */}
      <div
        ref={containerRef}
        className="bg-gray-900 p-4 min-h-[280px] max-h-[360px] overflow-y-auto font-[family-name:var(--font-geist-mono)] text-sm leading-relaxed"
      >
        {lines.slice(0, visibleCount).map((line, i) => {
          const isLastVisible = i === visibleCount - 1 && progress < 1

          // For last visible command line: character-by-character typing
          let displayText = line.text
          if (isLastVisible && line.type === 'command') {
            const charCount = Math.ceil(lastLineCharProgress * line.text.length)
            displayText = line.text.slice(0, charCount)
          }

          return (
            <div key={i} className={`${lineColors[line.type]} whitespace-pre-wrap`}>
              {line.type === 'command' && <span className="text-green-400 mr-1">$</span>}
              {line.type === 'comment' && <span className="text-gray-600 mr-1">#</span>}
              {displayText}
              {/* Blinking cursor on last visible line */}
              {isLastVisible && <span className="text-green-400 animate-pulse">_</span>}
            </div>
          )
        })}
        {/* Resting cursor when fully displayed */}
        {progress >= 1 && <div className="text-green-400 animate-pulse mt-1">_</div>}
      </div>
    </div>
  )
}
