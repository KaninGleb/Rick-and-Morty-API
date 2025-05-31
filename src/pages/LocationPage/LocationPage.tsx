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
    <div className={'pageContainer'}>
      <h1 className={`pageTitle ${s.title}`}>LocationPage</h1>
      <input type={'search'} className={'search'} onChange={searchHandler} placeholder={'Search...'} />

      {error && <div className="errorMessage">{error}</div>}

      {!error && locations.length > 0 && (
        <>
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

          <div className={'buttonContainer'}>
            <button className="linkButton" disabled={!info.prev} onClick={previousPageHandler}>
              Назад
            </button>
            <button className="linkButton" disabled={!info.next} onClick={nextPageHandler}>
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  )
}
