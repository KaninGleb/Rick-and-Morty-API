import { useEffect, useRef } from 'react'

type useInfiniteScrollPropsType = {
  hasMore: boolean
  loadMore: () => void
  isLoading: boolean
  containerSelector?: string | null
  debounceMs?: number
}

export const useInfiniteScroll = ({
  hasMore,
  loadMore,
  isLoading,
  containerSelector,
  debounceMs = 200,
}: useInfiniteScrollPropsType) => {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const observerInstance = useRef<IntersectionObserver | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!hasMore || isLoading) return

    const container = containerSelector ? document.querySelector(containerSelector) : null
    const element = observerRef.current
    if (!element) return

    if (observerInstance.current) {
      observerInstance.current.disconnect()
    }

    observerInstance.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (timeoutRef.current) return

          timeoutRef.current = setTimeout(() => {
            loadMore()
            timeoutRef.current = null
          }, debounceMs)
        }
      },
      {
        root: container instanceof HTMLElement ? container : null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )

    observerInstance.current.observe(element)

    return () => {
      observerInstance.current?.disconnect()
      observerInstance.current = null
    }
  }, [hasMore, isLoading, loadMore, containerSelector, debounceMs])

  return observerRef
}
