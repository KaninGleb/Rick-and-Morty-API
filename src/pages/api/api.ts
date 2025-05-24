import { instance } from '@/common'
import type { BaseResponse } from '@/pages/api/api.types.ts'

export const api = {
  getCharacters() {
    return instance.get<BaseResponse>(`/character`)
  },
}
