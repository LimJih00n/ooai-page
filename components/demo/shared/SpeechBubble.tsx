'use client'

import { motion } from 'framer-motion'
import { Brain, User, Monitor } from 'lucide-react'

interface Props {
  speaker: 'ai' | 'researcher' | 'system'
  text: string
  progress?: number // 0-1, default 1 = show full text
}

const speakerConfig = {
  ai: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    label: 'AI Agent',
    labelColor: 'text-purple-700',
    Icon: Brain,
    arrow: 'border-b-purple-50',
  },
  researcher: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    label: 'Researcher',
    labelColor: 'text-emerald-700',
    Icon: User,
    arrow: 'border-b-emerald-50',
  },
  system: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    label: 'System',
    labelColor: 'text-blue-700',
    Icon: Monitor,
    arrow: 'border-b-blue-50',
  },
}

export default function SpeechBubble({ speaker, text, progress = 1 }: Props) {
  const config = speakerConfig[speaker]
  const { Icon } = config

  // Typing effect: progress 0→0.4 = character by character, 0.4→1 = full text
  const typingProgress = Math.min(progress / 0.4, 1)
  const charCount = Math.ceil(typingProgress * text.length)
  const displayText = progress >= 1 ? text : text.slice(0, charCount)
  const showCursor = progress < 1 && progress < 0.4

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-start gap-3"
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full ${config.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <Icon size={16} className={config.iconColor} />
      </div>
      {/* Bubble */}
      <div className="relative flex-1">
        {/* Arrow */}
        <div className={`absolute -left-2 top-3 w-0 h-0 border-4 border-transparent ${config.arrow} rotate-[-90deg]`} />
        <div className={`${config.bg} ${config.border} border rounded-lg px-4 py-2.5`}>
          <span className={`text-[10px] font-semibold ${config.labelColor} uppercase tracking-wide`}>
            {config.label}
          </span>
          <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">
            {displayText}
            {showCursor && <span className="inline-block w-[2px] h-[1em] bg-gray-400 animate-pulse align-middle ml-0.5" />}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
