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

// One word from the vocabulary list (Seznam_besed_po_temah.docx).
export interface VocabularyWord {
  id: string // unique across all topics, e.g. 'animals-dog', 'food-orange'
  topic: TopicId
  english: string // exactly as in the word list, e.g. 'mum / mother'
  slovenian: string
  grades: Grade[] // grades the word is used in: [2, 3] ("2. in 3.") or [3] ("3.")
  image?: string // URL of the illustration in public/images/; undefined = no picture yet
  color?: string // Colours topic only: the CSS colour the word names
}

// Example sentence for "Build a sentence".
export interface Sentence {
  topic: TopicId
  grade: Grade
  text: string
}

export interface Game {
  id: GameId
  name: string
  description: string
  icon: IconName
  color: string // background of the game icon tile
}
