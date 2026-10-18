
import type { GameId, Grade } from '../types'
import { starsForResult } from '../data/games'

type StarProgress = Record<string, number>

const STORAGE_KEY = 'english-adventure-stars'

function getStorageKey(grade: Grade): string {
  return `${STORAGE_KEY}-${grade}`
}

export function loadStarProgress(grade: Grade): StarProgress {
  try {
    const saved = localStorage.getItem(getStorageKey(grade))
    if (!saved) return {}
    const parsed: unknown = JSON.parse(saved)

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }

    const progress: StarProgress = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'number' && Number.isInteger(value) &&
          value >= 0 && value <= 3) {
        progress[key] = value
      }
    }
    return progress
  } catch {
    return {}
  }
}

export function saveGameStars(
  grade: Grade,
  topicId: string,
  gameId: GameId,
  correct: number,
  total: number
): StarProgress {
  const progress = loadStarProgress(grade)
  const key = `${topicId}:${gameId}`
  const earned = starsForResult(correct, total)

  progress[key] = Math.max(progress[key] ?? 0, earned)

  localStorage.setItem(
    getStorageKey(grade),
    JSON.stringify(progress)
  )

  return progress
}

export function getTotalStars(progress: StarProgress): number {
  return Object.values(progress).reduce((sum, stars) => sum + stars, 0)
}

export function getTopicStars(
  progress: StarProgress,
  topicId: string
): number {
  return Object.entries(progress)
    .filter(([key]) => key.startsWith(`${topicId}:`))
    .reduce((sum, [, stars]) => sum + stars, 0)
}
