import { create } from 'zustand'
import type { LocationZustandStore } from './useLocationStore.types.ts'
import { api } from '@/pages/api'
import type { AxiosError } from 'axios'

export const useLocationStore = create<LocationZustandStore>((set, get) => ({
  locations: [],
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

  fetchLocations: async (url = '/location') => {
    set({ isLoading: true, error: null })
    try {
      const res = await api.getLocations(url)
      set({
        locations: res.data.results,
        info: res.data.info,
        isLoading: false,
      })
    } catch (e) {
      const error = e as AxiosError
      set({
        error: error.message || 'Unknown error',
        isLoading: false,
        locations: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      })
    }
  },

  fetchNextPage: async () => {
    const { info, locations } = get()
    if (!info.next) return

    set({ isLoading: true })
    try {
      const response = await api.getLocations(info.next)
      set({
        locations: [...locations, ...response.data.results],
        info: response.data.info,
        isLoading: false,
      })
    } catch (e) {
      const message = (e as Error)?.message || 'Unknown error'
      set({ error: message, isLoading: false })
    }
  },
}))
