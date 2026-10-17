import { GRADE_3_ONLY, GRADES_2_AND_3, wordFactory } from './word'

// Numbers 1–10. The original word list (Seznam_besed_po_temah.docx) had no
// Numbers table; this list was added later: 1–6 for grades 2 and 3, 7–10 for grade 3.
// Each picture shows the quantity as objects to count (e.g. three.svg = 3 cats).
const word = wordFactory('numbers')

export const NUMBERS = [
  word('one', 'ena', GRADES_2_AND_3),
  word('two', 'dva', GRADES_2_AND_3),
  word('three', 'tri', GRADES_2_AND_3),
  word('four', 'štiri', GRADES_2_AND_3),
  word('five', 'pet', GRADES_2_AND_3),
  word('six', 'šest', GRADES_2_AND_3),
  word('seven', 'sedem', GRADE_3_ONLY),
  word('eight', 'osem', GRADE_3_ONLY),
  word('nine', 'devet', GRADE_3_ONLY),
  word('ten', 'deset', GRADE_3_ONLY),
]
