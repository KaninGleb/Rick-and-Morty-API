import type { LocationResults } from '@/pages/api'
import s from './LocationsList.module.css'

type LocationsListPropsType = {
  locations: LocationResults[]
}

export const LocationsList = ({ locations }: LocationsListPropsType) => (
  <div className={s.locationsList}>
    {locations.map((l) => (
      <div key={l.id} className={s.locationCard}>
        <h2 className={s.locationName}>{l.name}</h2>
        <div className={s.locationInfo}>
          <p>
            <span className={s.label}>🧭 Type:</span> {l.type || 'Unknown'}
          </p>
          <p>
            <span className={s.label}>🌌 Dimension:</span> {l.dimension || 'Unknown'}
          </p>
          <p>
            <span className={s.label}>👥 Residents:</span>{' '}
            <span className={s.residentsCount}>{l.residents.length}</span>
          </p>
        </div>
      </div>
    ))}
  </div>
)