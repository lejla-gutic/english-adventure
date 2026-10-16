interface ProgressBarProps {
  value: number // 0–1
  color?: 'blue' | 'yellow'
}

export default function ProgressBar({ value, color = 'blue' }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(value, 0), 1) * 100)
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
      <div className={`progress__fill progress__fill--${color}`} style={{ width: `${percent}%` }} />
    </div>
  )
}
