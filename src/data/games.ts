import type { Game, GameId } from '../types'

export const MAX_STARS_PER_GAME = 3

export const GAMES: Game[] = [
  {
    id: 'what-is-this',
    name: 'What is this?',
    description: 'Poglej sliko in izberi pravo besedo.',
    icon: 'image',
    color: '#fff3cc',
  },
  {
    id: 'listen-and-choose',
    name: 'Listen and choose',
    description: 'Poslušaj besedo in izberi pravo sliko.',
    icon: 'speaker',
    color: '#e0f5ea',
  },
  {
    id: 'match-the-pairs',
    name: 'Match the pairs',
    description: 'Poveži slike z besedami.',
    icon: 'pairs',
    color: '#e3ecfa',
  },
  {
    id: 'build-a-sentence',
    name: 'Build a sentence',
    description: 'Sestavi preprosto poved iz besed.',
    icon: 'blocks',
    color: '#efe6fb',
  },
  {
    id: 'say-it',
    name: 'Say it',
    description: 'Povej besedo na glas v mikrofon.',
    icon: 'mic',
    color: '#fde6da',
  },
]

export function getGame(id: string): Game | undefined {
  return GAMES.find((game) => game.id === id)
}

export function getNextGame(id: GameId): Game | undefined {
  const index = GAMES.findIndex((game) => game.id === id)
  return GAMES[index + 1]
}

// 0–3 stars depending on the share of correct answers.
export function starsForResult(correct: number, total: number): number {
  if (total === 0) return 0
  const ratio = correct / total
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  if (ratio > 0) return 1
  return 0
}
