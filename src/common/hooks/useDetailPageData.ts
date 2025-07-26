import { useParams } from 'react-router'
import { type EntityWithRelated, getRelatedField } from '@/common'
import { useFetchById } from './useFetchById.ts'
import { useLazyFetchMultiple } from './useLazyFetchMultiple.ts'
import { useInfiniteScroll } from './useInfiniteScroll.ts'

type entityNameType = 'episode' | 'character' | 'location'

export const useDetailPageData = <T extends EntityWithRelated, R>(
  entityName: entityNameType,
  relatedContainerSelector: string,
) => {
  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading } = useFetchById<T>(`/${entityName}`, id)

  const {
    data: relatedData,
    error: relatedError,
    isLoading: isLoadingRelated,
    hasMore,
    loadMore,
  } = useLazyFetchMultiple<R>(getRelatedField(data) || [], 10)

  const observerRef = useInfiniteScroll({
    hasMore,
    loadMore,
    isLoading: isLoadingRelated,
    containerSelector: relatedContainerSelector,
  })

  return {
    id,
    data,
    relatedData,
    error: error || relatedError,
    isLoading,
    isLoadingRelated,
    hasMore,
    observerRef,
  }
}
