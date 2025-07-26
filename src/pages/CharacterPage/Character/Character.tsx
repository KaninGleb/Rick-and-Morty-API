import { Link, useParams } from 'react-router'
import { Loader, Icon } from '@/common/components'
import { PATH } from '@/common/data/paths.ts'
import { useFetchById } from '@/common/hooks/useFetchById.ts'
import { getStatusClassName } from './CharacterHelpers.ts'
import type { CharactersResults } from '@/pages/api'
import { getEpisodeId } from '@/common'
import s from './Character.module.css'

export const Character = () => {
  const { id } = useParams()
  const { data: character, error, isLoading } = useFetchById<CharactersResults>('/character', id)

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
      {error && <div className={s.errorMessage}>{error}</div>}

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
                {character.episode.map((episodeUrl) => {
                  const id = getEpisodeId(episodeUrl)
                  return (
                    <Link key={id} to={`${PATH.Episodes}/${id}`} className={s.episodeLink}>
                      Episode {id}
                    </Link>
                  )
                })}
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
