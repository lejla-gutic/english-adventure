import { getNextGame, starsForResult } from '../data/games'
import type { GameResult } from '../games/types'
import { routeHref } from '../router'
import type { Game, Topic } from '../types'
import Icon from './Icon'
import Stars from './Stars'

interface ResultScreenProps {
  topic: Topic
  game: Game
  result: GameResult
  onRestart: () => void
}

export default function ResultScreen({ topic, game, result, onRestart }: ResultScreenProps) {
  const stars = starsForResult(result.correct, result.total)
  const nextGame = getNextGame(game.id)

  return (
    <section className="result">
      <p className="result__label">
        {topic.name} · {game.name}
      </p>
      <h1>{stars > 0 ? 'Bravo!' : 'Poskusi znova!'}</h1>
      <Stars count={stars} className="stars--result" />
      <p className="result__score">
        Pravilni odgovori: {result.correct} / {result.total}
      </p>
      <div className="result__actions">
        <button type="button" className="btn btn--outline" onClick={onRestart}>
          Igraj znova
        </button>
        <a className="btn btn--outline" href={routeHref({ page: 'topics' })}>
          Zemljevid
        </a>
        <a className="btn btn--outline" href={routeHref({ page: 'home' })}>
          <Icon name="home" /> Domov
        </a>
        {nextGame ? (
          <a className="btn btn--primary" href={routeHref({ page: 'game', topic, game: nextGame })}>
            Naslednja igra
          </a>
        ) : (
          <a className="btn btn--primary" href={routeHref({ page: 'topic', topic })}>
            Nazaj na temo
          </a>
        )}
      </div>
    </section>
  )
}
