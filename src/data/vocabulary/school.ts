import { GRADE_3_ONLY, GRADES_2_AND_3, wordFactory } from './word'

// Word list: "5. School (šola)"
// Used in: Pack your school bag, What is this?, Match the pairs
const word = wordFactory('school')

export const SCHOOL = [
  word('book', 'knjiga', GRADES_2_AND_3),
  word('pencil', 'svinčnik', GRADES_2_AND_3),
  word('school bag', 'šolska torba', GRADES_2_AND_3),
  word('ruler', 'ravnilo', GRADES_2_AND_3),
  word('rubber', 'radirka', GRADES_2_AND_3),
  word('crayon', 'barvica', GRADES_2_AND_3),
  word('pen', 'pisalo / kemični svinčnik', GRADE_3_ONLY),
  word('scissors', 'škarje', GRADE_3_ONLY),
  word('glue', 'lepilo', GRADE_3_ONLY),
  word('pencil case', 'peresnica', GRADE_3_ONLY),
]
