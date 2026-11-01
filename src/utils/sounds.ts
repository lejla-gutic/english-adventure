// Short sound effects from public/sounds/ (correct, wrong, …).
//
// Safari blocks sound that is not started directly by a click or tap. The
// "Say it" result arrives later (after speech recognition), so a plain
// new Audio().play() is silently rejected there. Calling prepareSounds() inside
// a click unlocks a Web Audio context; sounds played through it later are allowed.
// Without Web Audio support the sounds fall back to a plain <audio> element.

export type SoundName = 'correct' | 'wrong' | 'complete' | 'new_level'

// Files in public/ are served from the app's base URL.
const soundUrl = (name: SoundName) => `${import.meta.env.BASE_URL}sounds/${name}.wav`

let context: AudioContext | null | undefined
const buffers = new Map<SoundName, Promise<AudioBuffer | null>>()

function getContext(): AudioContext | null {
  if (context !== undefined) return context
  const AudioContextClass =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext // older Safari
  try {
    context = AudioContextClass ? new AudioContextClass() : null
  } catch {
    context = null
  }
  return context
}

function loadBuffer(audio: AudioContext, name: SoundName): Promise<AudioBuffer | null> {
  let buffer = buffers.get(name)
  if (!buffer) {
    buffer = fetch(soundUrl(name))
      .then((response) => {
        if (!response.ok) throw new Error(`Sound ${name} not found`)
        return response.arrayBuffer()
      })
      .then((data) => audio.decodeAudioData(data))
      .catch(() => {
        buffers.delete(name) // try again next time
        return null
      })
    buffers.set(name, buffer)
  }
  return buffer
}

function playWithAudioElement(name: SoundName, onEnd?: () => void) {
  const audio = new Audio(soundUrl(name))
  if (onEnd) {
    audio.addEventListener('ended', onEnd, { once: true })
    audio.addEventListener('error', onEnd, { once: true })
  }
  audio.play().catch(() => onEnd?.())
}

// resume() is asynchronous: wait for it (a context unlocked by prepareSounds() in the
// same click is usually running a moment later). Chrome keeps the promise pending
// without a user gesture, so the wait is limited.
const RESUME_TIMEOUT_MS = 500

function whenRunning(audio: AudioContext): Promise<void> {
  if (audio.state === 'running') return Promise.resolve()
  return Promise.race([
    audio.resume().catch(() => {}),
    new Promise<void>((resolve) => setTimeout(resolve, RESUME_TIMEOUT_MS)),
  ])
}

/**
 * Call from a click/tap handler before a sound will be played later (e.g. after
 * speech recognition): unlocks audio in Safari and preloads the given sounds.
 */
export function prepareSounds(names: readonly SoundName[]): void {
  const audio = getContext()
  if (!audio) return
  if (audio.state !== 'running') audio.resume().catch(() => {})
  // Safari unlocks the context only when a sound is actually started in the gesture.
  try {
    const silence = audio.createBufferSource()
    silence.buffer = audio.createBuffer(1, 1, 22050)
    silence.connect(audio.destination)
    silence.start(0)
  } catch {
    // not needed in other browsers
  }
  names.forEach((name) => void loadBuffer(audio, name))
}

/**
 * Plays a sound effect. `onEnd` is called when it has finished – or straight
 * away if it could not be played – so the caller can e.g. speak a word afterwards
 * without the two overlapping.
 */
export function playSound(name: SoundName, onEnd?: () => void): void {
  const audio = getContext()
  if (!audio) {
    playWithAudioElement(name, onEnd)
    return
  }

  void Promise.all([loadBuffer(audio, name), whenRunning(audio)]).then(([buffer]) => {
    // Not unlocked (no prepareSounds() click yet) or not loaded: use <audio> instead.
    if (!buffer || audio.state !== 'running') {
      playWithAudioElement(name, onEnd)
      return
    }
    const source = audio.createBufferSource()
    source.buffer = buffer
    source.connect(audio.destination)
    if (onEnd) source.onended = () => onEnd()
    source.start(0)
  })
}
