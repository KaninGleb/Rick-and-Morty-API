import { useEffect, useState } from 'react'
import { api, type LocationResults } from '@/pages/api'
import s from './LocationPage.module.css'

export const LocationPage = () => {
  const [locations, setLocations] = useState<LocationResults[]>([])

  useEffect(() => {
    api.getLocations().then((res) => {
      setLocations(res.data.results)
    })
  }, [])

  return (
    <div className={'pageContainer'}>
      <h1 className={`${s.pageTitle} ${s.title}`}>LocationPage</h1>
      <div className={s.locationsList}>
        {locations.map((l) => (
          <div key={l.id} className={s.locationCard}>
            <h2 className={s.locationName}>{l.name}</h2>
            <ul className={s.locationDetails}>
              <li>
                <span className={s.label}>Type:</span> {l.type}
              </li>
              <li>
                <span className={s.label}>Dimension:</span> {l.dimension}
              </li>
              <li>
                <span className={s.label}>Residents:</span> {l.residents.length}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
