import AppHeader from '../components/AppHeader'
import { HomeButton } from '../components/NavButtons'
import PlayerInfo from '../components/PlayerInfo'
import ProgressBar from '../components/ProgressBar'
import { StarIcon } from '../components/Stars'
import { GAMES, MAX_STARS_PER_GAME } from '../data/games'
import { TOPICS } from '../data/topics'
import { routeHref } from '../router'
import type { Grade, TopicId } from '../types'
import './TopicsPage.css'
import { getTopicStars, isTopicCompleted, isTopicUnlocked, loadStarProgress } from '../utils/starProgress'

const MAX_TOPIC_STARS = GAMES.length * MAX_STARS_PER_GAME
const MAX_TOTAL_STARS = TOPICS.length * MAX_TOPIC_STARS
const BADGES = [
  {
    topicId: 'animals',
    emoji: '🐾',
    name: 'Prijatelj živali',
    description: 'Zaključi vse igre pri Animals',
  },
  {
    topicId: 'colours',
    emoji: '🎨',
    name: 'Mojster barv',
    description: 'Zaključi vse igre pri Colours',
  },
  {
    topicId: 'food',
    emoji: '🍎',
    name: 'Mojster hrane',
    description: 'Zaključi vse igre pri Food',
  },
  {
    topicId: 'family',
    emoji: '👨‍👩‍👧',
    name: 'Družinski prijatelj',
    description: 'Zaključi vse igre pri Family',
  },
  {
    topicId: 'school',
    emoji: '🎒',
    name: 'Šolski junak',
    description: 'Zaključi vse igre pri School',
  },
  {
    topicId: 'numbers',
    emoji: '🔢',
    name: 'Mojster števil',
    description: 'Zaključi vse igre pri Numbers',
  },
]

interface TopicsPageProps {
  grade: Grade
  stars: number
}

export default function TopicsPage({ grade, stars }: TopicsPageProps) {
  const progress = loadStarProgress(grade)

  return (
    <>
      <AppHeader nav={<HomeButton />} right={<PlayerInfo grade={grade} stars={stars} />} />
      <main className="page map-layout">
        <section>
          <h1 className="page-title">Zemljevid pustolovščine</h1>
          <p className="page-subtitle">Izberi temo, igraj igre in zbiraj zvezdice.</p>

          <div className="topic-grid">
            {TOPICS.map((topic, index) => {
              const label = (
                <span className="topic-card__label">
                  {index + 1} · {topic.nameSl}
                </span>
              )
              const icon = (
                <span className="topic-icon" style={{ background: topic.color }} aria-hidden="true">
                  {topic.emoji}
                </span>
              )

              // Locked topic: not a link, so it cannot be opened.
              if (!isTopicUnlocked(progress, topic.id)) {
                return (
                  <div key={topic.id} className="topic-card topic-card--locked" aria-disabled="true">
                    {label}
                    {icon}
                    <h2>
                      <span aria-hidden="true">🔒</span> {topic.name}
                    </h2>
                    <span className="topic-card__lock-text">
                      Najprej dokončaj temo {TOPICS[index - 1].nameSl}.
                    </span>
                  </div>
                )
              }

              const completed = isTopicCompleted(progress, topic.id)
              return (
                <a
                  key={topic.id}
                  className={`topic-card${completed ? ' topic-card--completed' : ''}`}
                  href={routeHref({ page: 'topic', topic })}
                >
                  {label}
                  {icon}
                  <h2>{topic.name}</h2>
                  <span className="topic-card__stars">
                    <StarIcon /> {getTopicStars(progress, topic.id)} / {MAX_TOPIC_STARS} zvezdic
                  </span>
                  {completed && <span className="topic-card__done">✓ Dokončano</span>}
                </a>
              )
            })}
          </div>
        </section>

        <aside className="sidebar">
          <section className="side-card">
            <h2>Moje zvezdice</h2>
            <p className="star-total">
              {stars} <span>/ {MAX_TOTAL_STARS}</span>
            </p>
            <ProgressBar value={stars / MAX_TOTAL_STARS} color="yellow" />
          </section>

          <section className="side-card">
            <h2>Moje značke</h2>
            <ul className="badge-list">
              {BADGES.map((badge) => {
  const unlocked = isTopicCompleted(progress, badge.topicId as TopicId)

  return (
    <li
      key={badge.name}
      className="badge"
      style={{ opacity: unlocked ? 1 : 0.4 }}
    >
      <span className="badge__icon" aria-hidden="true">
        {unlocked ? badge.emoji : '🔒'}
      </span>

      <span>
        <strong>{badge.name}</strong>
        <small>
          {unlocked ? '🏆 Osvojena značka!' : badge.description}
        </small>
      </span>
    </li>
  )
})}
            </ul>
          </section>
        </aside>
      </main>
    </>
  )
}