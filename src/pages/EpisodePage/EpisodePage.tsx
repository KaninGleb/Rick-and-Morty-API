import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { api, type EpisodeResults } from '@/pages/api'
import { usePaginatedData } from '@/common/hooks'
import { PageTitle, Icon } from '@/common/components'
import { EpisodeList } from '@/pages'
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
    <div className={s.pageContainer}>
      <PageTitle
        title={'Episode Multiverse'}
        searchQuery={searchQuery}
        onSearch={searchHandler}
        placeholder={'Search across dimensions... (e.g., Pilot, Rick Potion)'}
      />

      {error && (
        <div className={s.errorMessage}>
          <Icon name={'error'} width={24} height={24} />
          {error}
        </div>
      )}

      {isLoading && (
        <div className={s.loader}>
          <div className={s.loaderAnimation}></div>
          <span>Scanning the multiverse for episodes...</span>
        </div>
      )}

      {!error && !isLoading && episodes.length === 0 && (
        <div className={s.noResults}>
          <Icon name={'noResults'} width={48} height={48} />
          <h3>No episodes found in this dimension!</h3>
          <p>Try adjusting your search parameters or check another reality</p>
        </div>
      )}

      {!error && !isLoading && episodes.length > 0 && (
        <>
          <div className={s.infoBar}>
            <div className={s.infoItem}>
              <span className={s.infoLabel}>Current Dimension:</span>
              <span className={s.infoValue}>C-{Math.floor(Math.random() * 1000)}</span>
            </div>
            <div className={s.infoItem}>
              <span className={s.infoLabel}>Total Episodes:</span>
              <span className={s.infoValue}>{info.count || 'Unknown'}</span>
            </div>
          </div>

          <EpisodeList episodes={episodes} />

          <div className={s.pagination}>
            <button
              className={`${s.navButton} ${s.previous} ${!info.prev && s.disabled}`}
              disabled={!info.prev}
              onClick={previousPageHandler}
            >
              <Icon name={'previous'} width={16} height={16} />
              Previous
            </button>
            <div className={s.pageIndicator}>
              Page {currentPage} of {info.pages}
            </div>
            <button
              className={`${s.navButton} ${s.next} ${!info.next && s.disabled}`}
              disabled={!info.next}
              onClick={nextPageHandler}
            >
              Next
              <Icon name={'next'} width={16} height={16} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
