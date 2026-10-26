import { useState, type ReactNode } from 'react'
import { ENCOURAGING_MESSAGES, type OllieMood } from '../data/mascot'
import Owl from './Owl'

interface OllieMessageProps {
  mood: OllieMood
  children?: ReactNode // optional extra line, e.g. the correct answer
}

// Ollie with a speech bubble, shown in the mini-games after an answer.
// A random message is picked once when it appears; remount it (e.g. with `key`) for a new one.
export default function OllieMessage({ mood, children }: OllieMessageProps) {
  const [message] = useState(() => {
    const messages = ENCOURAGING_MESSAGES[mood]
    return messages[Math.floor(Math.random() * messages.length)]
  })

  return (
    <div className={`ollie-message ollie-message--${mood}`}>
      <Owl className="ollie-message__owl" />
      <p className="ollie-message__bubble">
        <span className="ollie-message__text">{message}</span>
        {children && <span className="ollie-message__detail">{children}</span>}
      </p>
    </div>
  )
}
