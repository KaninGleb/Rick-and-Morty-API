import { useState, useEffect, useCallback, useRef } from 'react'
import { instance } from '@/common'
import type { ErrorType } from '@/pages/api'

export const useLazyFetchMultiple = <T>(urls: string[], batchSize = 10) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<ErrorType>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const currentIndex = useRef(0)
  const fetchedIds = useRef<Set<string>>(new Set())

  const parseUrls = (urls: string[]): { ids: string[]; endpoint: string | null } => {
    if (!urls.length) return { ids: [], endpoint: null }

    const endpoint = urls[0].split('/').slice(0, -1).join('/')
    const ids = urls
      .map((url) => url.split('/').pop()!)
      .filter(Boolean)
      .filter((id) => !fetchedIds.current.has(id))

    return { ids, endpoint }
  }

  const fetchBatch = useCallback(
    async (controller: AbortController) => {
      const start = currentIndex.current
      const end = Math.min(start + batchSize, urls.length)
      const batchUrls = urls.slice(start, end)

      if (!batchUrls.length) return

      setIsLoading(true)

      try {
        const { ids, endpoint } = parseUrls(batchUrls)
        if (!ids.length) {
          setError('No valid or new IDs found')
          return
        }

        let results: T[]
        if (endpoint?.includes('/character')) {
          const response = await instance.get<T[]>(`/character/${ids.join(',')}`, {
            signal: controller.signal,
          })
          results = Array.isArray(response.data) ? response.data : [response.data]
        } else {
          results = (
            await Promise.all(
              batchUrls.map((url) =>
                instance
                  .get<T>(url, { signal: controller.signal })
                  .then((res) => res.data)
                  .catch(() => null),
              ),
            )
          ).filter(Boolean) as T[]
        }

        ids.forEach((id) => fetchedIds.current.add(id))

        setData((prev) => [...prev, ...results])
        currentIndex.current = end
        setHasMore(end < urls.length)
        setError(null)
      } catch {
        if (!controller.signal.aborted) {
          setError('Failed to fetch some resources')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    },
    [urls, batchSize],
  )

  useEffect(() => {
    if (!urls.length) return

    currentIndex.current = 0
    fetchedIds.current.clear()
    setData([])
    setError(null)
    setHasMore(urls.length > 0)

    const controller = new AbortController()
    void fetchBatch(controller)

    return () => controller.abort()
  }, [urls, fetchBatch])

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    const controller = new AbortController()
    void fetchBatch(controller)
  }, [isLoading, hasMore, fetchBatch])

  return {
    data,
    error,
    isLoading,
    hasMore,
    loadMore,
  }
}
