import { type ReactNode } from 'react'
import { type PageDataStore, usePageData, useInfiniteScroll } from '@/common/hooks'
import type { PagesColorType, PageType } from '@/common'
import { ErrorMessage, Icon, Loader, PageTitle } from '@/common/components'
import { ScrollToTopButton } from '@/common/components/ScrollToTopButton/ScrollToTopButton.tsx'
import s from './EntityListPage.module.css'

type EntityListPageProps<T> = {
  pageKey: PageType
  store: PageDataStore<T>
  endpoint: string
  colorType: PagesColorType
  title: string
  placeholder: string
  renderList: (items: T[]) => ReactNode
  noResultsMessage?: ReactNode
}

export const EntityListPage = <T,>({
  pageKey,
  store,
  endpoint,
  colorType,
  title,
  placeholder,
  renderList,
  noResultsMessage,
}: EntityListPageProps<T>) => {
  const { items, info, isLoading, error, searchQuery, fetchNextPage } = store

  const { searchHandler } = usePageData({ store, endpoint, pageKey })

  const observerRef = useInfiniteScroll({
    hasMore: !!info.next && searchQuery.trim() === '',
    loadMore: fetchNextPage,
    isLoading,
  })

  return (
    <div className={'pageContainer'}>
      <PageTitle
        colorType={colorType}
        title={title}
        searchQuery={searchQuery}
        onSearch={searchHandler}
        placeholder={placeholder}
      />

      {!isLoading && error && <ErrorMessage error={error === 'Request failed with status code 404' ? '' : error} />}

      {!isLoading && items.length === 0 && searchQuery !== '' &&
        (noResultsMessage ?? (
          <div className={s.noResults}>
            <Icon name="noResults" width={48} height={48} />
            <h3>{`No ${colorType} found in this dimension!`}</h3>
            <p>Try adjusting your search parameters or check another reality</p>
          </div>
        ))}

      {!isLoading && items.length === 0 && searchQuery !== '' && noResultsMessage}

      {items.length > 0 && renderList(items)}

      {isLoading && items.length === 0 && (
        <Loader colorType={colorType} text={`Scanning the multiverse for ${colorType}s...`} />
      )}

      {isLoading && items.length > 0 && (
        <Loader colorType={colorType} text={`Downloading additional ${colorType}s...`} />
      )}

      {!isLoading && !!info.next && <div ref={observerRef} className={'infiniteScrollAnchor'} />}

      <ScrollToTopButton />
    </div>
  )
}
