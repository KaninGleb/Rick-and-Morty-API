import { useParams, Link } from 'react-router'
import { useEffect, useState } from 'react'
import { instance } from '@/common'
import { Loader } from '@/common/components'
import { PATH } from '@/common/data/paths.ts'
import type { ErrorType, LocationResults } from '@/pages/api'
import s from './Location.module.css'

export const Location = () => {
  const { id } = useParams()
  const [location, setLocation] = useState<LocationResults | null>(null)
  const [error, setError] = useState<ErrorType>(null)

  useEffect(() => {
    const controller = new AbortController()

    instance
      .get(`location/${id}`, { signal: controller.signal })
      .then((res) => {
        setLocation(res.data)
        setError(null)
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError('Failed to fetch location details.')
        }
      })

    return () => {
      controller.abort()
    }
  }, [id])

  const infoFields = location
    ? [
      { title: 'Type', value: location.type || 'Unknown' },
      { title: 'Dimension', value: location.dimension || 'Unknown' },
      { title: 'Residents count', value: location.residents.length },
      { title: 'Created', value: new Date(location.created).toLocaleDateString() },
    ]
    : []

  return (
    <div className={s.pageContainer}>
      {error && <div className={s.errorMessage}>{error}</div>}

      {!location && !error && <Loader colorType={'locations'} text={'Loading location details...'} />}

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

            <div className={s.charactersList}>
              {location.residents.map((url) => {
                const id = url.split('/').pop()
                return (
                  <Link key={id} to={`${PATH.Characters}/${id}`} className={s.episodeLink}>
                    Character {id}
                  </Link>
                )
              })}
            </div>
          </div>
          <Link to={PATH.Locations} className={s.backButton}>
            Back to Locations
          </Link>
        </div>
      )}
    </div>
  )
}
