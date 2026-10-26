
import { useEffect, useMemo, useRef, useState } from 'react'
import type { GameProps } from '../types'
import { getSentences } from '../../data/sentences'
import OllieMessage from '../../components/OllieMessage'
import './BuildASentence.css'

type WordTile = {
  id: number
  text: string
}

function shuffleWords(words: WordTile[]): WordTile[] {
  const shuffled = [...words]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

function getWords(sentence: string): string[] {
  return sentence.replace(/[.!?]$/, '').split(/\s+/)
}

// Predvajanje zvokov
function playSound(name: string) {
  const audio = new Audio(`/sounds/${name}.wav`)
  audio.play().catch(() => {})
}

export default function BuildASentence({
  topic,
  grade,
  onProgress,
  onFinish,
}: GameProps) {
  const sentences = useMemo(
    () => getSentences(topic.id, grade),
    [topic.id, grade]
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [availableWords, setAvailableWords] = useState<WordTile[]>([])
  const [selectedWords, setSelectedWords] = useState<WordTile[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [hadMistake, setHadMistake] = useState(false)
  const [finished, setFinished] = useState(false)

  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Prepreči, da bi hiter dvojni klik na "Preveri" poved preveril (in štel) dvakrat
  const checking = useRef(false)

  const sentence = sentences[currentIndex]
  const total = sentences.length

  useEffect(() => {
    if (!sentence) return

    const words = getWords(sentence.text).map((text, id) => ({
      id,
      text,
    }))

    setAvailableWords(shuffleWords(words))
    setSelectedWords([])
    setFeedback(null)
    setHadMistake(false)
    checking.current = false

    return () => {
      if (retryTimer.current !== null) {
        clearTimeout(retryTimer.current)
        retryTimer.current = null
      }
    }
  }, [sentence])

  useEffect(() => {
    onProgress({
      current: Math.min(currentIndex + 1, total),
      total,
      label: 'Poved',
    })
  }, [currentIndex, total, onProgress])

  function selectWord(word: WordTile) {
    if (feedback !== null || finished) return

    setAvailableWords((prev) => prev.filter((w) => w.id !== word.id))
    setSelectedWords((prev) => [...prev, word])
    setFeedback(null)
  }

  function removeWord(word: WordTile) {
    if (feedback !== null || finished) return

    setSelectedWords((prev) => prev.filter((w) => w.id !== word.id))
    setAvailableWords((prev) => [...prev, word])
    setFeedback(null)
  }

  function clearWords() {
    if (feedback !== null || finished) return

    setAvailableWords((prev) =>
      shuffleWords([...prev, ...selectedWords])
    )
    setSelectedWords([])
    setFeedback(null)
  }

  function checkAnswer() {
    if (
      !sentence ||
      checking.current ||
      feedback !== null ||
      finished ||
      selectedWords.length !== getWords(sentence.text).length
    ) {
      return
    }
    checking.current = true

    const answer = selectedWords.map((word) => word.text).join(' ')
    const expected = getWords(sentence.text).join(' ')

    if (answer === expected) {
      // Pravilen odgovor
      playSound('correct')
      setFeedback('correct')
      setCorrectCount((prev) => prev + (hadMistake ? 0 : 1))
    } else {
      // Napačen odgovor
      playSound('wrong')
      setFeedback('wrong')
      setHadMistake(true)

      retryTimer.current = setTimeout(() => {
        setAvailableWords((prev) =>
          shuffleWords([...prev, ...selectedWords])
        )
        setSelectedWords([])
        setFeedback(null)
        retryTimer.current = null
        checking.current = false
      }, 1500)
    }
  }

  function nextSentence() {
    if (feedback !== 'correct' || finished) return

    if (currentIndex + 1 >= total) {
      // Zaključek igre
      setFinished(true)
      playSound('complete')

      onFinish({
        correct: correctCount,
        total,
      })
    } else {
      // Ne (prev) => prev + 1: dvojni klik na "Naprej" bi sicer preskočil poved
      setCurrentIndex(currentIndex + 1)
    }
  }

  if (!sentence) {
    return <p>Ni pripravljenih povedi za izbrano temo.</p>
  }

  const punctuation = sentence.text.match(/[.!?]$/)?.[0] ?? '.'

  return (
    <div className="build-sentence">
      <h1>Sestavi pravilno poved</h1>

      <p className="build-sentence-instruction">
        Klikni besede v pravilnem vrstnem redu.
      </p>

      <div className={`build-sentence-answer ${feedback ?? ''}`}>
        {selectedWords.map((word) => (
          <button
            key={word.id}
            type="button"
            className="build-sentence-selected-word"
            onClick={() => removeWord(word)}
            disabled={feedback !== null || finished}
          >
            {word.text}
          </button>
        ))}

        {Array.from({
          length: getWords(sentence.text).length - selectedWords.length,
        }).map((_, index) => (
          <span
            className="build-sentence-empty-slot"
            key={index}
          />
        ))}

        <span className="build-sentence-punctuation">
          {punctuation}
        </span>
      </div>

      {/* Prostor za povratno informacijo */}
      <div
        className="build-sentence-feedback-area"
        aria-live="polite"
      >
        {feedback !== null && <OllieMessage key={feedback} mood={feedback} />}
      </div>

      {/* Besede, ki jih učenec še ni izbral */}
      <div className="build-sentence-word-bank">
        {availableWords.map((word) => (
          <button
            key={word.id}
            type="button"
            className="build-sentence-word"
            onClick={() => selectWord(word)}
            disabled={feedback !== null || finished}
          >
            {word.text}
          </button>
        ))}
      </div>

      <div className="build-sentence-actions">
        {feedback !== 'correct' ? (
          <>
            <button
              type="button"
              className="build-sentence-clear"
              onClick={clearWords}
              disabled={
                selectedWords.length === 0 ||
                feedback !== null ||
                finished
              }
            >
              Pobriši
            </button>

            <button
              type="button"
              className="build-sentence-check"
              onClick={checkAnswer}
              disabled={
                selectedWords.length !== getWords(sentence.text).length ||
                feedback !== null ||
                finished
              }
            >
              Preveri
            </button>
          </>
        ) : (
          <button
            type="button"
            className="build-sentence-check"
            onClick={nextSentence}
            disabled={finished}
          >
            {currentIndex + 1 === total ? 'Zaključi' : 'Naprej'}
          </button>
        )}
      </div>
    </div>
  )
}
