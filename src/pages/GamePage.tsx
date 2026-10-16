import { useState } from 'react'
import GameHeader from '../components/GameHeader'
import ResultScreen from '../components/ResultScreen'
import { GAME_COMPONENTS } from '../games'
import type { GameProgress, GameResult } from '../games/types'
import type { Game, Grade, Topic } from '../types'
import './GamePage.css'

interface GamePageProps {
  topic: Topic
  game: Game
  grade: Grade
}

export default function GamePage({ topic, game, grade }: GamePageProps) {
  const [attempt, setAttempt] = useState(0)
  const [progress, setProgress] = useState<GameProgress | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)

  const GameComponent = GAME_COMPONENTS[game.id]

  function restart() {
    setResult(null)
    setProgress(null)
    setAttempt((value) => value + 1) // new key -> the game starts fresh
  }

  if (result) {
    return (
      <main className="page">
        <ResultScreen topic={topic} game={game} result={result} onRestart={restart} />
      </main>
    )
  }

  return (
    <>
      <GameHeader topic={topic} game={game} grade={grade} progress={progress} />
      <main className="game-main">
        <GameComponent
          key={attempt}
          topic={topic}
          game={game}
          grade={grade}
          onProgress={setProgress}
          onFinish={setResult}
        />
      </main>
    </>
  )
}
