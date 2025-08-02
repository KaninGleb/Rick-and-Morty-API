import { createEntityStore } from '@/stores'
import { api } from '@/pages/api'
import { API_ENDPOINTS } from '@/common/data/paths.ts'

export const useEpisodeStore = createEntityStore(api.getEpisodes, API_ENDPOINTS.Episodes)

// import { create } from 'zustand'
// import type { EpisodeZustandStore } from './useEpisodeStore.types.ts'
// import { api } from '@/pages/api'
// import type { AxiosError } from 'axios'
//
// export const useEpisodeStore = create<EpisodeZustandStore>((set, get) => ({
//   episodes: [],
//   info: {
//     count: 0,
//     pages: 0,
//     next: null,
//     prev: null,
//   },
//   searchQuery: '',
//   isLoading: false,
//   error: null,
//   scrollPosition: 0,
//
//   setSearchQuery: (query) => {
//     set({ searchQuery: query })
//   },
//
//   setScrollPosition: (position) => {
//     set({ scrollPosition: position })
//   },
//
//   fetchEpisodes: async (url = '/episode') => {
//     set({ isLoading: true, error: null })
//     try {
//       const res = await api.getEpisodes(url)
//       set({
//         episodes: res.data.results,
//         info: res.data.info,
//         isLoading: false,
//       })
//     } catch (e) {
//       const error = e as AxiosError
//       set({
//         error: error.message || 'Unknown error',
//         isLoading: false,
//         episodes: [],
//         info: { count: 0, pages: 0, next: null, prev: null },
//       })
//     }
//   },
//
//   fetchNextPage: async () => {
//     const { info, episodes } = get()
//     if (!info.next) return
//
//     set({ isLoading: true })
//     try {
//       const response = await api.getEpisodes(info.next)
//       set({
//         episodes: [...episodes, ...response.data.results],
//         info: response.data.info,
//         isLoading: false,
//       })
//     } catch (e) {
//       const message = (e as Error)?.message || 'Unknown error'
//       set({ error: message, isLoading: false })
//     }
//   },
// }))
