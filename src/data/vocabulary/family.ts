import { GRADE_3_ONLY, GRADES_2_AND_3, wordFactory } from './word'

// Word list: "4. Family (družina)"
// Used in: My family, Listen and choose, Build a sentence
const word = wordFactory('family')

export const FAMILY = [
  word('mum / mother', 'mama', GRADES_2_AND_3, { slug: 'mum' }),
  word('dad / father', 'oče', GRADES_2_AND_3, { slug: 'dad' }),
  word('sister', 'sestra', GRADES_2_AND_3),
  word('brother', 'brat', GRADES_2_AND_3),
  word('baby', 'dojenček', GRADES_2_AND_3),
  word('grandma', 'babica', GRADE_3_ONLY),
  word('grandpa', 'dedek', GRADE_3_ONLY),
  word('family', 'družina', GRADE_3_ONLY),
]
