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
        colorType={'locations'}
        title={'Character Multiverse'}
        searchQuery={searchQuery}
        onSearch={searchHandler}
        placeholder={'Search across characters... (e.g., Earth, Post-Apocalyptic Earth)'}
      />

      {!isLoading && error && <ErrorMessage error={error} />}

      {isLoading && <Loader colorType={'locations'} text={'Scanning the multiverse for characters...'} />}

      {!error && characters.length > 0 && (
        <>
          {
            <div className={s.characters}>
              {characters.map((character) => (
                <div key={character.id} className={s.character}>
                  <Link to={`/characters/${character.id}`} className={s.characterLink}>
                    {character.name}
                  </Link>
                  <img src={character.image} alt={`${character.name} avatar`} />
                </div>
              ))}
            </div>
          }

          <Pagination
            colorType={'locations'}
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
