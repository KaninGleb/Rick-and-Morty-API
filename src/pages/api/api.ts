import { instance } from '@/common'
import { API_ENDPOINTS } from '@/common/data/paths.ts'
import type { BaseResponse, CharactersResults, LocationResults, EpisodeResults } from '@/pages/api/api.types.ts'

export const api = {
  getCharacters(url: string = API_ENDPOINTS.Characters) {
    return instance.get<BaseResponse<CharactersResults>>(url)
  },
  getLocations(url: string = API_ENDPOINTS.Locations) {
    return instance.get<BaseResponse<LocationResults>>(url)
  },
  getEpisodes(url: string = API_ENDPOINTS.Episodes) {
    return instance.get<BaseResponse<EpisodeResults>>(url)
  },
  async getIndividual<T>(urls: string[], signal?: AbortSignal): Promise<T[]> {
    const results: (T | null)[] = []

    for (const url of urls) {
      try {
        const res = await instance.get<T>(url, { signal })
        results.push(res.data)
      } catch {
        results.push(null)
      }
    }

    return results.filter(Boolean) as T[]
  },
  async getMultiple<T>(endpoint: string, ids: string[], signal?: AbortSignal): Promise<T[]> {
    const res = await instance.get<T[] | T>(`${endpoint}/${ids.join(',')}`, { signal })
    return Array.isArray(res.data) ? res.data : [res.data]
  },
}
