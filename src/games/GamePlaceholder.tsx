import Icon from '../components/Icon'
import './GamePlaceholder.css'
import type { GameProps } from './types'

// Shown for every mini-game that is not implemented yet.
export default function GamePlaceholder({ topic, game, onFinish }: GameProps) {
  return (
    <section className="placeholder">
      <span className="icon-tile" style={{ background: game.color }}>
        <Icon name={game.icon} />
      </span>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      <p className="placeholder__note">
        Igra za temo {topic.name} je še v pripravi. 🚧
      </p>
      <button
        type="button"
        className="btn btn--primary"
        onClick={() => onFinish({ correct: 7, total: 8 })}
      >
        Preizkusi zaslon z rezultatom
      </button>
    </section>
  )
}
