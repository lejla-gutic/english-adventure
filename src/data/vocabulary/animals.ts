import { GRADE_3_ONLY, GRADES_2_AND_3, wordFactory } from './word'

// Word list: "1. Animals (živali)"
// Used in: What is this?, Listen and choose, Match the pairs, Complete the word
const word = wordFactory('animals')

export const ANIMALS = [
  word('dog', 'pes', GRADES_2_AND_3),
  word('cat', 'mačka', GRADES_2_AND_3),
  word('bird', 'ptica', GRADES_2_AND_3),
  word('fish', 'riba', GRADES_2_AND_3),
  word('horse', 'konj', GRADES_2_AND_3),
  word('cow', 'krava', GRADES_2_AND_3),
  word('pig', 'prašič', GRADE_3_ONLY),
  word('sheep', 'ovca', GRADE_3_ONLY),
  word('duck', 'raca', GRADE_3_ONLY),
  word('rabbit', 'zajec', GRADE_3_ONLY),
]
