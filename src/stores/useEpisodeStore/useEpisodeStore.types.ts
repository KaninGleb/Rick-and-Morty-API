import type { EpisodeResults, Info } from '@/pages/api'

type EpisodeZustandState = {
  episodes: EpisodeResults[]
  info: Info
  searchQuery: string
  isLoading: boolean
  error: string | null
  scrollPosition: number
}

type EpisodeActions = {
  setSearchQuery: (query: string) => void
  setScrollPosition: (position: number) => void
  fetchEpisodes: (url?: string) => Promise<void>
  fetchNextPage: () => Promise<void>
}

export type EpisodeZustandStore = EpisodeZustandState & EpisodeActions
