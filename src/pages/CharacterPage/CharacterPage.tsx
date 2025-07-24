import { type ChangeEvent, useState } from 'react'
import { Link } from 'react-router'
import { usePaginatedData } from '@/common/hooks'
import { api, type CharactersResults } from '@/pages/api'
import { PageTitle, ErrorMessage, Loader, Pagination } from '@/common/components'
import s from './CharacterPage.module.css'

export const CharacterPage = () => {
  const {
    data: characters,
    info,
    currentPage,
    error,
    isLoading,
    nextPageHandler,
    previousPageHandler,
    fetchData,
  } = usePaginatedData<CharactersResults>(api.getCharacters, '/character')

  const [searchQuery, setSearchQuery] = useState<string>('')

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

      {isLoading && <Loader colorType={'characters'} text={'Scanning the multiverse for characters...'} />}

      {!error && characters.length > 0 && (
        <>
          <div className={s.characters}>
            {characters.map((character) => (
              <Link className={s.characterLink} key={character.id} to={`/characters/${character.id}`}>
                <div className={s.card}>
                  <img className={s.avatar} src={character.image} alt={`${character.name} avatar`} />

                  <div className={s.info}>
                    <h3 className={s.name}>{character.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            colorType={'characters'}
            currentPage={currentPage}
            pageInfo={info}
            onPrev={previousPageHandler}
            onNext={nextPageHandler}
          />
        </>
      )}
    </div>
  )
}
