import { useState } from 'react'
import type { VocabularyWord } from '../types'

interface WordImageProps {
  word: VocabularyWord
  // Text for screen readers / broken images. Defaults to the Slovenian word,
  // so it does not give away the English answer.
  alt?: string
  className?: string
}

// The illustration of a vocabulary word. If the word has no image (yet) or the
// file cannot be loaded, a tile with the colour (Colours topic) or the
// Slovenian word is shown instead.
export default function WordImage({ word, alt = word.slovenian, className }: WordImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const classes = ['word-image', className].filter(Boolean).join(' ')

  if (!word.image || failedSrc === word.image) {
    return (
      <span className={`${classes} word-image--fallback`} role="img" aria-label={alt}>
        {word.color ? (
          <span className="word-image__swatch" style={{ background: word.color }} />
        ) : (
          word.slovenian
        )}
      </span>
    )
  }

  return (
    <img
      className={classes}
      src={word.image}
      alt={alt}
      draggable={false}
      onError={() => setFailedSrc(word.image ?? null)}
    />
  )
}
