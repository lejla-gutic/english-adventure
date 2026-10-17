import type { Grade, TopicId, VocabularyWord } from '../../types'
import { ANIMALS } from './animals'
import { COLOURS } from './colours'
import { FAMILY } from './family'
import { FOOD } from './food'
import { NUMBERS } from './numbers'
import { SCHOOL } from './school'

// All vocabulary, grouped by topic. Mini-games should use the helpers below, e.g.
//   const words = getWordsWithImages(topic.id, grade)
//   <WordImage word={word} />            – the illustration
//   <SpeakerButton word={word.english} /> – pronunciation (or speakWord(word.english))
export const VOCABULARY: Record<TopicId, VocabularyWord[]> = {
  animals: ANIMALS,
  colours: COLOURS,
  food: FOOD,
  family: FAMILY,
  school: SCHOOL,
  numbers: NUMBERS,
}

export const ALL_WORDS: VocabularyWord[] = Object.values(VOCABULARY).flat()

// Words of a topic; with a grade, only the words used in that grade
// (grade 2 gets the "2. in 3." words, grade 3 gets all of them).
export function getWords(topicId: TopicId, grade?: Grade): VocabularyWord[] {
  const words = VOCABULARY[topicId]
  return grade === undefined ? words : words.filter((word) => word.grades.includes(grade))
}

// Only words that have an illustration – for picture games
// ("What is this?", "Listen and choose", "Match the pairs").
export function getWordsWithImages(topicId: TopicId, grade?: Grade): VocabularyWord[] {
  return getWords(topicId, grade).filter((word) => word.image !== undefined)
}

export function getWordById(id: string): VocabularyWord | undefined {
  return ALL_WORDS.find((word) => word.id === id)
}

// False for a topic whose word list is still empty, so a game can show a
// "coming soon" message instead of an empty round.
export function hasVocabulary(topicId: TopicId): boolean {
  return VOCABULARY[topicId].length > 0
}
