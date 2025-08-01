import { create } from 'zustand'
import type { AxiosError } from 'axios'
import { type Info, type ErrorType } from '@/pages/api'

type EntityStore<T> = {
  items: T[]
  info: Info
  searchQuery: string
  isLoading: boolean
  error: ErrorType
  scrollPosition: number

  setSearchQuery: (query: string) => void
  setScrollPosition: (position: number) => void
  fetchItems: (url?: string) => Promise<void>
  fetchNextPage: () => Promise<void>
}

type FetchFunction<T> = (url: string) => Promise<{ data: { results: T[]; info: Info } }>

export const createEntityStore = <T>(fetchFunction: FetchFunction<T>, endpoint: string) =>
  create<EntityStore<T>>((set, get) => ({
    items: [],
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    searchQuery: '',
    isLoading: false,
    error: null,
    scrollPosition: 0,

    setSearchQuery: (query) => {
      set({ searchQuery: query })
    },

    setScrollPosition: (position) => {
      set({ scrollPosition: position })
    },

    fetchItems: async (url = endpoint) => {
      set({ isLoading: true, error: null })
      try {
        const res = await fetchFunction(url)
        set({
          items: res.data.results,
          info: res.data.info,
          isLoading: false,
        })
      } catch (e) {
        const error = e as AxiosError
        set({
          error: error.message || 'Unknown error',
          isLoading: false,
          items: [],
          info: { count: 0, pages: 0, next: null, prev: null },
        })
      }
    },

    fetchNextPage: async () => {
      const { info, items } = get()
      if (!info.next) return

      set({ isLoading: true })
      try {
        const response = await fetchFunction(info.next)
        set({
          items: [...items, ...response.data.results],
          info: response.data.info,
          isLoading: false,
        })
      } catch (e) {
        const message = (e as Error)?.message || 'Unknown error'
        set({ error: message, isLoading: false })
      }
    },
  }))
