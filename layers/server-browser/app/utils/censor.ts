import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity'

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
})

export type CensoredSegment = { text: string; censored: boolean }
type Range = { start: number; end: number }

function findProfaneRanges(text: string): Range[] {
  const ranges: Range[] = []

  for (const match of matcher.getAllMatches(text, true)) {
    const start = match.startIndex
    const end = match.endIndex + 1

    const previous = ranges.at(-1)
    if (previous && start <= previous.end) previous.end = Math.max(previous.end, end)
    else ranges.push({ start, end })
  }

  return ranges
}

export function censorProfanity(text: string): CensoredSegment[] | null {
  const ranges = findProfaneRanges(text)
  if (ranges.length === 0) return null

  const segments: CensoredSegment[] = []
  let position = 0

  for (const { start, end } of ranges) {
    if (start > position) segments.push({ text: text.slice(position, start), censored: false })
    segments.push({ text: '*'.repeat(end - start), censored: true })
    position = end
  }

  if (position < text.length) segments.push({ text: text.slice(position), censored: false })
  return segments
}

export function createProfanityCensor() {
  const cache = new Map<string, CensoredSegment[] | null>()

  const censor = (text: string) => {
    if (!cache.has(text)) cache.set(text, censorProfanity(text))
    return cache.get(text)!
  }

  return { censor }
}
