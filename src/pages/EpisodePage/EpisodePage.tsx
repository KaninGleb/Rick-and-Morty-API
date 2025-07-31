import { useEffect, type ChangeEvent } from 'react'
import { useEpisodeStore } from '@/stores'
import { ErrorMessage, Icon, Loader, PageTitle } from '@/common/components'
import { EpisodeList, EpisodesInfoBar } from '@/pages'
import { useInfiniteScroll } from '@/common/hooks'
import s from './EpisodePage.module.css'

export const EpisodePage = () => {
  const {
    episodes,
    info,
    isLoading,
    error,
    searchQuery,
    fetchEpisodes,
    fetchNextPage,
    setSearchQuery,
    setScrollPosition,
  } = useEpisodeStore()

  const observerRef = useInfiniteScroll({
    hasMore: !!info.next && searchQuery.trim() === '',
    loadMore: fetchNextPage,
    isLoading,
  })

  useEffect(() => {
    const state = useEpisodeStore.getState()

    if (state.episodes.length === 0 && state.searchQuery === '') {
      fetchEpisodes()
    }

    if (state.scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo({ top: state.scrollPosition, behavior: 'auto' })
      }, 0)
    }

    return () => {
      useEpisodeStore.getState().setScrollPosition(window.scrollY)
    }
  }, [fetchEpisodes])

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchQuery(value)
    setScrollPosition(0)
    window.scrollTo(0, 0)
    fetchEpisodes(`/location?name=${value}`)
  }

  return (
    <div className={'pageContainer'}>
      <PageTitle
        colorType={'episodes'}
        title={'Episode Multiverse'}
        searchQuery={searchQuery}
        onSearch={searchHandler}
        placeholder={'Search across dimensions... (e.g., Pilot, Rick Potion)'}
      />

      {error && <ErrorMessage error={error} />}

      {isLoading && episodes.length === 0 && (
        <Loader colorType={'episodes'} text={'Scanning the multiverse for episodes...'} />
      )}

      {!error && !isLoading && episodes.length === 0 && searchQuery !== '' && (
        <div className={s.noResults}>
          <Icon name={'noResults'} width={48} height={48} />
          <h3>No episodes found in this dimension!</h3>
          <p>Try adjusting your search parameters or check another reality</p>
        </div>
      )}

      {episodes.length > 0 && (
        <>
          <EpisodesInfoBar totalEpisodesCount={info.count} />
          <EpisodeList episodes={episodes} />
        </>
      )}

      {isLoading && episodes.length > 0 && <Loader colorType={'episodes'} text={'Loading more episodes...'} />}

      {!isLoading && !!info.next && <div ref={observerRef} className={s.infiniteScrollAnchor} />}
    </div>
  )
}
