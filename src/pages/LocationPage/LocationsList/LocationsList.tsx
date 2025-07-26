import { Link } from 'react-router'
import type { LocationResults } from '@/pages/api'
import { PATH } from '@/common/data/paths.ts'
import s from './LocationsList.module.css'

type LocationsListPropsType = {
  locations: LocationResults[]
}

export const LocationsList = ({ locations }: LocationsListPropsType) => (
  <div className={s.locationsList}>
    {locations.map((location) => (
      <Link className={s.locationLink} key={location.id} to={`${PATH.Locations}/${location.id}`}>
        <div className={s.locationCard}>
          <h2 className={s.locationName}>{location.name}</h2>
          <div className={s.locationInfo}>
            <p>
              <span className={s.label}>🧭 Type:</span> {location.type || 'Unknown'}
            </p>
            <p>
              <span className={s.label}>🌌 Dimension:</span>{' '}
              {location.dimension
                ? location.dimension.charAt(0).toUpperCase() + location.dimension.slice(1)
                : 'Unknown'}
            </p>
            <p>
              <span className={s.label}>👥 Residents:</span>{' '}
              <span className={s.residentsCount}>{location.residents.length}</span>
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
)
