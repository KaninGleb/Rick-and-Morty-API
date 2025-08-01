import { type ReactNode } from 'react'
import { useInfiniteScroll, usePageData, type PageDataStore } from '@/common/hooks'
import { ErrorMessage, Loader, PageTitle } from '@/common/components'
import type { PagesColorType } from '@/common'

type EntityListPageProps<T> = {
  store: PageDataStore<T>
  endpoint: string
  colorType: PagesColorType
  title: string
  placeholder: string
  renderList: (items: T[]) => ReactNode
  noResultsMessage?: ReactNode
}

export const EntityListPage = <T,>({
  store,
  endpoint,
  colorType,
  title,
  placeholder,
  renderList,
  noResultsMessage,
}: EntityListPageProps<T>) => {
  const { items, info, isLoading, error, searchQuery, fetchNextPage } = store

  const { searchHandler } = usePageData({ store, endpoint })

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

      {!isLoading && error && <ErrorMessage error={error} />}

      {items.length > 0 && renderList(items)}

      {isLoading && items.length === 0 && (
        <Loader colorType={colorType} text={`Scanning the multiverse for ${colorType}s...`} />
      )}
      {isLoading && items.length > 0 && (
        <Loader colorType={colorType} text={`Downloading additional ${colorType}s...`} />
      )}

      {!isLoading && items.length === 0 && searchQuery !== '' && noResultsMessage}

      {!isLoading && !!info.next && <div ref={observerRef} className={'infiniteScrollAnchor'} />}
    </div>
  )
}
