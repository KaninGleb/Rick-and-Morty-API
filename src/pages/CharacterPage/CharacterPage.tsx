import { type ChangeEvent, useEffect } from 'react'
import { Link } from 'react-router'
import { useCharacterStore } from '@/stores/useCharacterStore/useCharacterStore.tsx'
import { useInfiniteScroll } from '@/common/hooks'
import { ErrorMessage, Loader, PageTitle } from '@/common/components'
import { PATH } from '@/common/data/paths.ts'
import s from './CharacterPage.module.css'

export const CharacterPage = () => {
  const {
    characters,
    info,
    isLoading,
    error,
    searchQuery,
    scrollPosition,
    fetchCharacters,
    fetchNextPage,
    setSearchQuery,
    setScrollPosition,
  } = useCharacterStore()

  const observerRef = useInfiniteScroll({
    hasMore: !!info.next && searchQuery.trim() === '',
    loadMore: fetchNextPage,
    isLoading,
  })

  useEffect(() => {
    if (characters.length === 0 && searchQuery === '') {
      fetchCharacters('/character')
    }
  }, [])

  useEffect(() => {
    if (scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: 'auto' })
      }, 0)
    }

    let throttleTimeout: NodeJS.Timeout | null = null
    const handleScroll = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setScrollPosition(window.scrollY)
          throttleTimeout = null
        }, 200)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (throttleTimeout) {
        clearTimeout(throttleTimeout)
      }
    }
  }, [scrollPosition, setScrollPosition])

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchQuery(value)
    setScrollPosition(0)
    window.scrollTo(0, 0)
    fetchCharacters(`/character?name=${value}`)
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
      {isLoading && characters.length > 0 && <Loader colorType={'characters'} text={'Loading more characters...'} />}
      {isLoading && characters.length === 0 && <Loader colorType={'characters'} />}
      {!isLoading && !!info.next && <div ref={observerRef} className={s.infiniteScrollAnchor} />}
    </div>
  )
}
