import { useState, useEffect, useCallback, useRef } from 'react'
import { instance } from '@/common'
import type { ErrorType } from '@/pages/api'

export const useLazyFetchMultiple = <T>(urls: string[], batchSize = 10) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<ErrorType>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const currentIndex = useRef(0)

  const fetchBatch = useCallback(async (controller: AbortController) => {
      const start = currentIndex.current
      const end = Math.min(start + batchSize, urls.length)
      const batchUrls = urls.slice(start, end)

      if (!batchUrls.length) return

      setIsLoading(true)

      try {
        const results = await Promise.all(
          batchUrls.map((url) =>
            instance
              .get<T>(url, { signal: controller.signal })
              .then((res) => res.data)
              .catch(() => null),
          ),
        )

        const filtered = results.filter(Boolean) as T[]

        setData((prev) => [...prev, ...filtered])

        currentIndex.current = end

        setHasMore(end < urls.length)

        setError(null)
      } catch {
        if (!controller.signal.aborted) {
          setError('Failed to fetch some residents')
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
    setData([])
    setError(null)
    setHasMore(false)

    const controller = new AbortController()
    void fetchBatch(controller)

    return () => controller.abort()
  }, [urls, batchSize, fetchBatch])

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
