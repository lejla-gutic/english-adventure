import { useEffect, useRef, useState } from 'react'
import OllieMessage from '../../components/OllieMessage'
import SpeakerButton from '../../components/SpeakerButton'
import WordImage from '../../components/WordImage'
import { getWords, getWordsWithImages } from '../../data/vocabulary'
import { routeHref } from '../../router'
import type { TopicId, VocabularyWord } from '../../types'
import { playSound, prepareSounds } from '../../utils/sounds'
import { speakWord, stopSpeaking } from '../../utils/speech'
import type { GameProps } from '../types'
import { createQuestions } from './questions'
import './WhatIsThis.css'

// The question (in English) and the instruction (in Slovenian) depend on the topic.
function getPrompt(topicId: TopicId) {
  switch (topicId) {
    case 'colours':
      return { question: 'What colour is this?', hint: 'Katera barva je to? Klikni na pravo besedo.' }
    case 'numbers':
      return { question: 'How many?', hint: 'Preštej sličice in klikni na pravo število.' }
    case 'family':
      return { question: 'Who is this?', hint: 'Kdo je to? Klikni na pravo besedo.' }
    default:
      return { question: 'What is this?', hint: 'Klikni na besedo, ki se ujema s sliko.' }
  }
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
      <path d="M17 7L7 17M7 7l10 10" />
    </svg>
  )
}

export default function WhatIsThis({ topic, grade, onProgress, onFinish }: GameProps) {
  // Created once per game; "Igraj znova" remounts the game, which shuffles a new round.
  const [questions] = useState(() =>
    createQuestions(
      getWordsWithImages(topic.id, grade),
      getWords(topic.id, grade),
      getWords(topic.id), // other-grade words, only if the grade has fewer than 4 words
    ),
  )
  const [index, setIndex] = useState(0)
  // True once the correct answer is chosen – only then can the child move on.
  const [answered, setAnswered] = useState(false)
  // Wrong answers already tried for the current question; the child can try again.
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([])
  const [correctCount, setCorrectCount] = useState(0)

  const nextButton = useRef<HTMLButtonElement>(null)
  const firstOption = useRef<HTMLButtonElement>(null)
  // Increased on "Naprej" and when leaving the game, so the word queued after the
  // "correct" sound is not spoken once it is no longer wanted.
  const questionToken = useRef(0)

  const question = questions[index]
  const total = questions.length
  const prompt = getPrompt(topic.id)

  useEffect(() => {
    if (total > 0) onProgress({ current: index + 1, total })
  }, [index, total, onProgress])

  // Keyboard users: jump to "Naprej" after answering, back to the answers on a new question.
  useEffect(() => {
    if (answered) nextButton.current?.focus()
    else if (index > 0) firstOption.current?.focus()
  }, [answered, index])

  // Stop speaking when the child leaves the game.
  useEffect(
    () => () => {
      questionToken.current += 1
      stopSpeaking()
    },
    [],
  )

  if (!question) {
    return (
      <section className="wit wit--empty">
        <h1>Tukaj še ni vprašanj</h1>
        <p>Za to temo in razred še nimamo slik. Izberi drugo igro ali temo.</p>
        <a className="btn btn--primary" href={routeHref({ page: 'topic', topic })}>
          Nazaj na temo
        </a>
      </section>
    )
  }

  function handleAnswer(option: VocabularyWord) {
    if (answered || wrongAnswers.includes(option.id)) return

    // Inside the click: unlocks audio for Safari. Any word still being spoken
    // (e.g. the title) is stopped, so it does not overlap with the sound.
    prepareSounds(['correct', 'wrong'])
    stopSpeaking()

    // Wrong answer: mark it, the child can try another one (the answer is not revealed).
    if (option.id !== question.word.id) {
      playSound('wrong')
      setWrongAnswers([...wrongAnswers, option.id])
      return
    }

    setAnswered(true)
    // Only an answer that is right on the first try counts, so retrying cannot earn extra stars.
    if (wrongAnswers.length === 0) setCorrectCount((count) => count + 1)
    // Pronounce the word after the sound has finished, so the two do not overlap.
    const token = questionToken.current
    const word = question.word.english
    playSound('correct', () => {
      if (token === questionToken.current) speakWord(word)
    })
  }

  function handleNext() {
    if (!answered) return
    questionToken.current += 1
    stopSpeaking()
    if (index + 1 >= total) {
      onFinish({ correct: correctCount, total })
      return
    }
    setIndex(index + 1)
    setAnswered(false)
    setWrongAnswers([])
  }

  function optionState(option: VocabularyWord): 'correct' | 'wrong' | 'dimmed' | null {
    if (wrongAnswers.includes(option.id)) return 'wrong'
    if (!answered) return null
    if (option.id === question.word.id) return 'correct'
    return 'dimmed'
  }

  return (
    <section className="wit">
      <div className="wit__title">
        <h1>{prompt.question}</h1>
        <SpeakerButton word={prompt.question} />
      </div>

      <div className="wit__picture">
        <WordImage key={question.word.id} word={question.word} />
      </div>

      <div className="wit__options" role="group" aria-label="Odgovori">
        {question.options.map((option, i) => {
          const state = optionState(option)
          return (
            <button
              key={option.id}
              ref={i === 0 ? firstOption : undefined}
              type="button"
              className={`wit__option${state ? ` wit__option--${state}` : ''}`}
              onClick={() => handleAnswer(option)}
              aria-disabled={answered || state === 'wrong'}
            >
              {state === 'correct' && <CheckIcon />}
              {state === 'wrong' && <CrossIcon />}
              <span>{option.english}</span>
              {state === 'correct' && <span className="wit__sr-only"> (pravilno)</span>}
              {state === 'wrong' && <span className="wit__sr-only"> (napačno)</span>}
            </button>
          )
        })}
      </div>

      <div className="wit__footer" aria-live="polite">
        {answered ? (
          <div className="wit__feedback wit__feedback--correct">
            <OllieMessage mood="correct">
              <strong lang="en">{question.word.english}</strong> je pravilno.
            </OllieMessage>
            <div className="wit__feedback-actions">
              <SpeakerButton word={question.word.english} />
              <button ref={nextButton} type="button" className="btn btn--primary btn--big" onClick={handleNext}>
                Naprej
              </button>
            </div>
          </div>
        ) : wrongAnswers.length > 0 ? (
          // A new key after each wrong try, so Ollie picks a new message
          <div className="wit__feedback wit__feedback--wrong">
            <OllieMessage key={wrongAnswers.length} mood="wrong">
              Izberi drugo besedo.
            </OllieMessage>
          </div>
        ) : (
          <p className="wit__hint">{prompt.hint}</p>
        )}
      </div>
    </section>
  )
}
