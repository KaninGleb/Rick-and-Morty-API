// Handles classic, page-by-page data fetching and navigation
export { usePaginatedData } from './usePaginatedData'

// Fetches a single entity (e.g., character) by its ID. Perfect for detail pages
export { useFetchById } from './useFetchById'

// Lazily fetches multiple resources in batches from a list of URLs
export { useLazyFetchMultiple } from './useLazyFetchMultiple'

// Powers infinite scroll by calling a function when a target element becomes visible
export { useInfiniteScroll } from './useInfiniteScroll'

// Aggregates data fetching for detail pages, combining `useFetchById` and `useLazyFetchMultiple`
export { useDetailPageData } from './useDetailPageData'

// Hook with scroll logic
export { usePageData } from './usePageData'
export * from './usePageData'
