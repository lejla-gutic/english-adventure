import { MAX_STARS_PER_GAME } from '../data/games'

export function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      className={filled ? 'star star--filled' : 'star'}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />
    </svg>
  )
}

interface StarsProps {
  count: number
  max?: number
  className?: string
}

export default function Stars({ count, max = MAX_STARS_PER_GAME, className = '' }: StarsProps) {
  return (
    <span className={`stars ${className}`} role="img" aria-label={`${count} od ${max} zvezdic`}>
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} filled={i < count} />
      ))}
    </span>
  )
}
