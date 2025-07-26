import { Link, useParams } from 'react-router'
import { useFetchById, useInfiniteScroll, useLazyFetchMultiple } from '@/common/hooks'
import type { CharactersResults, EpisodeResults } from '@/pages/api'
import { ErrorMessage, Icon, Loader } from '@/common/components'
import { PATH } from '@/common/data/paths.ts'
import s from './Episode.module.css'

export const Episode = () => {
  const { id } = useParams()
  const { data: episode, error, isLoading } = useFetchById<EpisodeResults>('/episode', id)
  const {
    data: residents,
    error: residentsError,
    isLoading: loadingResidents,
    hasMore,
    loadMore,
  } = useLazyFetchMultiple<CharactersResults>(episode?.characters || [], 10)

  const observerRef = useInfiniteScroll({
    hasMore,
    loadMore,
    isLoading: loadingResidents,
    containerSelector: `.${s.charactersList}`,
  })

  const infoFields = episode
    ? [
        { title: 'Episode', value: episode.episode || 'Unknown' },
        { title: 'Air Date', value: episode.air_date || 'Unknown' },
        { title: 'Created', value: new Date(episode.created).toLocaleDateString() },
        { title: 'Characters', value: episode.characters.length },
      ]
    : []

  return (
    <div className={s.pageContainer}>
      {(error || residentsError) && <ErrorMessage error={error || residentsError} />}

      {isLoading && <Loader colorType={'episodes'} text={'Loading location episodes...'} />}

      {episode && (
        <div className={s.container}>
          <h1 className={s.pageTitle}>{episode.name}</h1>
          <div className={s.content}>
            <div className={s.description}>
              {infoFields.map((field, i) => (
                <div key={i} className={s.info}>
                  <span className={s.label}>{field.title}:</span>
                  <span className={s.value}>{field.value}</span>
                </div>
              ))}
            </div>

            {residents.length > 0 ? (
              <div className={s.charactersList}>
                <>
                  {residents.map((char) => (
                    <Link key={char.id} to={`${PATH.Characters}/${char.id}`} className={s.characterLink}>
                      <img src={char.image} alt={char.name} className={s.characterImage} />
                      <span className={s.characterName}>{char.name}</span>
                    </Link>
                  ))}

                  {loadingResidents && <Loader colorType="episodes" text="Loading characters..." />}

                  {hasMore && <div ref={observerRef} className={s.infiniteScrollAnchor} />}
                </>
              </div>
            ) : (
              <span className={s.noResidents}>There are no residents</span>
            )}
          </div>

          <Link to={PATH.Episodes} className={s.backButton}>
            <Icon name={'previous'} /> Back to Episodes
          </Link>
        </div>
      )}
    </div>
  )
}
