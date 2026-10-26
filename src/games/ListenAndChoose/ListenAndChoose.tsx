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
  // Set only when the correct picture is chosen – then the game moves on.
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  // Wrong pictures already tried for the current question.
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Set immediately on the correct answer, so a fast double click counts only once.
  const answeredRef = useRef(false)

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
    if (
      !question ||
      answeredRef.current ||
      selectedAnswer !== null ||
      wrongAnswers.includes(id) ||
      finished
    ) {
      return
    }

    stopSpeaking()

    // Wrong answer: mark the picture, the student can try another one.
    if (id !== question.correctWord.id) {
      playSound('wrong')
      setWrongAnswers([...wrongAnswers, id])
      return
    }

    answeredRef.current = true
    setSelectedAnswer(id)
    playSound('correct')

    // As before, only an answer that is right on the first try counts as correct,
    // so retrying cannot earn extra stars.
    const newCorrectAnswers = correctAnswers + (wrongAnswers.length === 0 ? 1 : 0)
    setCorrectAnswers(newCorrectAnswers)

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
        setWrongAnswers([])
        answeredRef.current = false
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
          const isWrong = wrongAnswers.includes(word.id)

          let stateClass = ''

          if (selectedAnswer === word.id) {
            stateClass = 'listen-choose__card--correct'
          } else if (isWrong) {
            stateClass = 'listen-choose__card--wrong'
          }

          return (
            <button
              type="button"
              key={word.id}
              className={`listen-choose__card ${stateClass}`}
              onClick={() => handleAnswer(word.id)}
              disabled={selectedAnswer !== null || isWrong}
              aria-label={word.english}
            >
              <img src={word.image} alt={word.english} />
            </button>
          )
        })}
      </div>

      <div className="listen-choose__feedback-area" aria-live="polite">
        {selectedAnswer !== null ? (
          <p className="listen-choose__feedback listen-choose__feedback--correct">
            Bravo! Pravilen odgovor!
          </p>
        ) : (
          wrongAnswers.length > 0 && (
            <p className="listen-choose__feedback listen-choose__feedback--wrong">
              Poskusi znova!
            </p>
          )
        )}
      </div>
    </section>
  )
}
