// The owl mascot, drawn as SVG so it scales without image files.
export default function Owl({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <path d="M30 112q-14 30 6 58M170 112q14 30-6 58" stroke="#6b4226" strokeWidth="12" strokeLinecap="round" fill="none" />
      <polygon points="36,58 46,14 82,40" fill="#8b5a3c" />
      <polygon points="164,58 154,14 118,40" fill="#8b5a3c" />
      <ellipse cx="100" cy="112" rx="72" ry="84" fill="#8b5a3c" />
      <ellipse cx="100" cy="142" rx="50" ry="50" fill="#f2d7b0" />
      <circle cx="72" cy="78" r="26" fill="#fff" />
      <circle cx="128" cy="78" r="26" fill="#fff" />
      <circle cx="75" cy="81" r="12" fill="#1d2a4f" />
      <circle cx="125" cy="81" r="12" fill="#1d2a4f" />
      <circle cx="79" cy="77" r="3.5" fill="#fff" />
      <circle cx="129" cy="77" r="3.5" fill="#fff" />
      <polygon points="89,98 111,98 100,116" fill="#f5a623" />
    </svg>
  )
}
