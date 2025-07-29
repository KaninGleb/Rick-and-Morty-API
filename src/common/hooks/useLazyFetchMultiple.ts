import { useState, useEffect, useCallback, useRef } from 'react'
import { api, type ErrorType } from '@/pages/api'
import { parseUrls } from '@/common'

export const useLazyFetchMultiple = <T>(urls: string[], batchSize = 10) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<ErrorType>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const currentIndex = useRef(0)
  const fetchedIds = useRef<Set<string>>(new Set())

  const fetchBatch = useCallback(
    async (controller: AbortController) => {
      const start = currentIndex.current
      const end = Math.min(start + batchSize, urls.length)
      const batchUrls = urls.slice(start, end)

      if (!batchUrls.length) return

      setIsLoading(true)

      try {
        const { ids, endpoint } = parseUrls(batchUrls, fetchedIds.current)

        if (!ids.length || !endpoint) {
          setError('No valid or new IDs found')
          return
        }

        let results: T[]
        if (endpoint?.includes('/character') || endpoint?.includes('/episode') || endpoint?.includes('/location')) {
          results = await api.getMultiple<T>(endpoint, ids, controller.signal)
        } else {
          results = await api.getIndividual<T>(batchUrls, controller.signal)
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
