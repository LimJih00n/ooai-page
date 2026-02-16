'use client'

import { useRef, useEffect } from 'react'
import { ArrowLeft, ArrowRight, RotateCw, Lock } from 'lucide-react'
import { parseContentBlocks } from './browser-content-parser'
import type { RichContentBlock } from './types'

interface Props {
  url: string
  title: string
  content: string
  progress?: number // 0-1, default 1 = show all
}

export default function BrowserWindow({ url, title, content, progress = 1 }: Props) {
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
      {/* Chrome bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        {/* Tab */}
        <div className="flex items-center px-4 pt-2">
          <div className="bg-white px-4 py-1.5 rounded-t-lg text-xs text-gray-700 font-medium border border-b-0 border-gray-200 max-w-[200px] truncate">
            {title}
          </div>
        </div>
        {/* Navigation bar */}
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="flex items-center gap-1 text-gray-400">
            <ArrowLeft size={14} />
            <ArrowRight size={14} />
            <RotateCw size={14} />
          </div>
          <div className="flex-1 flex items-center gap-1.5 bg-white rounded-full px-3 py-1 text-xs border border-gray-200">
            <Lock size={10} className="text-gray-400" />
            <span className="text-gray-600 truncate">{url}</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div ref={containerRef} className="bg-white min-h-[280px] max-h-[360px] overflow-y-auto p-6">
        <div className="prose prose-sm max-w-none">
          {blocks.slice(0, visibleBlockCount).map((block, i) => renderBlock(block, i))}
        </div>
      </div>
    </div>
  )
}

function renderBlock(block: RichContentBlock, key: number) {
  switch (block.type) {
    case 'empty':
      return <div key={key} className="h-2" />
    case 'hr':
      return <hr key={key} className="my-3 border-gray-200" />
    case 'heading':
      if (block.level === 1) return <h1 key={key} className="text-xl font-bold text-gray-900 mt-4 mb-2">{block.text}</h1>
      if (block.level === 2) return <h2 key={key} className="text-lg font-bold text-gray-900 mt-4 mb-2">{block.text}</h2>
      return <h3 key={key} className="text-base font-bold text-gray-900 mt-3 mb-1">{block.text}</h3>
    case 'paragraph':
      return <p key={key} className="text-gray-700 text-sm leading-relaxed">{renderInline(block.text)}</p>
    case 'blockquote':
      return <blockquote key={key} className="border-l-4 border-blue-300 pl-3 text-gray-600 text-sm italic">{block.text}</blockquote>
    case 'list':
      return (
        <ul key={key} className="ml-4 list-disc">
          {block.items.map((item, j) => (
            <li key={j} className="text-gray-700 text-sm">{renderInline(item)}</li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div key={key} className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-50">
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    className="px-3 py-2 font-semibold text-gray-700 border-b-2 border-gray-200"
                    style={{ textAlign: block.alignments[j] || 'left' }}
                  >
                    {renderInline(h)}
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
                      className="px-3 py-1.5 text-gray-700 border-b border-gray-100"
                      style={{ textAlign: block.alignments[k] || 'left' }}
                    >
                      {renderInline(cell)}
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

// Render inline markdown: emoji badges → bold → inline code
function renderInline(text: string) {
  // Split on status emojis first
  const emojiPattern = /(🟢|🔴|🟡|✅|⚠️)/g
  const segments = text.split(emojiPattern)

  return segments.map((segment, i) => {
    // Check if this segment is a status emoji → render as colored dot/badge
    if (segment === '🟢') return <span key={i} className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 mx-0.5 align-middle" />
    if (segment === '🔴') return <span key={i} className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 mx-0.5 align-middle" />
    if (segment === '🟡') return <span key={i} className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500 mx-0.5 align-middle" />
    if (segment === '✅') return <span key={i} className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-white text-[9px] font-bold mx-0.5 align-middle">✓</span>
    if (segment === '⚠️') return <span key={i} className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-yellow-500 text-white text-[9px] font-bold mx-0.5 align-middle">!</span>

    // Process bold and code within the text segment
    return <span key={i}>{renderBoldAndCode(segment)}</span>
  })
}

function renderBoldAndCode(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    }
    // Inline code
    const codeParts = part.split(/(`[^`]+`)/g)
    return codeParts.map((cp, j) => {
      if (cp.startsWith('`') && cp.endsWith('`')) {
        return <code key={`${i}-${j}`} className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-pink-600">{cp.slice(1, -1)}</code>
      }
      return <span key={`${i}-${j}`}>{cp}</span>
    })
  })
}
