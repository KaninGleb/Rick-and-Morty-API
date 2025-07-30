import { create } from 'zustand'
import { api } from '@/pages/api'
import type { CharacterZustandStore } from '@/stores/useCharacterStore/useCharacterStore.types.ts'
import type { AxiosError } from 'axios'

export const useCharacterStore = create<CharacterZustandStore>((set, get) => ({
  characters: [],
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

  fetchCharacters: async (url = '/character') => {
    set({ isLoading: true, error: null })
    try {
      const res = await api.getCharacters(url)
      set({
        characters: res.data.results,
        info: res.data.info,
        isLoading: false,
      })
    } catch (e) {
      const error = e as AxiosError
      set({
        error: error.message || 'Unknown error',
        isLoading: false,
        characters: [],
        info: { count: 0, pages: 0, next: null, prev: null },
      })
    }
  },

  fetchNextPage: async () => {
    const { info, characters } = get()
    if (!info.next) return

    set({ isLoading: true })
    try {
      const response = await api.getCharacters(info.next)
      set({
        characters: [...characters, ...response.data.results],
        info: response.data.info,
        isLoading: false,
      })
    } catch (e) {
      const message = (e as Error)?.message || 'Unknown error'
      set({ error: message, isLoading: false })
    }
  },
}))
