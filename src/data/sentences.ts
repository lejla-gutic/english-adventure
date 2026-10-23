import type { Grade, Sentence, TopicId } from '../types'

// Sentences for the Build a sentence mini-game.
// Each topic contains 6 sentences per grade.
// Grade 2 uses simpler sentences, while grade 3 includes
// longer sentences and more complex structures.
export const SENTENCES: Sentence[] = [
  //Animals
  { topic: 'animals', grade: 2, text: 'A big dog.' },
  { topic: 'animals', grade: 2, text: 'This is a cat.' },
  { topic: 'animals', grade: 2, text: 'I like dogs.' },
  { topic: 'animals', grade: 2, text: 'The bird is blue.' },
  { topic: 'animals', grade: 2, text: 'I have a cow.' },
  { topic: 'animals', grade: 2, text: 'Where is my dog?' },
  { topic: 'animals', grade: 3, text: 'Birds can sing and fly.' },
  { topic: 'animals', grade: 3, text: 'Pigs are usually dirty.' },
  { topic: 'animals', grade: 3, text: 'My little dog likes to play.' },
  { topic: 'animals', grade: 3, text: 'Where is the little rabbit?' },
  { topic: 'animals', grade: 3, text: 'How many horses can you see?' },
  { topic: 'animals', grade: 3, text: 'My favourite animals are cats and dogs.' },
  //Colours
  { topic: 'colours', grade: 2, text: 'A red apple.' },
  { topic: 'colours', grade: 2, text: 'I like green.' },
  { topic: 'colours', grade: 2, text: 'My bag is red.' },
  { topic: 'colours', grade: 2, text: 'The sun is yellow.' },
  { topic: 'colours', grade: 2, text: 'What colour is it?' },
  { topic: 'colours', grade: 2, text: 'The bag is blue.' },
  { topic: 'colours', grade: 3, text: 'The grass is always green.' },
  { topic: 'colours', grade: 3, text: 'Can you see the pink car?' },
  { topic: 'colours', grade: 3, text: 'There are colourful flowers in the garden.' },
  { topic: 'colours', grade: 3, text: 'Brown and purple are my favourite colours.' },
  { topic: 'colours', grade: 3, text: 'What is your favourite colour?' },
  { topic: 'colours', grade: 3, text: 'Our carpet is full of colours.' },
  //Food
  { topic: 'food', grade: 2, text: 'I like milk.' },
  { topic: 'food', grade: 2, text: 'This is a banana.' },
  { topic: 'food', grade: 2, text: 'I eat an apple.' },
  { topic: 'food', grade: 2, text: 'Can I have some water?' },
  { topic: 'food', grade: 2, text: 'The egg is white.' },
  { topic: 'food', grade: 2, text: 'I have bread and milk.' },
  { topic: 'food', grade: 3, text: 'I like apples and bananas for breakfast.' },
  { topic: 'food', grade: 3, text: 'My favourite food is pizza.' },
  { topic: 'food', grade: 3, text: 'I usually drink orange juice.' },
  { topic: 'food', grade: 3, text: 'Would you like some cake?' },
  { topic: 'food', grade: 3, text: 'Cheese is made from milk.' },
  { topic: 'food', grade: 3, text: 'What do you eat for breakfast?' },
  //Family
  { topic: 'family', grade: 2, text: 'This is my mum.' },
  { topic: 'family', grade: 2, text: 'I love my dad.' },
  { topic: 'family', grade: 2, text: 'The baby is sleeping.' },
  { topic: 'family', grade: 2, text: 'Where is my brother?' },
  { topic: 'family', grade: 2, text: 'I have a little sister.' },
  { topic: 'family', grade: 2, text: 'This is my sister.' },
  { topic: 'family', grade: 3, text: 'I have a big family.' },
  { topic: 'family', grade: 3, text: 'My grandma makes delicious cakes.' },
  { topic: 'family', grade: 3, text: 'I love my grandpa very much.' },
  { topic: 'family', grade: 3, text: 'How old is your brother?' },
  { topic: 'family', grade: 3, text: 'My sister is younger than me.' },
  { topic: 'family', grade: 3, text: 'We visit our grandparents on Sundays.' },
  //School
  { topic: 'school', grade: 2, text: 'This is my book.' },
  { topic: 'school', grade: 2, text: 'My pencil is red.' },
  { topic: 'school', grade: 2, text: 'Where is my ruler?' },
  { topic: 'school', grade: 2, text: 'I have a ruler.' },
  { topic: 'school', grade: 2, text: 'I have a blue crayon.' },
  { topic: 'school', grade: 2, text: 'I have a rubber.' },
  { topic: 'school', grade: 3, text: 'Please put your scissors in the pencil case.' },
  { topic: 'school', grade: 3, text: 'Where are my scissors?' },
  { topic: 'school', grade: 3, text: 'I need scissors and glue for school.' },
  { topic: 'school', grade: 3, text: 'My pencil case is full of crayons.' },
  { topic: 'school', grade: 3, text: 'Can I borrow your pen, please?' },
  { topic: 'school', grade: 3, text: 'I have a new pencil case.' },
  //Numbers
  { topic: 'numbers', grade: 2, text: 'There are three cats.' },
  { topic: 'numbers', grade: 2, text: 'One is a number.' },
  { topic: 'numbers', grade: 2, text: 'I am six years old.' },
  { topic: 'numbers', grade: 2, text: 'One plus two is three.' },
  { topic: 'numbers', grade: 2, text: 'I have two dogs.' },
  { topic: 'numbers', grade: 2, text: 'Numbers are fun!' },
  { topic: 'numbers', grade: 3, text: 'There are eight children in the room.' },
  { topic: 'numbers', grade: 3, text: 'How many fingers do you have?' },
  { topic: 'numbers', grade: 3, text: 'Ten minus three is seven.' },
  { topic: 'numbers', grade: 3, text: 'My little brother can count to ten.' },
  { topic: 'numbers', grade: 3, text: 'There are ten apples in the basket.' },
  { topic: 'numbers', grade: 3, text: 'I can see eight birds in the tree.' },
]

export function getSentences(topicId: TopicId, grade: Grade): Sentence[] {
  return SENTENCES.filter((sentence) => sentence.topic === topicId && sentence.grade === grade)
}
