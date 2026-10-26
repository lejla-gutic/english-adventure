import { useEffect, useState } from 'react'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'
import TopicsPage from './pages/TopicsPage'
import { routeHref, useRoute } from './router'
import type { Grade } from './types'
import { loadStarProgress, getTotalStars, isTopicUnlocked } from './utils/starProgress'

function App() {
  const [grade, setGrade] = useState<Grade>(() => {
  const savedGrade = localStorage.getItem('english-adventure-grade')
  return savedGrade === '3' ? 3 : 2
})

  useEffect(() => {
  localStorage.setItem('english-adventure-grade', String(grade))
}, [grade])
  const route = useRoute()
  const href = routeHref(route)

  const [progress, setProgress] = useState(() => loadStarProgress(grade))

useEffect(() => {
  setProgress(loadStarProgress(grade))
}, [grade, href])

const stars = getTotalStars(progress)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [href])

  // A locked topic (or one of its games) opened by typing the URL shows the map instead.
  if ((route.page === 'topic' || route.page === 'game') &&
      !isTopicUnlocked(loadStarProgress(grade), route.topic.id)) {
    return <TopicsPage grade={grade} stars={stars} />
  }

  switch (route.page) {
    case 'home':
      return <HomePage grade={grade} onGradeChange={setGrade} />
    case 'topics':
      return <TopicsPage grade={grade} stars={stars} />
    case 'topic':
      return <TopicPage topic={route.topic} grade={grade} stars={stars} />
    case 'game':
      // key: switching to another game resets the page state
      return <GamePage key={href} topic={route.topic} game={route.game} grade={grade} />
  }
}

export default App