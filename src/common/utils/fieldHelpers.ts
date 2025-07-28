export type entityNameType = 'episode' | 'character' | 'location'

export type EntityWithRelated = {
  characters?: string[]
  residents?: string[]
  episode?: string[] | string
}

export const getRelatedField = (data: EntityWithRelated | null | undefined, entityType: entityNameType): string[] => {
  if (!data) {
    return []
  }

  switch (entityType) {
    case 'episode':
      return data.characters || []

    case 'location':
      return data.residents || []

    case 'character':
      return Array.isArray(data.episode) ? data.episode : []

    default:
      return []
  }
}
