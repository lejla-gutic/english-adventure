import type { ReactNode } from 'react'
import type { IconName } from '../types'

const ICONS: Record<IconName, ReactNode> = {
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </>
  ),
  speaker: (
    <>
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </>
  ),
  pairs: (
    <>
      <rect x="2.5" y="4" width="7" height="6" rx="2" />
      <rect x="14.5" y="14" width="7" height="6" rx="2" />
      <path d="M9.5 7H12a2 2 0 0 1 2 2v8h.5" />
    </>
  ),
  blocks: (
    <>
      <rect x="1.5" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
      <rect x="16.5" y="9" width="6" height="6" rx="1.5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v4" />
    </>
  ),
  'arrow-left': <path d="M19 12H5M12 19l-7-7 7-7" />,
  'arrow-right': <path d="M5 12h14M12 5l7 7-7 7" />,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  home: (
    <>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9v11h14V9" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  gamepad: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <path d="M6 12h4M8 10v4" />
      <circle cx="15.5" cy="13" r="1" />
      <circle cx="18" cy="10.5" r="1" />
    </>
  ),
  map: (
    <>
      <path d="M1.5 6v16l7-4 7 4 7-4V2l-7 4-7-4-7 4z" />
      <path d="M8.5 2v16M15.5 6v16" />
    </>
  ),
}

interface IconProps {
  name: IconName
  className?: string
}

export default function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}
