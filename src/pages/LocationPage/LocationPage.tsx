import { useEffect, useState } from 'react'
import { api, type LocationResults, type Info, type ErrorType } from '@/pages/api'
import s from './LocationPage.module.css'

export const LocationPage = () => {
  const [locations, setLocations] = useState<LocationResults[]>([])

  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })

  const [error, setError] = useState<ErrorType>(null)

  const fetchData = (url: string | null) => {
    if (!url) return
    api
      .getLocations(url)
      .then((res) => {
        setLocations(res.data.results)
        setInfo(res.data.info)
        setError(null)
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Unknown error')
      })
  }

  useEffect(() => {
    fetchData('/location')
  }, [])

  const nextPageHandler = () => {
    fetchData(info.next)
  }

  const previousPageHandler = () => {
    fetchData(info.prev)
  }

  return (
    <div className={'pageContainer'}>
      <h1 className={`${s.pageTitle} ${s.title}`}>LocationPage</h1>

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
