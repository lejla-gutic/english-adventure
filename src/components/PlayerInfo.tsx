import type { Grade } from '../types'
import { StarIcon } from './Stars'

interface PlayerInfoProps {
  grade: Grade
  stars: number
}

// Grade and star count pills shown in the header.
export default function PlayerInfo({ grade, stars }: PlayerInfoProps) {
  return (
    <>
      <span className="pill">{grade}. razred</span>
      <span className="pill pill--stars" aria-label={`${stars} zvezdic`}>
        <StarIcon /> {stars}
      </span>
    </>
  )
}
