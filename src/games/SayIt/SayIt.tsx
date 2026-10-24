import { useEffect, useRef, useState } from 'react'
import Icon from '../../components/Icon'
import SpeakerButton from '../../components/SpeakerButton'
import WordImage from '../../components/WordImage'
import { getWords } from '../../data/vocabulary'
import { routeHref } from '../../router'
import { shuffle } from '../../utils/random'
import { speakWord, stopSpeaking } from '../../utils/speech'
import type { GameProps } from '../types'
import { isCorrectAnswer, isRecognitionSupported, listenOnce, type RecognitionError } from './recognition'
import './SayIt.css'

const MAX_WORDS = 10

type Status = 'idle' | 'listening' | 'correct' | 'wrong' | 'error'

// Friendly explanations (in Slovenian) for the things that can go wrong.
const ERROR_MESSAGES: Record<RecognitionError, string> = {
  'not-allowed': 'Mikrofon ni dovoljen. Prosi odraslo osebo, da v brskalniku dovoli uporabo mikrofona.',
  'no-speech': 'Nič nisem slišal. Pritisni mikrofon in povej besedo malo glasneje.',
  'audio-capture': 'Ne najdem mikrofona. Preveri, ali je mikrofon priključen.',
  network: 'Za prepoznavanje govora potrebuješ internetno povezavo.',
  other: 'Nekaj je šlo narobe. Poskusi še enkrat.',
}

export default function SayIt({ topic, grade, onProgress, onFinish }: GameProps) {
  // Created once per game; "Igraj znova" remounts the game, which shuffles a new round.
  const [words] = useState(() => shuffle(getWords(topic.id, grade)).slice(0, MAX_WORDS))
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [heard, setHeard] = useState('') // what the browser understood
  const [error, setError] = useState<RecognitionError | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  const cancelListening = useRef<(() => void) | null>(null)
  const nextButton = useRef<HTMLButtonElement>(null)

  const word = words[index]
  const total = words.length
  const supported = isRecognitionSupported()

  useEffect(() => {
    if (total > 0) onProgress({ current: index + 1, total, label: 'Beseda' })
  }, [index, total, onProgress])

  // Keyboard users: jump to "Naprej" after a correct answer.
  useEffect(() => {
    if (status === 'correct') nextButton.current?.focus()
  }, [status])

  // Stop listening and speaking when the child leaves the game.
  useEffect(
    () => () => {
      cancelListening.current?.()
      stopSpeaking()
    },
    [],
  )

  if (!word) {
    return (
      <section className="say say--empty">
        <h1>Tukaj še ni besed</h1>
        <p>Za to temo in razred še nimamo besed. Izberi drugo igro ali temo.</p>
        <a className="btn btn--primary" href={routeHref({ page: 'topic', topic })}>
          Nazaj na temo
        </a>
      </section>
    )
  }

  if (!supported) {
    return (
      <section className="say say--empty">
        <h1>Mikrofon tukaj ne deluje</h1>
        <p>
          Tvoj brskalnik ne podpira prepoznavanja govora. Igraj v brskalniku Google Chrome, Microsoft Edge ali
          Safari.
        </p>
        <a className="btn btn--primary" href={routeHref({ page: 'topic', topic })}>
          Nazaj na temo
        </a>
      </section>
    )
  }

  function handleListen() {
    if (status === 'listening') return
    stopSpeaking() // the microphone should not hear our own voice
    setStatus('listening')
    setHeard('')
    setError(null)

    cancelListening.current = listenOnce({
      onResult: (transcripts) => {
        cancelListening.current = null
        setHeard(transcripts[0] ?? '')
        if (isCorrectAnswer(word.english, transcripts)) {
          setStatus('correct')
          setCorrectCount((count) => count + 1)
        } else {
          setStatus('wrong')
          speakWord(word.english) // let the child hear the right pronunciation
        }
      },
      onError: (recognitionError) => {
        cancelListening.current = null
        setError(recognitionError)
        setStatus('error')
      },
    })
  }

  // Goes to the next word; a skipped word does not count as correct.
  function handleNext() {
    cancelListening.current?.()
    cancelListening.current = null
    stopSpeaking()
    if (index + 1 >= total) {
      onFinish({ correct: correctCount, total })
      return
    }
    setIndex(index + 1)
    setStatus('idle')
    setHeard('')
    setError(null)
  }

  const listening = status === 'listening'
  const answered = status === 'correct'

  return (
    <section className="say">
      <div className="say__title">
        <h1>Say it!</h1>
        <SpeakerButton word="Say it!" />
      </div>

      <div className="say__card">
        <div className="say__picture">
          <WordImage key={word.id} word={word} />
        </div>
        <p className="say__word" lang="en">
          {word.english}
        </p>
        <SpeakerButton word={word.english} label="Poslušaj" />
      </div>

      <div className="say__mic">
        <button
          type="button"
          className={`say__mic-btn${listening ? ' say__mic-btn--listening' : ''}`}
          onClick={handleListen}
          aria-disabled={listening}
          disabled={answered}
          aria-label={listening ? 'Poslušam' : 'Govori'}
        >
          <Icon name="mic" />
        </button>
        <p className="say__mic-label">{listening ? 'Poslušam …' : 'Pritisni in povej besedo'}</p>
      </div>

      <div className="say__footer" aria-live="polite">
        {status === 'correct' && (
          <div className="say__feedback say__feedback--correct">
            <p className="say__feedback-text">
              Bravo! <strong lang="en">{word.english}</strong> je pravilno.
            </p>
            <div className="say__feedback-actions">
              <button ref={nextButton} type="button" className="btn btn--primary btn--big" onClick={handleNext}>
                Naprej
              </button>
            </div>
          </div>
        )}

        {(status === 'wrong' || status === 'error') && (
          <div className="say__feedback say__feedback--retry">
            <p className="say__feedback-text">
              {status === 'wrong' ? (
                <>
                  Skoraj! Slišano: <strong lang="en">»{heard}«</strong>. Poslušaj besedo in poskusi znova.
                </>
              ) : (
                error && ERROR_MESSAGES[error]
              )}
            </p>
            <div className="say__feedback-actions">
              <button type="button" className="btn btn--flat" onClick={handleNext}>
                Preskoči
              </button>
            </div>
          </div>
        )}

        {(status === 'idle' || status === 'listening') && (
          <p className="say__hint">Poglej besedo, pritisni mikrofon in jo povej na glas v angleščini.</p>
        )}
      </div>
    </section>
  )
}
