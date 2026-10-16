import AppHeader from '../components/AppHeader'
import Icon from '../components/Icon'
import Owl from '../components/Owl'
import { StarIcon } from '../components/Stars'
import { MASCOT_NAME } from '../data/mascot'
import { routeHref } from '../router'
import type { Grade } from '../types'
import './HomePage.css'

const GRADES: Grade[] = [2, 3]

interface HomePageProps {
  grade: Grade
  onGradeChange: (grade: Grade) => void
}

export default function HomePage({ grade, onGradeChange }: HomePageProps) {
  return (
    <>
      <AppHeader right={<span className="header-note">Za učence 2. in 3. razreda</span>} />
      <main className="page">
        <section className="home">
          <div>
            <h1>
              Pozdravljen!
              <br />
              Greva na angleško pustolovščino?
            </h1>
            <p className="home__lead">
              Igraj kratke igre, zbiraj zvezdice in odkleni nove teme na zemljevidu.
            </p>

            <p className="home__label" id="grade-label">
              Izberi svoj razred
            </p>
            <div className="grade-toggle" role="group" aria-labelledby="grade-label">
              {GRADES.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={grade === g}
                  onClick={() => onGradeChange(g)}
                >
                  {g}. razred
                </button>
              ))}
            </div>

            <a className="btn btn--primary btn--big" href={routeHref({ page: 'topics' })}>
              Začni pustolovščino <Icon name="arrow-right" />
            </a>
          </div>

          <div className="home__mascot">
            <p className="speech">Hello! I am {MASCOT_NAME}.</p>
            <Owl className="home__owl" />
          </div>
        </section>

        <ul className="features">
          <li className="feature">
            <Icon name="gamepad" className="feature__icon feature__icon--blue" />
            <div>
              <h2>Igraj mini-igre</h2>
              <p>Pet različnih iger pri vsaki temi</p>
            </div>
          </li>
          <li className="feature">
            <span className="feature__icon">
              <StarIcon />
            </span>
            <div>
              <h2>Zbiraj zvezdice</h2>
              <p>Do 3 zvezdice za vsako igro</p>
            </div>
          </li>
          <li className="feature">
            <Icon name="map" className="feature__icon feature__icon--green" />
            <div>
              <h2>Odkleni nove teme</h2>
              <p>Živali, barve, hrana in še več</p>
            </div>
          </li>
        </ul>
      </main>
    </>
  )
}
