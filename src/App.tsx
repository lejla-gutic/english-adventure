import { useEffect, useState } from 'react'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'
import TopicsPage from './pages/TopicsPage'
import { routeHref, useRoute } from './router'
import type { Grade } from './types'

function App() {
  const [grade, setGrade] = useState<Grade>(2)
  const route = useRoute()
  const href = routeHref(route)

  // TODO: replace with the real star count once progress tracking exists.
  const stars = 0

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [href])

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
