import { Link, useParams } from 'react-router'
import {Loader, Icon, ErrorMessage} from '@/common/components'
import { PATH } from '@/common/data/paths.ts'
import { useFetchById } from '@/common/hooks/useFetchById.ts'
import { getStatusClassName } from './CharacterHelpers.ts'
import type { CharactersResults, EpisodeResults } from '@/pages/api'
import { useLazyFetchMultiple } from '@/common/hooks'
import { useEffect, useRef } from 'react'
import s from './Character.module.css'

export const Character = () => {
  const { id } = useParams()
  const { data: character, error, isLoading } = useFetchById<CharactersResults>('/character', id)
  const {
    data: episodes,
    error: episodesError,
    isLoading: loadingEpisodes,
    hasMore,
    loadMore,
  } = useLazyFetchMultiple<EpisodeResults>(character?.episode || [], 20)

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasMore || loadingEpisodes) return

    const episodeList = document.querySelector(`.${s.episodeList}`)

    if (!episodeList) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      {
        threshold: 0.1,
        root: episodeList,
      },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasMore, loadingEpisodes, loadMore])

  const infoFields = character
    ? [
        { title: 'Last known location', value: character.location.name ?? 'Unknown' },
        {
          title: 'Origin',
          value: character.origin.name
            ? character.origin.name.charAt(0).toUpperCase() + character.origin.name.slice(1)
            : 'Unknown',
        },
        { title: 'Gender', value: character.gender ?? 'Unknown' },
        { title: 'Episodes', value: character.episode.length ?? 0 },
      ]
    : []

  return (
    <div className={s.pageContainer}>
      {(error || episodesError) && <ErrorMessage error={error || episodesError}/>}

      {isLoading && <Loader colorType={'characters'} text={'Loading character details...'} />}

      {character && (
        <div className={s.container}>
          <h1 className={s.pageTitle}>{character.name}</h1>
          <div className={s.content}>
            <div className={s.characterInfo}>
              <img className={s.image} src={character.image} alt={`${character.name} portrait`} />
              <div className={s.description}>
                <div className={s.statusContainer}>
                  <span className={getStatusClassName(character.status)}></span>
                  <span className={s.statusText}>
                    {character.status} • {character.species}
                    {character.type && ` (${character.type})`}
                  </span>
                </div>

                {infoFields.map((field, i) => (
                  <div key={i} className={s.info}>
                    <span className={s.label}>{field.title}:</span>
                    <span className={s.value}>{field.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {character.episode.length > 0 ? (
              <div className={s.episodeList}>
                {episodes.map((episode) => (
                  <Link key={episode.id} to={`${PATH.Episodes}/${episode.id}`} className={s.episodeLink}>
                    {episode.episode} — {episode.name}
                  </Link>
                ))}

                {loadingEpisodes && <Loader colorType="characters" text="Loading episodes..." />}

                {hasMore && <div ref={observerRef} className={s.infiniteScrollAnchor} />}
              </div>
            ) : (
              <span className={s.noEpisodes}>No episodes available</span>
            )}
          </div>
          <Link to={PATH.Characters} className={s.backButton}>
            <Icon name="previous" /> Back to Characters
          </Link>
        </div>
      )}
    </div>
  )
}
