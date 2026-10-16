import type { Topic } from '../types'

export const TOPICS: Topic[] = [
  {
    id: 'animals',
    name: 'Animals',
    nameSl: 'Živali',
    emoji: '🐾',
    color: '#fde4cf',
    tip: 'Danes se naučiš novih živali!',
  },
  {
    id: 'colours',
    name: 'Colours',
    nameSl: 'Barve',
    emoji: '🎨',
    color: '#e3ecfa',
    tip: 'Spoznaj barve okoli sebe!',
  },
  {
    id: 'food',
    name: 'Food',
    nameSl: 'Hrana',
    emoji: '🍎',
    color: '#fde2e2',
    tip: 'Kaj rad ješ? Povej v angleščini!',
  },
  {
    id: 'family',
    name: 'Family',
    nameSl: 'Družina',
    emoji: '👨‍👩‍👧',
    color: '#fff0cc',
    tip: 'Spoznaj člane družine v angleščini!',
  },
  {
    id: 'school',
    name: 'School',
    nameSl: 'Šola',
    emoji: '🎒',
    color: '#e0f5ea',
    tip: 'Kaj imaš v šolski torbi?',
  },
  {
    id: 'numbers',
    name: 'Numbers',
    nameSl: 'Števila',
    emoji: '🔢',
    color: '#efe6fb',
    tip: 'Štej z mano v angleščini!',
  },
]

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((topic) => topic.id === id)
}
