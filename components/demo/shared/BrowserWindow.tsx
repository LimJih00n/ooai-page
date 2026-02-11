import { ArrowLeft, ArrowRight, RotateCw, Lock } from 'lucide-react'

interface Props {
  url: string
  title: string
  content: string
}

export default function BrowserWindow({ url, title, content }: Props) {
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
      <div className="bg-white min-h-[280px] max-h-[360px] overflow-y-auto p-6">
        <div className="prose prose-sm max-w-none">
          {renderContent(content)}
        </div>
      </div>
    </div>
  )
}

function renderContent(content: string) {
  const lines = content.split('\n')
  return lines.map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) return <div key={i} className="h-2" />
    if (trimmed.startsWith('### ')) return <h3 key={i} className="text-base font-bold text-gray-900 mt-3 mb-1">{trimmed.slice(4)}</h3>
    if (trimmed.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-gray-900 mt-4 mb-2">{trimmed.slice(3)}</h2>
    if (trimmed.startsWith('# ')) return <h1 key={i} className="text-xl font-bold text-gray-900 mt-4 mb-2">{trimmed.slice(2)}</h1>
    if (trimmed.startsWith('- ')) return <li key={i} className="text-gray-700 text-sm ml-4 list-disc">{renderInline(trimmed.slice(2))}</li>
    if (trimmed.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-blue-300 pl-3 text-gray-600 text-sm italic">{trimmed.slice(2)}</blockquote>
    if (trimmed.startsWith('---')) return <hr key={i} className="my-3 border-gray-200" />
    return <p key={i} className="text-gray-700 text-sm leading-relaxed">{renderInline(trimmed)}</p>
  })
}

function renderInline(text: string) {
  // Bold
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
