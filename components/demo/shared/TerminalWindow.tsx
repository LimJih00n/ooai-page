import { type TerminalLine } from './types'

interface Props {
  title: string
  lines: TerminalLine[]
}

const lineColors: Record<TerminalLine['type'], string> = {
  command: 'text-white',
  output: 'text-gray-300',
  success: 'text-green-400',
  error: 'text-red-400',
  comment: 'text-gray-500 italic',
}

export default function TerminalWindow({ title, lines }: Props) {
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
      <div className="bg-gray-900 p-4 min-h-[280px] max-h-[360px] overflow-y-auto font-[family-name:var(--font-geist-mono)] text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={`${lineColors[line.type]} whitespace-pre-wrap`}>
            {line.type === 'command' && <span className="text-green-400 mr-1">$</span>}
            {line.type === 'comment' && <span className="text-gray-600 mr-1">#</span>}
            {line.text}
          </div>
        ))}
        <div className="text-green-400 animate-pulse mt-1">_</div>
      </div>
    </div>
  )
}
