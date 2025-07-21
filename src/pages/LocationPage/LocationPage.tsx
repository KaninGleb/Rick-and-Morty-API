import { type ChangeEvent, useState } from 'react'
import { api, type LocationResults } from '@/pages/api'
import { usePaginatedData } from '@/common/hooks'
import { PageTitle, Pagination } from '@/common/components'
import s from './LocationPage.module.css'

export const LocationPage = () => {
  const {
    data: locations,
    info,
    currentPage,
    error,
    nextPageHandler,
    previousPageHandler,
    fetchData,
  } = usePaginatedData<LocationResults>(api.getLocations, '/location')

  const [searchQuery, setSearchQuery] = useState('')

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchQuery(value)
    fetchData(`/location?name=${value}`)
  }

  return (
    <div className={s.pageContainer}>
      <PageTitle
        title={'Location Multiverse'}
        searchQuery={searchQuery}
        onSearch={searchHandler}
        placeholder={'Search across locations... (e.g., Earth, Post-Apocalyptic Earth)'}
      />

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

          <Pagination currentPage={currentPage} pageInfo={info} onPrev={previousPageHandler} onNext={nextPageHandler} />
        </>
      )}
    </div>
  )
}
