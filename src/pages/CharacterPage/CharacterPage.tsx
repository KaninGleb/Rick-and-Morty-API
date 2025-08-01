import { Link } from 'react-router'
import { useCharacterStore } from '@/stores'
import { useInfiniteScroll, usePageData } from '@/common/hooks'
import { ErrorMessage, Loader, PageTitle } from '@/common/components'
import { PATH } from '@/common/data/paths.ts'
import s from './CharacterPage.module.css'

export const CharacterPage = () => {
  const { items, info, isLoading, error, searchQuery, fetchNextPage } = useCharacterStore()

  const observerRef = useInfiniteScroll({
    hasMore: !!info.next && searchQuery.trim() === '',
    loadMore: fetchNextPage,
    isLoading,
  })

  const { searchHandler } = usePageData({
    store: useCharacterStore(),
    endpoint: '/character',
  })

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

      {items.length > 0 && (
        <div className={s.characters}>
          {items.map((character) => (
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

      {isLoading && items.length > 0 && <Loader colorType={'characters'} text={'Loading more characters...'} />}
      {isLoading && items.length === 0 && <Loader colorType={'characters'} />}
      {!isLoading && !!info.next && <div ref={observerRef} className={s.infiniteScrollAnchor} />}
    </div>
  )
}
