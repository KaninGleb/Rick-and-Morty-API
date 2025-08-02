import { type ReactNode } from 'react'
import { type PageDataStore, usePageData, useInfiniteScroll } from '@/common/hooks'
import { ErrorMessage, Icon, Loader, PageTitle } from '@/common/components'
import { ScrollToTopButton } from '@/common/components/ScrollToTopButton/ScrollToTopButton.tsx'
import type { PageType } from '@/common'
import s from './EntityListPage.module.css'

export type EntityPageConfig = {
  endpoint: string
  title: string
  placeholder: string
  noResultsMessage?: ReactNode
}

type EntityListPageProps<T> = {
  config: EntityPageConfig
  store: PageDataStore<T>
  renderList: (items: T[]) => ReactNode
}

export const EntityListPage = <T,>({ config, store, renderList }: EntityListPageProps<T>) => {
  const { endpoint, title, placeholder, noResultsMessage } = config

  const { items, info, isLoading, error, searchQuery, fetchNextPage } = store
  const { searchHandler } = usePageData({ store, endpoint })

  const observerRef = useInfiniteScroll({
    hasMore: !!info.next && searchQuery.trim() === '',
    loadMore: fetchNextPage,
    isLoading,
  })

  const pageKey = config.endpoint.replace(/^\/+|\/+$/g, '') as PageType

  return (
    <div className={'pageContainer'}>
      <PageTitle
        colorType={pageKey}
        title={title}
        searchQuery={searchQuery}
        onSearch={searchHandler}
        placeholder={placeholder}
      />

      {!isLoading && error && <ErrorMessage error={error === 'Request failed with status code 404' ? '' : error} />}

      {!isLoading &&
        items.length === 0 &&
        searchQuery !== '' &&
        (noResultsMessage ?? (
          <div className={s.noResults}>
            <Icon name="noResults" width={48} height={48} />
            <h3>{`No ${pageKey} found in this dimension!`}</h3>
            <p>Try adjusting your search parameters or check another reality</p>
          </div>
        ))}

      {!isLoading && items.length === 0 && searchQuery !== '' && noResultsMessage}

      {items.length > 0 && renderList(items)}

      {isLoading && items.length === 0 && (
        <Loader colorType={pageKey} text={`Scanning the multiverse for ${pageKey}s...`} />
      )}

      {isLoading && items.length > 0 && <Loader colorType={pageKey} text={`Downloading additional ${pageKey}s...`} />}

      {!isLoading && !!info.next && <div ref={observerRef} className={'infiniteScrollAnchor'} />}

      <ScrollToTopButton />
    </div>
  )
}
