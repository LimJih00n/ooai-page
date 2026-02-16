'use client'

import { useRef, useEffect } from 'react'
import { FileText } from 'lucide-react'
import { parseContentBlocks } from './browser-content-parser'
import type { RichContentBlock } from './types'

interface Props {
  title: string
  content: string
  progress?: number // 0-1, default 1 = show all
}

export default function DocumentWindow({ title, content, progress = 1 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const blocks = parseContentBlocks(content)
  const totalBlocks = blocks.length
  const visibleBlockCount = totalBlocks > 0 ? Math.ceil(progress * totalBlocks) : 0

  // Auto-scroll when new blocks appear
  useEffect(() => {
    if (containerRef.current && progress < 1) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })

  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-200">
      {/* Document header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 flex items-center gap-3 border-b border-gray-200">
        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
          <FileText size={16} className="text-blue-600" />
        </div>
        <span className="text-sm font-medium text-gray-800">{title}</span>
      </div>
      {/* Paper-style content */}
      <div ref={containerRef} className="bg-white min-h-[280px] max-h-[360px] overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-6">
          {blocks.slice(0, visibleBlockCount).map((block, i) => renderDocBlock(block, i))}
        </div>
      </div>
    </div>
  )
}

function renderDocBlock(block: RichContentBlock, key: number) {
  switch (block.type) {
    case 'empty':
      return <div key={key} className="h-3" />
    case 'hr':
      return <hr key={key} className="my-4 border-gray-200" />
    case 'heading':
      if (block.level === 1) return <h1 key={key} className="text-lg font-bold text-gray-900 mt-4 mb-3 text-center">{block.text}</h1>
      if (block.level === 2) return <h2 key={key} className="text-base font-bold text-gray-900 mt-5 mb-2 border-b-2 border-blue-100 pb-1">{block.text}</h2>
      return <h3 key={key} className="text-sm font-bold text-gray-800 mt-4 mb-1 border-b border-gray-100 pb-1">{block.text}</h3>
    case 'paragraph':
      return <p key={key} className="text-gray-700 text-xs leading-relaxed">{renderDocInline(block.text)}</p>
    case 'blockquote':
      return <blockquote key={key} className="border-l-3 border-blue-200 pl-3 text-gray-500 text-xs italic my-2">{block.text}</blockquote>
    case 'list':
      return (
        <ul key={key} className="ml-4 list-disc">
          {block.items.map((item, j) => (
            <li key={j} className="text-gray-700 text-xs leading-relaxed">{renderDocInline(item)}</li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div key={key} className="overflow-x-auto my-3">
          <table className="w-full text-xs border-collapse border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-50">
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    className="px-2 py-1.5 font-semibold text-gray-700 border-b-2 border-gray-200"
                    style={{ textAlign: block.alignments[j] || 'left' }}
                  >
                    {renderDocInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      className="px-2 py-1 text-gray-700 border-b border-gray-100"
                      style={{ textAlign: block.alignments[k] || 'left' }}
                    >
                      {renderDocInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

function renderDocInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}
