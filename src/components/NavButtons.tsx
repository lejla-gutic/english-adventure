import { routeHref } from '../router'
import Icon from './Icon'

// The text label is hidden on phones (see index.css), so keep aria-label.
export function HomeButton() {
  return (
    <a className="btn btn--outline btn--small" href={routeHref({ page: 'home' })} aria-label="Domov">
      <Icon name="home" />
      <span>Domov</span>
    </a>
  )
}

export function MapButton() {
  return (
    <a className="btn btn--outline btn--small" href={routeHref({ page: 'topics' })} aria-label="Zemljevid">
      <Icon name="arrow-left" />
      <span>Zemljevid</span>
    </a>
  )
}
