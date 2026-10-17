import { GRADE_3_ONLY, GRADES_2_AND_3, wordFactory } from './word'

// Word list: "3. Food (hrana)"
// Used in: What is this?, Listen and choose, Match the pairs, Build a sentence
const word = wordFactory('food')

export const FOOD = [
  word('apple', 'jabolko', GRADES_2_AND_3),
  word('banana', 'banana', GRADES_2_AND_3),
  word('bread', 'kruh', GRADES_2_AND_3),
  word('milk', 'mleko', GRADES_2_AND_3),
  word('egg', 'jajce', GRADES_2_AND_3),
  word('water', 'voda', GRADES_2_AND_3),
  word('cheese', 'sir', GRADE_3_ONLY),
  word('juice', 'sok', GRADE_3_ONLY),
  word('cake', 'torta', GRADE_3_ONLY),
  // The fruit – the colour "orange" is a separate word (id 'colours-orange').
  word('orange', 'pomaranča', GRADE_3_ONLY),
]
