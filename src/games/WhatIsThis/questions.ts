import type { VocabularyWord } from '../../types'
import { shuffle } from '../../utils/random'

export const MAX_QUESTIONS = 10
export const OPTION_COUNT = 4

export interface Question {
  word: VocabularyWord // the correct answer (its picture is shown)
  options: VocabularyWord[] // OPTION_COUNT different words, including `word`, in random order
}

// Two words count as the same answer if their English text is the same.
const answerKey = (word: VocabularyWord) => word.english.trim().toLowerCase()

function uniqueAnswers(words: readonly VocabularyWord[]): VocabularyWord[] {
  const seen = new Set<string>()
  return words.filter((word) => {
    const key = answerKey(word)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Builds a shuffled round of up to MAX_QUESTIONS questions – every word is asked at most once.
 *
 * @param questionWords words that can be asked (they need a picture)
 * @param optionWords   words used as wrong answers (normally the same topic and grade)
 * @param extraOptionWords used only if `optionWords` is too small for OPTION_COUNT options
 *                         (e.g. other-grade words of the topic)
 *
 * With very small word lists a question gets fewer than OPTION_COUNT options instead of
 * repeating one; an empty list gives no questions.
 */
export function createQuestions(
  questionWords: readonly VocabularyWord[],
  optionWords: readonly VocabularyWord[],
  extraOptionWords: readonly VocabularyWord[] = [],
  random: () => number = Math.random,
): Question[] {
  const asked = shuffle(uniqueAnswers(questionWords), random).slice(0, MAX_QUESTIONS)

  return asked.map((word) => {
    const notTheAnswer = (other: VocabularyWord) => answerKey(other) !== answerKey(word)
    const preferred = shuffle(uniqueAnswers(optionWords).filter(notTheAnswer), random)
    const extra = shuffle(uniqueAnswers(extraOptionWords).filter(notTheAnswer), random)
    const wrong = uniqueAnswers([...preferred, ...extra]).slice(0, OPTION_COUNT - 1)
    return { word, options: shuffle([word, ...wrong], random) }
  })
}
