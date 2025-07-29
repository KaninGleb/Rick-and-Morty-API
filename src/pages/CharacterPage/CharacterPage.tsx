import { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router'
import { usePaginatedData, useInfiniteScroll } from '@/common/hooks'
import { api, type CharactersResults } from '@/pages/api'
import { ErrorMessage, Loader, PageTitle } from '@/common/components'
import { PATH } from '@/common/data/paths.ts'
import s from './CharacterPage.module.css'

export const CharacterPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const {
    data: characters,
    info,
    error,
    isLoading,
    fetchData,
    nextPageHandler,
  } = usePaginatedData<CharactersResults>(api.getCharacters, '/character')

  const observerRef = useInfiniteScroll({
    hasMore: !!info.next && searchQuery.trim() === '',
    loadMore: nextPageHandler,
    isLoading,
  })

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchQuery(value)
    fetchData(`/character?name=${value}`)
  }

  return (
    <div className={'pageContainer'}>
      <PageTitle
        colorType={'characters'}
        title={'Character Multiverse'}
        searchQuery={searchQuery}
        onSearch={searchHandler}
        placeholder={'Search across characters... (e.g., Rick Sanchez, Morty Smith)'}
      />

      {!isLoading && error && <ErrorMessage error={error} />}

      {characters.length > 0 && (
        <div className={s.characters}>
          {characters.map((character) => (
            <Link className={s.characterLink} key={character.id} to={`${PATH.Characters}/${character.id}`}>
              <div className={s.card}>
                <img className={s.avatar} src={character.image} alt={`${character.name} avatar`} />
                <div className={s.info}>
                  <h3 className={s.name}>{character.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isLoading && <Loader colorType={'characters'} text={'Loading more characters...'} />}

      {!isLoading && !!info.next && <div ref={observerRef} className={s.infiniteScrollAnchor} />}
    </div>
  )
}
