import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { api, type EpisodeResults } from '@/pages/api'
import { usePaginatedData } from '@/common/hooks'
import { Icon } from '@/common/components'
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className={s.pageContainer}>
      <div className={s.header}>
        <h1 className={s.title}>
          <span className={s.titleMain}>Rick and Morty</span>
          <span className={s.titleSub}>Episode Multiverse</span>
        </h1>

        <div className={s.searchContainer}>
          <input
            type="search"
            className={s.searchInput}
            onChange={searchHandler}
            placeholder="Search across dimensions... (e.g., Pilot, Rick Potion)"
            value={searchQuery}
          />
          <div className={s.searchIcon}>
            <Icon name={'search'} width={20} height={20} />
          </div>
        </div>
      </div>

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

          <div className={s.episodesList}>
            {episodes.map((e) => (
              <div key={e.id} className={s.episodeCard}>
                <div className={s.episodeHeader}>
                  <span className={s.episodeCode}>{e.episode}</span>
                  <span className={s.episodeAirDate}>{e.air_date || 'Unknown date'}</span>
                </div>
                <h2 className={s.episodeName}>{e.name}</h2>

                <div className={s.episodeMeta}>
                  <div className={s.metaItem}>
                    <span className={s.metaLabel}>Characters:</span>
                    <span className={s.metaValue}>{e.characters.length || 0}</span>
                  </div>
                  <div className={s.metaItem}>
                    <span className={s.metaLabel}>Created:</span>
                    <span className={s.metaValue}>{formatDate(e.created)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
