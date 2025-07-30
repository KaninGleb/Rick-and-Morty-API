import { type ChangeEvent, useEffect } from 'react'
import { useLocationStore } from '@/stores'
import { useInfiniteScroll } from '@/common/hooks'
import { ErrorMessage, Loader, PageTitle } from '@/common/components'
import { LocationsList } from './LocationsList/LocationsList'
import s from './LocationPage.module.css'

export const LocationPage = () => {
  const {
    locations,
    info,
    isLoading,
    error,
    searchQuery,
    scrollPosition,
    fetchLocations,
    fetchNextPage,
    setSearchQuery,
    setScrollPosition,
  } = useLocationStore()

  const observerRef = useInfiniteScroll({
    hasMore: !!info.next && searchQuery.trim() === '',
    loadMore: fetchNextPage,
    isLoading,
  })

  useEffect(() => {
    if (locations.length === 0 && searchQuery === '') {
      fetchLocations('/location')
    }
  }, [])

  useEffect(() => {
    if (scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: 'auto' })
      }, 0)
    }

    let throttleTimeout: NodeJS.Timeout | null = null
    const handleScroll = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setScrollPosition(window.scrollY)
          throttleTimeout = null
        }, 200)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (throttleTimeout) {
        clearTimeout(throttleTimeout)
      }
    }
  }, [scrollPosition, setScrollPosition])

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchQuery(value)
    setScrollPosition(0)
    window.scrollTo(0, 0)
    fetchLocations(`/location?name=${value}`)
  }

  return (
    <div className={'pageContainer'}>
      <PageTitle
        colorType={'locations'}
        title={'Location Multiverse'}
        searchQuery={searchQuery}
        onSearch={searchHandler}
        placeholder={'Search across locations... (e.g., Earth, Post-Apocalyptic Earth)'}
      />

      {!isLoading && error && <ErrorMessage error={error} />}

      {locations.length > 0 && <LocationsList locations={locations} />}

      {isLoading && locations.length > 0 && <Loader colorType={'locations'} text={'Loading more locations...'} />}
      {isLoading && locations.length === 0 && (
        <Loader colorType={'locations'} text={'Scanning the multiverse for locations...'} />
      )}

      {!isLoading && !!info.next && <div ref={observerRef} className={s.infiniteScrollAnchor} />}
    </div>
  )
}
