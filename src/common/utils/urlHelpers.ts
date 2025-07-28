export const getEpisodeId = (url: string) => url.split('/').pop()

export const parseUrls = (urls: string[], fetchedIds: Set<string>) => {
  if (!urls.length) return { ids: [], endpoint: null }

  const endpoint = urls[0]
    .split('/')
    .slice(0, -1)
    .join('/')

  const ids = urls
    .map((url) => url.split('/').pop()!)
    .filter((id) => id && !fetchedIds.has(id))

  return { ids, endpoint }
}
