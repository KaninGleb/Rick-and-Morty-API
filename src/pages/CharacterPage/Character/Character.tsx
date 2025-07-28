import { Link } from 'react-router'
import { ErrorMessage, Icon, Loader } from '@/common/components'
import { getStatusClassName, groupEpisodesBySeason } from './CharacterHelpers.ts'
import { useDetailPageData } from '@/common/hooks'
import type { CharactersResults, EpisodeResults } from '@/pages/api'
import { PATH } from '@/common/data/paths.ts'
import s from './Character.module.css'

export const Character = () => {
  const {
    data: character,
    relatedData: episodes,
    error,
    isLoading,
    isLoadingRelated: isLoadingEpisodes,
    hasMore,
    observerRef,
  } = useDetailPageData<CharactersResults, EpisodeResults>('character', `.${s.episodeList}`)

  const groupedEpisodes = groupEpisodesBySeason(episodes)

  const infoFields = character
    ? [
        { title: 'Last known location', value: character.location.name || 'Unknown' },
        { title: 'Origin', value: character.origin.name || 'Unknown' },
        { title: 'Gender', value: character.gender || 'Unknown' },
        { title: 'Episodes', value: character.episode.length || 0 },
      ]
    : []

  return (
    <div className={s.pageContainer}>
      {error && <ErrorMessage error={error} />}

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
                {Object.entries(groupedEpisodes).map(([season, episodes]) => (
                  <div key={season} className={s.seasonGroup}>
                    <h2 className={s.seasonTitle}>{season}</h2>
                    <div className={s.episodeGrid}>
                      {episodes.map((episode) => (
                        <Link key={episode.id} to={`${PATH.Episodes}/${episode.id}`} className={s.episodeLink}>
                          <span className={s.episodeCode}>{episode.episode}</span>-
                          <span className={s.episodeName}>{episode.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {isLoadingEpisodes && <Loader colorType={'characters'} text={'Loading episodes...'} />}

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
