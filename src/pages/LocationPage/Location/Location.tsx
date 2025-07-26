import { Link, useParams } from 'react-router'
import {ErrorMessage, Icon, Loader} from '@/common/components'
import { PATH } from '@/common/data/paths.ts'
import { useFetchById } from '@/common/hooks/useFetchById.ts'
import { useLazyFetchMultiple } from '@/common/hooks/useLazyFetchMultiple.ts'
import type { LocationResults, CharactersResults } from '@/pages/api'
import { useEffect, useRef } from 'react'
import s from './Location.module.css'

export const Location = () => {
  const { id } = useParams()
  const { data: location, error, isLoading } = useFetchById<LocationResults>('/location', id)
  const {
    data: residents,
    error: residentsError,
    isLoading: loadingResidents,
    hasMore,
    loadMore,
  } = useLazyFetchMultiple<CharactersResults>(location?.residents || [], 10)

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasMore || loadingResidents) return

    const listContainer = document.querySelector(`.${s.charactersList}`)

    if (!listContainer) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      {
        threshold: 0.1,
        root: listContainer,
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
  }, [hasMore, loadingResidents, loadMore])

  const infoFields = location
    ? [
        { title: 'Type', value: location.type || 'Unknown' },
        {
          title: 'Dimension',
          value: location.dimension
            ? location.dimension.charAt(0).toUpperCase() + location.dimension.slice(1)
            : 'Unknown',
        },
        { title: 'Residents count', value: location.residents.length },
        { title: 'Created', value: new Date(location.created).toLocaleDateString() },
      ]
    : []

  return (
    <div className={s.pageContainer}>
      {(error || residentsError) && <ErrorMessage error={error || residentsError} />}

      {isLoading && <Loader colorType={'locations'} text={'Loading location details...'} />}

      {location && (
        <div className={s.container}>
          <h1 className={s.pageTitle}>{location.name}</h1>
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

                  {loadingResidents && <Loader colorType="locations" text="Loading residents..." />}

                  {hasMore && <div ref={observerRef} className={s.infiniteScrollAnchor} />}
                </>
              </div>
            ) : (
              <span className={s.noResidents}>There are no residents</span>
            )}
          </div>

          <Link to={PATH.Locations} className={s.backButton}>
            <Icon name={'previous'} /> Back to Locations
          </Link>
        </div>
      )}
    </div>
  )
}
