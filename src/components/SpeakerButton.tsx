import { useRef, useState } from 'react'
import { isSpeechSupported, speakWord } from '../utils/speech'
import Icon from './Icon'

interface SpeakerButtonProps {
  word: string // English word (or sentence) to pronounce
  label?: string // visible text, e.g. "Poslušaj" – without it the button is a round icon
  className?: string
}

// Speaker button that pronounces a word; clicking again plays it again.
export default function SpeakerButton({ word, label, className }: SpeakerButtonProps) {
  const [speaking, setSpeaking] = useState(false)
  // A repeated click interrupts the previous word, whose end event arrives later –
  // only the most recent click may switch the "speaking" state off.
  const lastRequest = useRef(0)
  const supported = isSpeechSupported()

  function handleClick() {
    const request = ++lastRequest.current
    const started = speakWord(word, {
      onEnd: () => {
        if (request === lastRequest.current) setSpeaking(false)
      },
    })
    setSpeaking(started)
  }

  const classes = ['speaker-btn', label ? 'speaker-btn--label' : '', speaking ? 'speaker-btn--speaking' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      disabled={!supported}
      aria-label={label ? undefined : 'Poslušaj'}
      title={supported ? 'Poslušaj' : 'Tvoj brskalnik ne podpira izgovorjave.'}
    >
      <Icon name="speaker" />
      {label && <span>{label}</span>}
    </button>
  )
}
