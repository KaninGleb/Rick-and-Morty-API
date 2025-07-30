import type { CharactersResults, Info } from '@/pages/api'

type CharacterZustandState = {
  characters: CharactersResults[]
  info: Info
  searchQuery: string
  isLoading: boolean
  error: string | null
  scrollPosition: number
}

type CharacterActions = {
  fetchCharacters: (url?: string) => Promise<void>
  fetchNextPage: () => Promise<void>
  setSearchQuery: (query: string) => void
  setScrollPosition: (position: number) => void
}

export type CharacterZustandStore = CharacterZustandState & CharacterActions
