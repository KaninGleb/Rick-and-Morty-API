export type EntityWithRelated = {
  characters?: string[]
  residents?: string[]
  episode?: string[]
}

export const getRelatedField = (data: EntityWithRelated | undefined | null): string[] => {
  if (!data) return []

  if (data.characters) return data.characters
  if (data.residents) return data.residents
  if (data.episode) return data.episode

  return []
}
