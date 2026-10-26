// The mockup leaves the character's name open ("[IME LIKA]") – change it here.
export const MASCOT_NAME = 'Ollie'

export type OllieMood = 'correct' | 'wrong'

// Short encouraging messages Ollie says in the mini-games after an answer.
export const ENCOURAGING_MESSAGES: Record<OllieMood, string[]> = {
  correct: ['Bravo! Odlično ti gre!', 'Super! Kar tako naprej!', 'Pravilno! Zelo dobro!'],
  wrong: ['Poskusi znova! Saj bo šlo!', 'Nič hudega, poskusi še enkrat!', 'Skoraj! Verjamem, da ti bo uspelo!'],
}
