import type { ComponentType } from 'react'
import type { GameId } from '../types'
import GamePlaceholder from './GamePlaceholder'
import type { GameProps } from './types'
import MatchThePairs from './MatchThePairs/MatchThePairs'
import ListenAndChoose from './ListenAndChoose/ListenAndChoose'

// Replace a placeholder with the real game component once it is ready, e.g.
//   import WhatIsThis from './WhatIsThis/WhatIsThis'
//   'what-is-this': WhatIsThis,
export const GAME_COMPONENTS: Record<GameId, ComponentType<GameProps>> = {
  'what-is-this': GamePlaceholder,
  'listen-and-choose': ListenAndChoose,
  'match-the-pairs': MatchThePairs,
  'build-a-sentence': GamePlaceholder,
  'say-it': GamePlaceholder,
}
