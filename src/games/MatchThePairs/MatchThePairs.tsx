import { useEffect, useState } from 'react'
import type { GameProps } from '../types'
import { getWordsWithImages } from '../../data/vocabulary'
import './MatchThePairs.css'

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

  audio.play().catch(() => {

  })
}

export default function MatchThePairs({
  topic,
  grade,
  onProgress,
  onFinish
}: GameProps) {


  const [selectedWords] = useState(() => {
    const words = getWordsWithImages(topic.id, grade)
    return shuffleWords(words).slice(0, 4)
  })

  const [shuffledWords] = useState(() => shuffleWords(selectedWords))

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [wrongWord, setWrongWord] = useState<string | null>(null)
  const [wrongPairs, setWrongPairs] = useState<string[]>([])

  useEffect(() => {
    onProgress({
      current: matchedPairs.length,
      total: selectedWords.length,
      label: 'Pari'
    })
  }, [matchedPairs.length, selectedWords.length, onProgress])


  useEffect(() => {
    if (selectedWords.length === 0) return
    if (matchedPairs.length !== selectedWords.length) return

    const correctPairs = matchedPairs.filter(
      (id) => !wrongPairs.includes(id)
    ).length

    const timer = setTimeout(() => {
      playSound('complete')

      onFinish({
        correct: correctPairs,
        total: selectedWords.length
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [matchedPairs, wrongPairs, selectedWords.length, onFinish])

  function handleImageClick(id: string) {
    if (matchedPairs.includes(id)) return
    if (wrongWord !== null) return

    setSelectedImage(id)
  }

  function handleWordClick(id: string) {
    if (selectedImage === null) return
    if (matchedPairs.includes(id)) return
    if (wrongWord !== null) return

    if (selectedImage === id) {
      playSound('correct')

      setMatchedPairs([...matchedPairs, id])
      setSelectedImage(null)
    } else {
      playSound('wrong')
      setWrongWord(id)

      if (!wrongPairs.includes(selectedImage)) {
        setWrongPairs([...wrongPairs, selectedImage])
      }

      setTimeout(() => {
        setWrongWord(null)
        setSelectedImage(null)
      }, 800)
    }
  }

  return (
    <section className="match-pairs">
      <h1>Poveži sliko z besedo</h1>
      <p>Najprej klikni sliko, nato pravo besedo.</p>

      <div className="match-pairs__grid">

        <div className="match-pairs__column">
          {selectedWords.map((word) => (
            <button
              type="button"
              className={`match-pairs__card ${
                matchedPairs.includes(word.id) ||
                selectedImage === word.id
                  ? 'match-pairs__card--pressed'
                  : ''
              }`}
              key={word.id}
              onClick={() => handleImageClick(word.id)}
              disabled={matchedPairs.includes(word.id)}
              style={{
                borderColor: matchedPairs.includes(word.id)
                  ? '#218c55'
                  : selectedImage === word.id && wrongWord !== null
                    ? '#e63946'
                    : selectedImage === word.id
                      ? '#3478e5'
                      : '#dce6f5'
              }}
            >
              <span
                className={`match-pairs__circle ${
                  matchedPairs.includes(word.id)
                    ? 'match-pairs__circle--matched'
                    : ''
                }`}
              >
                {matchedPairs.includes(word.id)
                  ? matchedPairs.indexOf(word.id) + 1
                  : ''}
              </span>

              <img src={word.image} alt={word.english} />
            </button>
          ))}
        </div>

        <div className="match-pairs__column">
          {shuffledWords.map((word) => (
            <button
              type="button"
              className={`match-pairs__card ${
                matchedPairs.includes(word.id) ||
                wrongWord === word.id
                  ? 'match-pairs__card--pressed'
                  : ''
              }`}
              key={word.id}
              onClick={() => handleWordClick(word.id)}
              disabled={matchedPairs.includes(word.id)}
              style={{
                borderColor: matchedPairs.includes(word.id)
                  ? '#218c55'
                  : wrongWord === word.id
                    ? '#e63946'
                    : '#dce6f5'
              }}
            >
              <span
                className={`match-pairs__circle ${
                  matchedPairs.includes(word.id)
                    ? 'match-pairs__circle--matched'
                    : ''
                }`}
              >
                {matchedPairs.includes(word.id)
                  ? matchedPairs.indexOf(word.id) + 1
                  : ''}
              </span>

              <span>{word.english}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
