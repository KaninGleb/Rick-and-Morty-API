import { create } from 'zustand'
import { api, type CharactersResults, type Info } from '@/pages/api'

type CharacterZustandState = {
  characters: CharactersResults[]
  info: Info
  searchQuery: string
  isLoading: boolean
  error: string | null
  scrollPosition: number

  fetchCharacters: (url?: string) => Promise<void>
  fetchNextPage: () => Promise<void>
  setSearchQuery: (query: string) => void
  setScrollPosition: (position: number) => void
}

const initialInfo: Info = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
}

export const useCharacterStore = create<CharacterZustandState>((set, get) => ({
  // --- InitialState ---
  characters: [],
  info: initialInfo,
  searchQuery: '',
  isLoading: false,
  error: null,
  scrollPosition: 0,

  // --- Actions ---
  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  setScrollPosition: (position) => {
    set({ scrollPosition: position })
  },

  fetchCharacters: async (url = '/character') => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.getCharacters(url)
      set({
        characters: response.data.results,
        info: response.data.info,
        isLoading: false,
      })
    } catch (e: any) {
      set({ error: e.message, isLoading: false, characters: [], info: initialInfo })
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
    } catch (e: any) {
      set({ error: e.message, isLoading: false })
    }
  },
}))
