// Speech-to-text with the browser's built-in Web Speech API (SpeechRecognition).
// Chrome, Edge and Safari support it (Chrome/Edge send the audio to an online
// service, so an internet connection is needed); Firefox does not.

const RECOGNITION_LANG = 'en-US'
const MAX_ALTERNATIVES = 5 // more guesses = more chances to recognise a child's pronunciation

// Minimal typings – SpeechRecognition is not part of every TypeScript DOM lib.
interface RecognitionAlternative {
  transcript: string
}

interface RecognitionResultEvent {
  results: ArrayLike<ArrayLike<RecognitionAlternative>>
}

interface RecognitionErrorEvent {
  error: string
}

interface Recognition {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  onresult: ((event: RecognitionResultEvent) => void) | null
  onerror: ((event: RecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  abort(): void
}

type RecognitionConstructor = new () => Recognition

function getRecognitionConstructor(): RecognitionConstructor | null {
  if (typeof window === 'undefined') return null
  const browser = window as unknown as {
    SpeechRecognition?: RecognitionConstructor
    webkitSpeechRecognition?: RecognitionConstructor // Chrome, Edge, Safari
  }
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition ?? null
}

export function isRecognitionSupported(): boolean {
  return getRecognitionConstructor() !== null
}

// Simplified error kinds – each one gets its own message in the game.
export type RecognitionError = 'not-allowed' | 'no-speech' | 'audio-capture' | 'network' | 'other'

function toRecognitionError(error: string): RecognitionError {
  switch (error) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'not-allowed'
    case 'no-speech':
    case 'audio-capture':
    case 'network':
      return error
    default:
      return 'other'
  }
}

interface ListenHandlers {
  onResult: (transcripts: string[]) => void // everything the browser thinks was said
  onError: (error: RecognitionError) => void
}

/**
 * Listens for one word or short phrase, then stops by itself.
 * Exactly one of the handlers is called. Returns a function that cancels
 * listening without calling any handler (e.g. when the child leaves the game).
 */
export function listenOnce({ onResult, onError }: ListenHandlers): () => void {
  const Constructor = getRecognitionConstructor()
  if (!Constructor) {
    onError('other')
    return () => {}
  }

  const recognition = new Constructor()
  recognition.lang = RECOGNITION_LANG
  recognition.interimResults = false
  recognition.continuous = false
  recognition.maxAlternatives = MAX_ALTERNATIVES

  let done = false
  const finish = (callback: () => void) => {
    if (done) return
    done = true
    callback()
  }

  recognition.onresult = (event) => {
    const transcripts: string[] = []
    for (const result of Array.from(event.results)) {
      for (const alternative of Array.from(result)) transcripts.push(alternative.transcript)
    }
    finish(() => onResult(transcripts))
  }
  recognition.onerror = (event) => {
    if (event.error === 'aborted') return // we cancelled it ourselves
    finish(() => onError(toRecognitionError(event.error)))
  }
  // Some browsers just end without a result or error when nothing was heard.
  recognition.onend = () => finish(() => onError('no-speech'))

  try {
    recognition.start()
  } catch {
    finish(() => onError('other'))
  }

  return () => {
    done = true
    recognition.abort()
  }
}

// Words the recogniser often writes differently from the vocabulary list
// (digits, American spelling, words that sound the same).
const SAME_SOUNDING: Record<string, string> = {
  '1': 'one',
  won: 'one',
  '2': 'two',
  to: 'two',
  too: 'two',
  '3': 'three',
  '4': 'four',
  for: 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  ate: 'eight',
  '9': 'nine',
  '10': 'ten',
  mom: 'mum',
  mommy: 'mum',
  mummy: 'mum',
}

// "Mom!" -> "mum", "School-bag." -> "school bag"
function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => SAME_SOUNDING[word] ?? word)
    .join(' ')
}

/**
 * True if one of the transcripts contains the expected word.
 * Words with alternatives ("mum / mother") accept any of them.
 */
export function isCorrectAnswer(expected: string, transcripts: readonly string[]): boolean {
  const answers = expected.split('/').map(normalise).filter(Boolean)
  return transcripts.some((transcript) => {
    const heard = normalise(transcript)
    return answers.some(
      (answer) =>
        ` ${heard} `.includes(` ${answer} `) ||
        // "schoolbag" for "school bag"
        heard.replace(/ /g, '') === answer.replace(/ /g, ''),
    )
  })
}
