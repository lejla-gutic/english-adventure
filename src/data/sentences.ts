import type { Grade, Sentence, TopicId } from '../types'

// "6. Preproste povedi za igro Build a sentence" from the word list:
// grade 2 sentences have 2–3 words, grade 3 sentences have 3–4 words.
export const SENTENCES: Sentence[] = [
  { topic: 'animals', grade: 2, text: 'A big dog.' },
  { topic: 'animals', grade: 3, text: 'I like cats.' },
  { topic: 'colours', grade: 2, text: 'A red apple.' },
  { topic: 'colours', grade: 3, text: 'The sky is blue.' },
  { topic: 'food', grade: 2, text: 'I like milk.' },
  { topic: 'food', grade: 3, text: 'I like green apples.' },
  { topic: 'family', grade: 2, text: 'My mum.' },
  { topic: 'family', grade: 3, text: 'This is my sister.' },
  { topic: 'school', grade: 2, text: 'My pencil.' },
  { topic: 'school', grade: 3, text: 'I have a ruler.' },
  { topic: 'numbers', grade: 2, text: 'Three cats.' },
  { topic: 'numbers', grade: 3, text: 'I have two brothers.' },
]

export function getSentences(topicId: TopicId, grade: Grade): Sentence[] {
  return SENTENCES.filter((sentence) => sentence.topic === topicId && sentence.grade === grade)
}
