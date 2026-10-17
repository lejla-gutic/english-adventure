
import { useEffect, useRef, useState } from 'react'
import type { GameProps } from '../types'
import { getWordsWithImages } from '../../data/vocabulary'
import SpeakerButton from '../../components/SpeakerButton'
import { stopSpeaking } from '../../utils/speech'
import './ListenAndChoose.css'

function shuffleWords<T>(words: T[]): T[] {
  const shuffled = [...words]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

function playSound(name: string) {
  const audio = new Audio(`/sounds/${name}.wav`)
  audio.play().catch(() => {})
}

export default function ListenAndChoose({
  topic,
  grade,
  onProgress,
  onFinish
}: GameProps) {

  const [questions] = useState(() => {
    const words = getWordsWithImages(topic.id, grade)
    const selected = shuffleWords(words).slice(0, 8)

    return selected.map((correctWord) => {
      const otherWords = shuffleWords(
        words.filter((word) => word.id !== correctWord.id)
      ).slice(0, 2)

      return {
        correctWord,
        options: shuffleWords([correctWord, ...otherWords])
      }
    })
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const question = questions[currentQuestion]

  useEffect(() => {
    onProgress({
      current: currentQuestion,
      total: questions.length,
      label: 'Vprašanja'
    })
  }, [currentQuestion, questions.length, onProgress])

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
      stopSpeaking()
    }
  }, [])

  function handleAnswer(id: string) {
    if (!question || selectedAnswer !== null || finished) return

    setSelectedAnswer(id)
    stopSpeaking()

    const isCorrect = id === question.correctWord.id
    const newCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0)

    if (isCorrect) {
      playSound('correct')
      setCorrectAnswers(newCorrectAnswers)
    } else {
      playSound('wrong')
    }

    timerRef.current = setTimeout(() => {
      if (currentQuestion + 1 === questions.length) {
        setFinished(true)
        playSound('complete')
        onFinish({
          correct: newCorrectAnswers,
          total: questions.length
        })
      } else {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      }
    }, 1000)
  }

  if (!question) {
    return (
      <section className="listen-choose">
        <p>Za to temo ni dovolj besed s slikami.</p>
      </section>
    )
  }

  return (
    <section className="listen-choose">
      <h1>Poslušaj in izberi pravo sliko</h1>

      <SpeakerButton
        word={question.correctWord.english}
        label="Poslušaj"
        className="listen-choose__speaker"
      />

      <div className="listen-choose__options">
        {question.options.map((word) => {
          const isSelected = selectedAnswer === word.id
          const isCorrect = word.id === question.correctWord.id

          let stateClass = ''

          if (selectedAnswer !== null) {
            if (isSelected && isCorrect) {
              stateClass = 'listen-choose__card--correct'
            } else if (isSelected && !isCorrect) {
              stateClass = 'listen-choose__card--wrong'
            }
          }

          return (
            <button
              type="button"
              key={word.id}
              className={`listen-choose__card ${stateClass}`}
              onClick={() => handleAnswer(word.id)}
              disabled={selectedAnswer !== null}
              aria-label={word.english}
            >
              <img src={word.image} alt={word.english} />
            </button>
          )
        })}
      </div>
    </section>
  )
}
