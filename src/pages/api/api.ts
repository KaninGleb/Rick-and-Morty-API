import { instance } from '@/common'
import type { BaseResponse, CharactersResults, LocationResults, EpisodeResults } from '@/pages/api/api.types.ts'

export const api = {
  getCharacters(url: string = `/character`) {
    return instance.get<BaseResponse<CharactersResults>>(url)
  },
  getLocations(url: string = `/location`) {
    return instance.get<BaseResponse<LocationResults>>(url)
  },
  getEpisodes(url: string = `/episode`) {
    return instance.get<BaseResponse<EpisodeResults>>(url)
  },
}
