import { FileText } from 'lucide-react'

interface Props {
  title: string
  content: string
}

export default function DocumentWindow({ title, content }: Props) {
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
      <div className="bg-white min-h-[280px] max-h-[360px] overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-6">
          {renderDocument(content)}
        </div>
      </div>
    </div>
  )
}

function renderDocument(content: string) {
  const lines = content.split('\n')
  return lines.map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) return <div key={i} className="h-3" />
    if (trimmed.startsWith('### ')) return <h3 key={i} className="text-sm font-bold text-gray-800 mt-4 mb-1 border-b border-gray-100 pb-1">{trimmed.slice(4)}</h3>
    if (trimmed.startsWith('## ')) return <h2 key={i} className="text-base font-bold text-gray-900 mt-5 mb-2 border-b-2 border-blue-100 pb-1">{trimmed.slice(3)}</h2>
    if (trimmed.startsWith('# ')) return <h1 key={i} className="text-lg font-bold text-gray-900 mt-4 mb-3 text-center">{trimmed.slice(2)}</h1>
    if (trimmed.startsWith('- ')) return <li key={i} className="text-gray-700 text-xs ml-4 list-disc leading-relaxed">{renderBold(trimmed.slice(2))}</li>
    if (trimmed.startsWith('> ')) return <blockquote key={i} className="border-l-3 border-blue-200 pl-3 text-gray-500 text-xs italic my-2">{trimmed.slice(2)}</blockquote>
    if (trimmed.startsWith('---')) return <hr key={i} className="my-4 border-gray-200" />
    return <p key={i} className="text-gray-700 text-xs leading-relaxed">{renderBold(trimmed)}</p>
  })
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}
