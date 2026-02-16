'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Scene, TerminalWindowProps, CodeEditorWindowProps, BrowserWindowProps, DocumentWindowProps } from './types'
import TerminalWindow from './TerminalWindow'
import CodeEditorWindow from './CodeEditorWindow'
import BrowserWindow from './BrowserWindow'
import DocumentWindow from './DocumentWindow'
import SpeechBubble from './SpeechBubble'

interface Props {
  title: string
  subtitle: string
  scenes: Scene[]
}

function renderWindow(scene: Scene, progress: number) {
  switch (scene.windowType) {
    case 'terminal': {
      const p = scene.windowProps as TerminalWindowProps
      return <TerminalWindow title={p.title} lines={p.lines} progress={progress} />
    }
    case 'code': {
      const p = scene.windowProps as CodeEditorWindowProps
      return <CodeEditorWindow fileName={p.fileName} language={p.language} code={p.code} highlightLines={p.highlightLines} progress={progress} />
    }
    case 'browser': {
      const p = scene.windowProps as BrowserWindowProps
      return <BrowserWindow url={p.url} title={p.title} content={p.content} progress={progress} />
    }
    case 'document': {
      const p = scene.windowProps as DocumentWindowProps
      return <DocumentWindow title={p.title} content={p.content} progress={progress} />
    }
  }
}

export default function DemoPlayer({ title, subtitle, scenes }: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1) // -1 = not started
  const [isPlaying, setIsPlaying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0) // 0-1 within current scene

  const rafRef = useRef<number>(0)
  const progressRef = useRef(0) // real-time progress for pause capture
  const pausedProgressRef = useRef(0) // saved progress when paused

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => {
      const next = prev + 1
      if (next >= scenes.length) {
        setIsPlaying(false)
        setIsComplete(true)
        // Keep progress at 1 so last scene stays fully visible
        return prev
      }
      // Reset progress for next scene
      pausedProgressRef.current = 0
      return next
    })
  }, [scenes.length])

  // rAF animation loop
  useEffect(() => {
    if (!isPlaying || currentIndex < 0 || currentIndex >= scenes.length) return

    const duration = scenes[currentIndex].duration
    const startTime = performance.now() - (pausedProgressRef.current * duration)

    const animate = (now: number) => {
      const elapsed = now - startTime
      const p = Math.min(elapsed / duration, 1)
      progressRef.current = p
      setProgress(p)

      if (p >= 1) {
        goToNext()
        return
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPlaying, currentIndex, scenes, goToNext])

  const handlePlay = () => {
    if (isComplete) {
      // Restart from beginning
      setCurrentIndex(0)
      setIsComplete(false)
      setProgress(0)
      pausedProgressRef.current = 0
      setIsPlaying(true)
      return
    }
    if (currentIndex < 0) {
      setCurrentIndex(0)
      pausedProgressRef.current = 0
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    pausedProgressRef.current = progressRef.current
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setIsComplete(false)
    setCurrentIndex(-1)
    setProgress(0)
    pausedProgressRef.current = 0
  }

  const scene = currentIndex >= 0 && currentIndex < scenes.length ? scenes[currentIndex] : null

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2 text-lg">{subtitle}</p>
      </div>

      {/* Window area */}
      <div className="relative min-h-[380px]">
        <AnimatePresence mode="wait">
          {scene ? (
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              {renderWindow(scene, progress)}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[380px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
            >
              <div className="text-center text-gray-400">
                <Play size={48} className="mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">Play to start the demo</p>
                <p className="text-sm mt-1">{scenes.length} scenes</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Speech bubble */}
      <div className="min-h-[72px]">
        <AnimatePresence mode="wait">
          {scene && (
            <motion.div
              key={scene.id + '-bubble'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SpeechBubble speaker={scene.bubble.speaker} text={scene.bubble.text} progress={progress} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {/* Play / Pause button */}
        {isComplete ? (
          <Button onClick={handlePlay} size="lg" className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <RotateCcw size={18} className="mr-2" />
            Replay
          </Button>
        ) : isPlaying ? (
          <Button onClick={handlePause} variant="outline" size="lg" className="px-8">
            <Pause size={18} className="mr-2" />
            Pause
          </Button>
        ) : (
          <Button onClick={handlePlay} size="lg" className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Play size={18} className="mr-2" />
            {currentIndex > 0 ? 'Resume' : 'Start Demo'}
          </Button>
        )}

        {/* Reset */}
        {currentIndex > 0 && !isComplete && (
          <Button onClick={handleReset} variant="ghost" size="lg">
            <RotateCcw size={18} className="mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Progress dots */}
      {currentIndex >= 0 && (
        <div className="flex items-center justify-center gap-1.5">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentIndex(i)
                setIsPlaying(false)
                setIsComplete(false)
                setProgress(1) // Show jumped-to scene fully
                pausedProgressRef.current = 1
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : i < currentIndex
                    ? 'bg-blue-300'
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
