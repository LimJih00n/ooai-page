export interface TerminalLine {
  text: string
  type: 'command' | 'output' | 'success' | 'error' | 'comment'
}

export interface CodeLine {
  text: string
  highlight?: boolean
}

export interface Scene {
  id: string
  windowType: 'terminal' | 'code' | 'browser' | 'document'
  windowProps: TerminalWindowProps | CodeEditorWindowProps | BrowserWindowProps | DocumentWindowProps
  bubble: {
    speaker: 'ai' | 'researcher' | 'system'
    text: string
  }
  duration: number // ms
}

export interface TerminalWindowProps {
  title: string
  lines: TerminalLine[]
  lineDelay?: number // optional: custom delay weight per line
}

export interface CodeEditorWindowProps {
  fileName: string
  language: string
  code: string
  highlightLines?: number[]
}

export interface BrowserWindowProps {
  url: string
  title: string
  content: string
  richContent?: RichContentBlock[] // optional: pre-parsed structured content
}

export interface DocumentWindowProps {
  title: string
  content: string
}

// Rich content block types for structured rendering
export type RichContentBlock =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'table'; headers: string[]; alignments: ('left' | 'center' | 'right')[]; rows: string[][] }
  | { type: 'list'; items: string[] }
  | { type: 'blockquote'; text: string }
  | { type: 'hr' }
  | { type: 'empty' }
