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
}

export interface DocumentWindowProps {
  title: string
  content: string
}
