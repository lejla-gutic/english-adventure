import type { ReactNode } from 'react'
import { routeHref } from '../router'
import Owl from './Owl'

interface AppHeaderProps {
  nav?: ReactNode // navigation buttons shown next to the logo
  right?: ReactNode
}

export default function AppHeader({ nav, right }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__left">
          <a className="logo" href={routeHref({ page: 'home' })} aria-label="English Adventure – domov">
            <Owl />
            <span>English Adventure</span>
          </a>
          {nav && <nav className="app-header__nav">{nav}</nav>}
        </div>
        <div className="app-header__right">{right}</div>
      </div>
    </header>
  )
}
