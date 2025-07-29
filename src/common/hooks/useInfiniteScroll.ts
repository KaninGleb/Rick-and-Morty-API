import { useEffect, useRef } from 'react'

type useInfiniteScrollPropsType = {
  hasMore: boolean
  loadMore: () => void
  isLoading: boolean
  containerSelector?: string | null
}

export const useInfiniteScroll = ({ hasMore, loadMore, isLoading, containerSelector }: useInfiniteScrollPropsType) => {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const observerInstance = useRef<IntersectionObserver | null>(null)

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
          loadMore()
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
  }, [hasMore, isLoading, loadMore, containerSelector])

  return observerRef
}
