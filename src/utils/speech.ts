// Pronunciation with the browser's built-in Web Speech API (speechSynthesis).
// No external service or API key is needed; the available voices depend on the
// browser and operating system.

const PREFERRED_LANG = 'en-GB'
const CHILD_RATE = 0.8 // a bit slower than normal (1.0), easier for children

export interface SpeakOptions {
  rate?: number // 0.1–10, default 0.8
  onEnd?: () => void // called when the word has finished, was stopped or failed
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
}

let englishVoice: SpeechSynthesisVoice | null | undefined
// Keeps the current utterance referenced – some browsers (Chrome) otherwise
// garbage-collect it mid-word and never fire its end event.
let currentUtterance: SpeechSynthesisUtterance | null = null

// Safari (and sometimes Chrome) silently drop an utterance passed to speak()
// right after cancel(). When something was still being spoken, the new word is
// started after this short pause instead.
const RESTART_DELAY_MS = 120
let pendingStart: { timer: ReturnType<typeof setTimeout>; finish: () => void } | null = null

// A word waiting for its delayed start is dropped; its onEnd is still called.
function clearPendingStart() {
  if (!pendingStart) return
  const { timer, finish } = pendingStart
  pendingStart = null
  clearTimeout(timer)
  finish()
}

const normaliseLang = (lang: string) => lang.replace('_', '-').toLowerCase()

// en-GB if available, otherwise any other English voice.
function findEnglishVoice(): SpeechSynthesisVoice | null {
  const english = window.speechSynthesis
    .getVoices()
    .filter((voice) => normaliseLang(voice.lang).startsWith('en'))
  return (
    english.find((voice) => normaliseLang(voice.lang) === 'en-gb' && voice.localService) ??
    english.find((voice) => normaliseLang(voice.lang) === 'en-gb') ??
    english.find((voice) => voice.default) ??
    english[0] ??
    null
  )
}

function getEnglishVoice(): SpeechSynthesisVoice | null {
  // Chrome loads the voice list asynchronously, so an empty result is not cached.
  if (!englishVoice) englishVoice = findEnglishVoice()
  return englishVoice
}

if (isSpeechSupported()) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    englishVoice = undefined
  })
}

// "mum / mother" -> "mum, mother" (read as two words, not "mum slash mother").
function toSpokenText(word: string): string {
  return word.replace(/\s*\/\s*/g, ', ').trim()
}

/**
 * Says an English word or short sentence out loud.
 * Anything still being spoken is stopped first, so repeated clicks never overlap.
 * Returns false if the browser cannot speak (no speechSynthesis) or the text is empty.
 */
export function speakWord(word: string, options: SpeakOptions = {}): boolean {
  const text = toSpokenText(word)
  if (!isSpeechSupported() || text === '') return false

  const synth = window.speechSynthesis
  clearPendingStart()
  // Only cancel when needed: cancel() followed directly by speak() can lose the new word.
  const busy = synth.speaking || synth.pending
  if (busy) synth.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  const voice = getEnglishVoice()
  if (voice) utterance.voice = voice
  // Some browsers report voice languages as "en_GB"; utterances need "en-GB".
  utterance.lang = voice ? voice.lang.replace('_', '-') : PREFERRED_LANG
  utterance.rate = options.rate ?? CHILD_RATE

  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    if (currentUtterance === utterance) currentUtterance = null
    options.onEnd?.()
  }
  // cancel() ends the previous word with an "interrupted" error – also treated as finished.
  utterance.onend = finish
  utterance.onerror = finish

  currentUtterance = utterance
  const start = () => {
    pendingStart = null
    if (synth.paused) synth.resume() // Chrome sometimes gets stuck in a paused state
    synth.speak(utterance)
  }

  if (busy) {
    pendingStart = { timer: setTimeout(start, RESTART_DELAY_MS), finish }
  } else {
    start()
  }
  return true
}

// Stops any word that is currently being spoken (e.g. when leaving a game).
export function stopSpeaking(): void {
  if (!isSpeechSupported()) return
  clearPendingStart()
  window.speechSynthesis.cancel()
}
