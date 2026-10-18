import AppHeader from '../components/AppHeader'
import Icon from '../components/Icon'
import { HomeButton, MapButton } from '../components/NavButtons'
import Owl from '../components/Owl'
import PlayerInfo from '../components/PlayerInfo'
import Stars from '../components/Stars'
import { GAMES } from '../data/games'
import { routeHref } from '../router'
import type { Grade, Topic } from '../types'
import './TopicPage.css'
import { loadStarProgress } from '../utils/starProgress'

interface TopicPageProps {
  topic: Topic
  grade: Grade
  stars: number
}

export default function TopicPage({ topic, grade, stars }: TopicPageProps) {
  const progress = loadStarProgress(grade)

  return (
    <>
      <AppHeader
        nav={
          <>
            <MapButton />
            <HomeButton />
          </>
        }
        right={<PlayerInfo grade={grade} stars={stars} />}
      />
      <main className="page">
        <section className="topic-hero">
          <div className="topic-hero__title">
            <span className="topic-icon" style={{ background: topic.color }} aria-hidden="true">
              {topic.emoji}
            </span>
            <div>
              <h1>{topic.name}</h1>
              <p>{topic.nameSl} · izberi igro in zberi zvezdice</p>
            </div>
          </div>
          <p className="tip">
            <Owl />
            {topic.tip}
          </p>
        </section>

        <ul className="game-grid">
          {GAMES.map((game) => (
            <li key={game.id} className="game-card">
              <span className="icon-tile" style={{ background: game.color }}>
                <Icon name={game.icon} />
              </span>
              <h2>{game.name}</h2>
              <p>{game.description}</p>
              <Stars count={progress[`${topic.id}:${game.id}`] ?? 0} />
              <a className="btn btn--primary btn--flat" href={routeHref({ page: 'game', topic, game })}>
                Igraj
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
