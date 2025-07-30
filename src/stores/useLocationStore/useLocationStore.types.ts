import type { LocationResults, Info } from '@/pages/api'

type LocationZustandState = {
  locations: LocationResults[]
  info: Info
  searchQuery: string
  isLoading: boolean
  error: string | null
  scrollPosition: number
}

type LocationActions = {
  setSearchQuery: (query: string) => void
  setScrollPosition: (position: number) => void
  fetchLocations: (url?: string) => Promise<void>
  fetchNextPage: () => Promise<void>
}

export type LocationZustandStore = LocationZustandState & LocationActions
