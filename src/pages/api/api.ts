import { instance } from '@/common'
import type { BaseResponse, CharactersResults, LocationResults } from '@/pages/api/api.types.ts'

export const api = {
  getCharacters(url: string = `/character`) {
    return instance.get<BaseResponse<CharactersResults>>(url)
  },
  getLocations() {
    return instance.get<BaseResponse<LocationResults>>(`/location`)
  },
}
