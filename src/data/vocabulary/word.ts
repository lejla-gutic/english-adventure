import type { Grade, TopicId, VocabularyWord } from '../../types'

// Grade levels as written in the word list.
export const GRADES_2_AND_3: Grade[] = [2, 3] // "2. in 3."
export const GRADE_3_ONLY: Grade[] = [3] // "3."

// Files in public/ are served from the app's base URL.
export function imageUrl(path: string): string {
  return `${import.meta.env.BASE_URL}images/${path}`
}

interface WordOptions {
  slug?: string // file/id name when it differs from the English word, e.g. 'mum' for 'mum / mother'
  color?: string
  hasImage?: boolean // false = no illustration exists yet
}

// Creates a word for one topic. The id and the image path are derived from the
// English word: 'school bag' -> id 'school-school-bag', image 'images/school/school-bag.svg'.
export function wordFactory(topic: TopicId) {
  return (english: string, slovenian: string, grades: Grade[], options: WordOptions = {}): VocabularyWord => {
    const slug = options.slug ?? english.toLowerCase().replace(/\s+/g, '-')
    return {
      id: `${topic}-${slug}`,
      topic,
      english,
      slovenian,
      grades,
      image: options.hasImage === false ? undefined : imageUrl(`${topic}/${slug}.svg`),
      ...(options.color && { color: options.color }),
    }
  }
}
