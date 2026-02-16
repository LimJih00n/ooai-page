'use client'

import { useRef, useEffect } from 'react'
import { highlightPython, highlightDockerfile, highlightJSON, highlightMarkdown } from './syntax-highlight'

interface Props {
  fileName: string
  language: string
  code: string
  highlightLines?: number[]
  progress?: number // 0-1, default 1 = show all
}

const fileIcons: Record<string, string> = {
  py: 'text-yellow-400',
  ts: 'text-blue-400',
  js: 'text-yellow-300',
  json: 'text-yellow-500',
  md: 'text-blue-300',
  dockerfile: 'text-cyan-400',
  yaml: 'text-red-400',
  toml: 'text-orange-400',
}

function getHighlighter(language: string) {
  switch (language) {
    case 'python': return highlightPython
    case 'dockerfile': return highlightDockerfile
    case 'json': return highlightJSON
    case 'markdown': return highlightMarkdown
    default: return highlightMarkdown
  }
}

export default function CodeEditorWindow({ fileName, language, code, highlightLines = [], progress = 1 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  const iconColor = fileIcons[ext] || fileIcons[language] || 'text-gray-400'
  const highlight = getHighlighter(language)
  const lines = code.split('\n')
  const highlightedLines = highlight(code).split('\n')
  const totalLines = lines.length

  // Calculate visible line count
  const visibleCount = progress < 1 && totalLines > 0
    ? Math.ceil(progress * totalLines) || 0
    : totalLines

  // Auto-scroll when new lines appear
  useEffect(() => {
    if (containerRef.current && progress < 1) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })

  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
      {/* Title bar */}
      <div className="bg-[#2d2d2d] px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        {/* File tab */}
        <div className="ml-4 flex items-center gap-2 bg-[#1e1e1e] px-3 py-1 rounded-t text-xs">
          <span className={iconColor}>
            {ext === 'py' ? 'Py' : ext === 'json' ? '{}' : ext === 'md' ? 'M' : '#'}
          </span>
          <span className="text-gray-300">{fileName}</span>
        </div>
      </div>
      {/* Editor content */}
      <div
        ref={containerRef}
        className="bg-[#1e1e1e] min-h-[280px] max-h-[360px] overflow-y-auto font-[family-name:var(--font-geist-mono)] text-sm leading-relaxed"
      >
        {lines.map((_, i) => {
          const isVisible = i < visibleCount
          const isHighlighted = highlightLines.includes(i + 1)
          const isLastVisible = isVisible && i === visibleCount - 1 && progress < 1

          // Cursor HTML appended to the last visible line
          const codeHtml = isVisible ? (highlightedLines[i] || '') : ''
          const cursorHtml = isLastVisible
            ? '<span class="inline-block w-[2px] h-[1.2em] bg-white animate-pulse align-middle ml-px"></span>'
            : ''

          return (
            <div
              key={i}
              className={`flex transition-opacity duration-150 ${
                isHighlighted && isVisible ? 'bg-yellow-900/30 border-l-2 border-yellow-400' : ''
              } ${!isVisible ? 'opacity-0' : ''}`}
            >
              {/* Line number gutter — always visible for IDE feel */}
              <div className="w-12 flex-shrink-0 text-right pr-4 py-0.5 text-gray-600 select-none text-xs leading-relaxed">
                {i + 1}
              </div>
              {/* Code */}
              <div
                className={`flex-1 py-0.5 pr-4 whitespace-pre ${isVisible ? 'text-gray-300' : ''}`}
                dangerouslySetInnerHTML={{ __html: codeHtml + cursorHtml }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
