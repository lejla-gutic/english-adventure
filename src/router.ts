import { useSyncExternalStore } from 'react'
import { getGame } from './data/games'
import { getTopic } from './data/topics'
import type { Game, Topic } from './types'

// Simple hash-based routing, so no router library is needed:
//   #/                        -> home page
//   #/topics                  -> topic map
//   #/topics/animals          -> game selection for a topic
//   #/topics/animals/say-it   -> a mini-game
export type Route =
  | { page: 'home' }
  | { page: 'topics' }
  | { page: 'topic'; topic: Topic }
  | { page: 'game'; topic: Topic; game: Game }

export function parseRoute(hash: string): Route {
  const [section, topicId, gameId] = hash.replace(/^#\/?/, '').split('/')
  if (section !== 'topics') return { page: 'home' }

  const topic = topicId ? getTopic(topicId) : undefined
  if (!topic) return { page: 'topics' }

  const game = gameId ? getGame(gameId) : undefined
  if (!game) return { page: 'topic', topic }

  return { page: 'game', topic, game }
}

export function routeHref(route: Route): string {
  switch (route.page) {
    case 'home':
      return '#/'
    case 'topics':
      return '#/topics'
    case 'topic':
      return `#/topics/${route.topic.id}`
    case 'game':
      return `#/topics/${route.topic.id}/${route.game.id}`
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash)
  return parseRoute(hash)
}
