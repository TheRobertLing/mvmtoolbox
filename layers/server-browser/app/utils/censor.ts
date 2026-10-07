import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity'

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
})

export type CensoredSegment = { text: string; censored: boolean }

// Splits text into plain and censored runs so censored runs can be styled distinctly from literal asterisks
export function censorProfanity(text: string): CensoredSegment[] {
  const matches = matcher.getAllMatches(text, true)
  const segments: CensoredSegment[] = []
  let cursor = 0

  for (const { startIndex, endIndex } of matches) {
    // endIndex is inclusive; overlapping matches extend the previous censored run
    if (endIndex < cursor) continue
    const start = Math.max(startIndex, cursor)
    if (start > cursor) segments.push({ text: text.slice(cursor, start), censored: false })
    const last = segments.at(-1)
    const stars = '*'.repeat(endIndex + 1 - start)
    if (last?.censored && start === cursor) last.text += stars
    else segments.push({ text: stars, censored: true })
    cursor = endIndex + 1
  }

  if (cursor < text.length) segments.push({ text: text.slice(cursor), censored: false })
  return segments
}
