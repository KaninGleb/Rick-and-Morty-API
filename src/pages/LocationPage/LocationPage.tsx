import { api, type LocationResults } from '@/pages/api'
import { usePaginatedData } from '@/common/hooks'
import s from './LocationPage.module.css'
import type { ChangeEvent } from 'react'

export const LocationPage = () => {
  const {
    data: locations,
    info,
    error,
    nextPageHandler,
    previousPageHandler,
    fetchData,
  } = usePaginatedData<LocationResults>(api.getLocations, '/location')

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    fetchData(`/location?name=${value}`)
  }

  return (
    <div className={s.pageContainer}>
      <h1 className={s.pageTitle}>Locations</h1>
      <input type="search" className={s.search} onChange={searchHandler} placeholder="🔍 Search location by name..." />

      {error && <div className={s.errorMessage}>{error}</div>}

      {!error && locations.length > 0 && (
        <>
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
                    <span className={s.label}>👥 Residents:</span> {l.residents.length}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={s.buttonContainer}>
            <button className={s.linkButton} disabled={!info.prev} onClick={previousPageHandler}>
              Previous
            </button>
            <button className={s.linkButton} disabled={!info.next} onClick={nextPageHandler}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
