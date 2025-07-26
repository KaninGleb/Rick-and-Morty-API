import { useEffect, useRef } from 'react'

type useInfiniteScrollPropsType = {
  hasMore: boolean
  loadMore: () => void
  isLoading: boolean
  containerSelector: string
}

export const useInfiniteScroll = ({ hasMore, loadMore, isLoading, containerSelector }: useInfiniteScrollPropsType) => {
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasMore || isLoading) return

    const container = document.querySelector(containerSelector)
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1, root: container },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasMore, isLoading, loadMore, containerSelector])

  return observerRef
}
