// Syntax highlighting using safe tokenizer approach.
// Key principle: NEVER apply regex on text that already contains HTML span tags.
// Each highlighter tokenizes the raw line first, then wraps each token in HTML exactly once.

const PYTHON_KEYWORDS = [
  'import', 'from', 'def', 'class', 'return', 'if', 'elif', 'else',
  'for', 'while', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False',
  'try', 'except', 'finally', 'with', 'as', 'yield', 'lambda', 'pass',
  'break', 'continue', 'raise', 'async', 'await', 'self',
]

const BUILTIN_FUNCTIONS = [
  'print', 'len', 'range', 'open', 'str', 'int', 'float', 'list',
  'dict', 'set', 'tuple', 'map', 'filter', 'zip', 'enumerate',
  'isinstance', 'type', 'super', 'sorted', 'sum', 'min', 'max',
]

const DOCKERFILE_INSTRUCTIONS = [
  'FROM', 'RUN', 'COPY', 'WORKDIR', 'ENV', 'EXPOSE', 'CMD',
  'ENTRYPOINT', 'ARG', 'LABEL', 'ADD', 'VOLUME', 'USER', 'HEALTHCHECK',
]

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function span(cls: string, text: string): string {
  return `<span class="${cls}">${esc(text)}</span>`
}

// Raw span (text already escaped)
function spanRaw(cls: string, html: string): string {
  return `<span class="${cls}">${html}</span>`
}

// ============================================================
// Python
// ============================================================

type Token = { type: 'code' | 'string' | 'comment'; text: string }

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  let buf = ''

  while (i < line.length) {
    const ch = line[i]

    if (ch === '#') {
      if (buf) { tokens.push({ type: 'code', text: buf }); buf = '' }
      tokens.push({ type: 'comment', text: line.substring(i) })
      return tokens
    }

    if (ch === '"' || ch === "'") {
      if (buf) { tokens.push({ type: 'code', text: buf }); buf = '' }
      const triple = line.substring(i, i + 3)
      if ((triple === '"""' || triple === "'''")) {
        const end = line.indexOf(triple, i + 3)
        if (end !== -1) {
          tokens.push({ type: 'string', text: line.substring(i, end + 3) })
          i = end + 3
          continue
        }
      }
      const q = ch
      let j = i + 1
      while (j < line.length) {
        if (line[j] === '\\') { j += 2; continue }
        if (line[j] === q) { j++; break }
        j++
      }
      tokens.push({ type: 'string', text: line.substring(i, j) })
      i = j
      continue
    }

    buf += ch
    i++
  }
  if (buf) tokens.push({ type: 'code', text: buf })
  return tokens
}

// Single-pass tokenizer: split raw text into atomic tokens, color each once, join.
// This avoids ALL sequential-regex-on-HTML bugs.
function highlightPyCode(text: string): string {
  // Match decorators, words, numbers, whitespace, or single chars — in priority order
  const tokens = text.match(/@\w+|\w+|\s+|./g) || []
  return tokens.map((tok, i) => {
    // Decorators
    if (tok.startsWith('@')) return span('text-yellow-300', tok)
    // Pure numbers
    if (/^\d+\.?\d*$/.test(tok)) return span('text-orange-300', tok)
    // Keywords
    if (PYTHON_KEYWORDS.includes(tok)) return span('text-purple-400 font-semibold', tok)
    // Builtin functions (check if next non-space token is "(")
    if (BUILTIN_FUNCTIONS.includes(tok)) {
      const next = tokens.slice(i + 1).find(t => t.trim())
      if (next === '(') return span('text-cyan-300', tok)
    }
    // Function calls (word followed by "(")
    if (/^\w+$/.test(tok)) {
      const next = tokens.slice(i + 1).find(t => t.trim())
      if (next === '(') return span('text-yellow-200', tok)
    }
    return esc(tok)
  }).join('')
}

export function highlightPython(code: string): string {
  return code.split('\n').map(line => {
    const tokens = tokenizeLine(line)
    return tokens.map(t => {
      switch (t.type) {
        case 'comment': return span('text-gray-500 italic', t.text)
        case 'string': return span('text-green-400', t.text)
        case 'code': return highlightPyCode(t.text)
      }
    }).join('')
  }).join('\n')
}

// ============================================================
// Dockerfile — tokenize-first approach
// ============================================================

export function highlightDockerfile(code: string): string {
  return code.split('\n').map(line => {
    // Full-line comment
    if (line.trimStart().startsWith('#')) {
      return span('text-gray-500 italic', line)
    }

    // Tokenize: extract strings, then process code tokens individually
    const tokens = tokenizeLine(line)
    let isFirstWord = true
    return tokens.map(t => {
      if (t.type === 'string') return span('text-green-400', t.text)
      if (t.type === 'comment') return span('text-gray-500 italic', t.text)
      // Code segment: split into sub-tokens for safe highlighting
      const subTokens = t.text.match(/\w+|\s+|./g) || []
      return subTokens.map(st => {
        if (isFirstWord && DOCKERFILE_INSTRUCTIONS.includes(st)) {
          isFirstWord = false
          return span('text-cyan-300 font-semibold', st)
        }
        if (/^\w+$/.test(st)) isFirstWord = false
        return esc(st)
      }).join('')
    }).join('')
  }).join('\n')
}

// ============================================================
// Markdown
// ============================================================

export function highlightMarkdown(code: string): string {
  return code.split('\n').map(line => {
    const escaped = esc(line)

    // Headings
    if (line.match(/^#{1,3}\s/)) {
      return spanRaw('text-cyan-300 font-semibold', escaped)
    }

    let result = escaped

    // List items (dash)
    result = result.replace(/^(\s*- )/, (m) => spanRaw('text-yellow-300', m))

    // Bold **text**
    result = result.replace(/\*\*([^*]+)\*\*/g, (_, inner) =>
      spanRaw('text-white font-semibold', `**${inner}**`))

    // Inline code `text`
    result = result.replace(/`([^`]+)`/g, (_, inner) =>
      spanRaw('text-green-400', `\`${inner}\``))

    // Arrow
    result = result.replace(/(→)/g, (m) => spanRaw('text-gray-500', m))

    return result
  }).join('\n')
}

// ============================================================
// JSON — tokenize-first approach
// ============================================================

export function highlightJSON(code: string): string {
  return code.split('\n').map(line => {
    const tokens = tokenizeLine(line)
    return tokens.map((t, idx) => {
      if (t.type === 'string') {
        const next = tokens[idx + 1]
        const isKey = next && next.type === 'code' && next.text.trimStart().startsWith(':')
        return span(isKey ? 'text-cyan-300' : 'text-green-400', t.text)
      }
      if (t.type === 'comment') return span('text-gray-500 italic', t.text)

      // Code: single-pass token highlighting
      const subTokens = t.text.match(/\w+|\s+|./g) || []
      return subTokens.map(st => {
        if (/^\d+\.?\d*$/.test(st)) return span('text-orange-300', st)
        if (['true', 'false', 'null'].includes(st)) return span('text-purple-400', st)
        return esc(st)
      }).join('')
    }).join('')
  }).join('\n')
}
