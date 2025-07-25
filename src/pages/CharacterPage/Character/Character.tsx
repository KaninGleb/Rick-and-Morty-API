import { useParams, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { instance } from '@/common'
import { Loader } from '@/common/components'
import { getStatusClassName, getEpisodeId } from './CharacterHelpers.ts'
import type { CharactersResults, ErrorType } from '@/pages/api'
import { PATH } from '@/common/data/paths.ts'
import s from './Character.module.css'

export const Character = () => {
  const { id } = useParams()

  const [character, setCharacter] = useState<CharactersResults | null>(null)
  const [error, setError] = useState<ErrorType>(null)

  const infoFields = character
    ? [
        { title: 'Last known location', value: character.location.name ?? 'Unknown' },
        { title: 'Origin', value: character.origin.name ?? 'Unknown' },
        { title: 'Gender', value: character.gender ?? 'Unknown' },
        { title: 'Episodes', value: character.episode.length ?? 0 },
      ]
    : []

  useEffect(() => {
    const controller = new AbortController()

    instance
      .get(`/character/${id}`, { signal: controller.signal })
      .then((res) => {
        setCharacter(res.data)
        setError(null)
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError('Failed to fetch character details.')
        }
      })

    return () => {
      controller.abort()
    }
  }, [id])

  return (
    <div className={s.pageContainer}>
      {error && <div className={s.errorMessage}>{error}</div>}

      {!character && !error && <Loader colorType={'characters'} text={'Loading character details...'} />}

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
                    {character.status} - {character.species}
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

            <div className={s.episodeList}>
              {character.episode.map((episodeUrl) => {
                const id = getEpisodeId(episodeUrl)
                return (
                  <Link key={id} to={`${PATH.Episodes}/${id}`} className={s.episodeLink}>
                    Episode {id}
                  </Link>
                )
              })}
            </div>
          </div>
          <Link to={PATH.Characters} className={s.backButton}>
            Back to Characters
          </Link>
        </div>
      )}
    </div>
  )
}
