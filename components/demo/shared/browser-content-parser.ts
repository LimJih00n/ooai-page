import type { RichContentBlock } from './types'

/**
 * Parse markdown content string into structured blocks.
 * Handles headings, paragraphs, tables, lists, blockquotes, hr, and empty lines.
 */
export function parseContentBlocks(content: string): RichContentBlock[] {
  const lines = content.split('\n')
  const blocks: RichContentBlock[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    // Empty line
    if (!line) {
      blocks.push({ type: 'empty' })
      i++
      continue
    }

    // HR
    if (line.startsWith('---')) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    // Headings (check ### before ## before #)
    if (line.startsWith('### ')) {
      blocks.push({ type: 'heading', level: 3, text: line.slice(4) })
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', level: 2, text: line.slice(3) })
      i++
      continue
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'heading', level: 1, text: line.slice(2) })
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      blocks.push({ type: 'blockquote', text: line.slice(2) })
      i++
      continue
    }

    // Table detection: line starts with | and next line is a separator row
    if (
      line.startsWith('|') &&
      i + 1 < lines.length &&
      /^\|[\s\-:|]+\|/.test(lines[i + 1].trim())
    ) {
      const headers = line
        .split('|')
        .slice(1, -1)
        .map(h => h.trim())

      const sepLine = lines[i + 1].trim()
      const alignments = sepLine
        .split('|')
        .slice(1, -1)
        .map(cell => {
          const c = cell.trim()
          if (c.startsWith(':') && c.endsWith(':')) return 'center' as const
          if (c.endsWith(':')) return 'right' as const
          return 'left' as const
        })

      const rows: string[][] = []
      let j = i + 2
      while (j < lines.length && lines[j].trim().startsWith('|')) {
        const row = lines[j]
          .trim()
          .split('|')
          .slice(1, -1)
          .map(c => c.trim())
        rows.push(row)
        j++
      }

      blocks.push({ type: 'table', headers, alignments, rows })
      i = j
      continue
    }

    // List items — collect consecutive
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      blocks.push({ type: 'list', items })
      continue
    }

    // Default: paragraph
    blocks.push({ type: 'paragraph', text: line })
    i++
  }

  return blocks
}
