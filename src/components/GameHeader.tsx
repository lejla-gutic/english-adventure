import type { GameProgress } from '../games/types'
import { routeHref } from '../router'
import type { Game, Grade, Topic } from '../types'
import Icon from './Icon'
import ProgressBar from './ProgressBar'

interface GameHeaderProps {
  topic: Topic
  game: Game
  grade: Grade
  progress: GameProgress | null
}

export default function GameHeader({ topic, game, grade, progress }: GameHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner game-header">
        <a className="round-btn" href={routeHref({ page: 'topic', topic })} aria-label="Zapri igro" title="Zapri igro">
          <Icon name="close" />
        </a>
        <div className="game-header__progress">
          <div className="game-header__meta">
            <span>
              {topic.name} · {game.name}
            </span>
            {progress && (
              <span className="game-header__count">
                {progress.label ?? 'Vprašanje'} {progress.current} / {progress.total}
              </span>
            )}
          </div>
          <ProgressBar value={progress ? progress.current / progress.total : 0} />
        </div>
        <span className="pill game-header__grade">{grade}. razred</span>
        <a className="round-btn" href={routeHref({ page: 'home' })} aria-label="Domov" title="Domov">
          <Icon name="home" />
        </a>
      </div>
    </header>
  )
}
