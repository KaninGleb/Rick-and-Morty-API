import { useEffect, type ChangeEvent } from 'react'
import type { Info, ErrorType } from '@/pages/api'
import type { PageType } from '@/common'

export type PageDataStore<T> = {
  items: T[]
  info: Info
  searchQuery: string
  isLoading: boolean
  error: ErrorType
  scrollPosition: Record<string, number>

  fetchItems: (url: string) => void
  fetchNextPage: () => void
  setSearchQuery: (query: string) => void
  setScrollPosition: (pageKey: string, position: number) => void
}

type UsePageDataProps<T> = {
  store: PageDataStore<T>
  endpoint: string
  pageKey: PageType
}

export const usePageData = <T>({ store, endpoint, pageKey }: UsePageDataProps<T>) => {
  const { items, searchQuery, fetchItems, setSearchQuery, setScrollPosition, scrollPosition } = store

  useEffect(() => {
    if (items.length === 0 && searchQuery === '') {
      fetchItems(endpoint)
    }
  }, [fetchItems, items.length, searchQuery, endpoint])

  useEffect(() => {
    const position = scrollPosition[pageKey]

    if (position > 0) {
      setTimeout(() => {
        window.scrollTo({ top: position, behavior: 'auto' })
      }, 0)
    }
  }, [scrollPosition, pageKey])

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchQuery(value)
    setScrollPosition(pageKey, 0)
    window.scrollTo(0, 0)
    fetchItems(`${endpoint}?name=${value}`)
  }

  useEffect(() => {
    return () => {
      setScrollPosition(pageKey, window.scrollY)
    }
  }, [setScrollPosition, pageKey])

  return { searchHandler }
}
