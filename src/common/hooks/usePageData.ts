import { useEffect, type ChangeEvent } from 'react'
import type { Info } from '@/pages/api'

export type PageDataStore<T> = {
  items: T[]
  info: Info
  searchQuery: string
  isLoading: boolean
  error: string | null
  scrollPosition: number

  fetchItems: (url: string) => void
  fetchNextPage: () => void
  setSearchQuery: (query: string) => void
  setScrollPosition: (position: number) => void
}

type UsePageDataProps<T> = {
  store: PageDataStore<T>
  endpoint: string
}

export const usePageData = <T>({ store, endpoint }: UsePageDataProps<T>) => {
  const { items, searchQuery, fetchItems, setSearchQuery, setScrollPosition, scrollPosition } = store

  useEffect(() => {
    if (items.length === 0 && searchQuery === '') {
      fetchItems(endpoint)
    }
  }, [fetchItems, items.length, searchQuery, endpoint])

  useEffect(() => {
    if (scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: 'auto' })
      }, 0)
    }
  }, [scrollPosition])

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchQuery(value)
    setScrollPosition(0)
    window.scrollTo(0, 0)
    fetchItems(`${endpoint}?name=${value}`)
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      store.setScrollPosition(window.scrollY)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [store])

  return { searchHandler }
}
