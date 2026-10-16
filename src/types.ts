export type Grade = 2 | 3

export type TopicId = 'animals' | 'colours' | 'food' | 'family' | 'school' | 'numbers'

export type GameId =
  | 'what-is-this'
  | 'listen-and-choose'
  | 'match-the-pairs'
  | 'build-a-sentence'
  | 'say-it'

export type IconName =
  | 'image'
  | 'speaker'
  | 'pairs'
  | 'blocks'
  | 'mic'
  | 'arrow-left'
  | 'arrow-right'
  | 'close'
  | 'home'
  | 'gamepad'
  | 'map'

export interface Topic {
  id: TopicId
  name: string // English name, shown as the title
  nameSl: string // Slovenian name
  emoji: string
  color: string // background of the topic icon
  tip: string // mascot hint on the topic page
}

export interface Game {
  id: GameId
  name: string
  description: string
  icon: IconName
  color: string // background of the game icon tile
}
