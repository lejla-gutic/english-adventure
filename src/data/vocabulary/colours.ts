import { GRADE_3_ONLY, GRADES_2_AND_3, wordFactory } from './word'

// Word list: "2. Colours (barve)"
// Used in: Colour challenge, Listen and choose, Build a sentence
// The image is a paint splash; `color` can be used to draw the colour directly.
const word = wordFactory('colours')

export const COLOURS = [
  word('red', 'rdeča', GRADES_2_AND_3, { color: '#e63946' }),
  word('blue', 'modra', GRADES_2_AND_3, { color: '#2f6fde' }),
  word('green', 'zelena', GRADES_2_AND_3, { color: '#2bb05a' }),
  word('yellow', 'rumena', GRADES_2_AND_3, { color: '#ffd23f' }),
  word('black', 'črna', GRADES_2_AND_3, { color: '#1f2233' }),
  word('white', 'bela', GRADES_2_AND_3, { color: '#ffffff' }),
  word('orange', 'oranžna', GRADE_3_ONLY, { color: '#ff8c1a' }),
  word('pink', 'roza', GRADE_3_ONLY, { color: '#ff8fc1' }),
  word('purple', 'vijolična', GRADE_3_ONLY, { color: '#8e44c9' }),
  word('brown', 'rjava', GRADE_3_ONLY, { color: '#8b5a2b' }),
]
