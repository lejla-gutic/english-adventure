import type { Game, Grade, Topic } from '../types'

export interface GameProgress {
  current: number
  total: number
  label?: string // e.g. "Vprašanje", "Beseda", "Pari" (default: "Vprašanje")
}

export interface GameResult {
  correct: number
  total: number
}

// Every mini-game component receives these props from GamePage.
export interface GameProps {
  topic: Topic
  game: Game
  grade: Grade
  // Updates the progress bar in the game header.
  onProgress: (progress: GameProgress) => void
  // Call when the game is over – GamePage then shows the result screen.
  onFinish: (result: GameResult) => void
}
