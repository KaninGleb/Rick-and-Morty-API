import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { api, type EpisodeResults } from '@/pages/api'
import { usePaginatedData } from '@/common/hooks'
import { PageTitle, ErrorMessage, Loader, Icon, Pagination } from '@/common/components'
import { EpisodeList } from '@/pages'
import { EpisodesInfoBar } from '@/pages/EpisodePage/EpisodesInfoBar/EpisodesInfoBar.tsx'
import s from './EpisodePage.module.css'

export const EpisodePage = () => {
  const {
    data: episodes,
    info,
    currentPage,
    error,
    isLoading,
    nextPageHandler,
    previousPageHandler,
    fetchData,
  } = usePaginatedData<EpisodeResults>(api.getEpisodes, '/episode')

  const [searchQuery, setSearchQuery] = useState('')

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchQuery(value)
    fetchData(`/episode?name=${value}`)
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

      {isLoading && <Loader text={'Scanning the multiverse for episodes...'} />}

      {!error && !isLoading && episodes.length === 0 && (
        <div className={s.noResults}>
          <Icon name={'noResults'} width={48} height={48} />
          <h3>No episodes found in this dimension!</h3>
          <p>Try adjusting your search parameters or check another reality</p>
        </div>
      )}

      {!error && !isLoading && episodes.length > 0 && (
        <>
          <EpisodesInfoBar totalEpisodesCount={info.count} />

          <EpisodeList episodes={episodes} />

          <Pagination currentPage={currentPage} pageInfo={info} onPrev={previousPageHandler} onNext={nextPageHandler} />
        </>
      )}
    </div>
  )
}
