import { type ChangeEvent, useState } from 'react'
import { api, type LocationResults } from '@/pages/api'
import { usePaginatedData } from '@/common/hooks'
import { ErrorMessage, Loader, PageTitle, Pagination } from '@/common/components'
import { LocationsList } from './LocationsList/LocationsList'
import s from './LocationPage.module.css'

export const LocationPage = () => {
  const {
    data: locations,
    info,
    currentPage,
    error,
    isLoading,
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

      {!isLoading && error && <ErrorMessage error={error} />}

      {isLoading && <Loader />}

      {!error && locations.length > 0 && (
        <>
          <LocationsList locations={locations} />

          <Pagination
            colorType={'locations'}
            currentPage={currentPage}
            pageInfo={info}
            onPrev={previousPageHandler}
            onNext={nextPageHandler}
          />
        </>
      )}
    </div>
  )
}
