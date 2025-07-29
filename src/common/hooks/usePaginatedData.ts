import { useEffect, useState, useCallback } from 'react'
import { type BaseResponse, type ErrorType, type Info } from '@/pages/api'
import axios, { type AxiosResponse } from 'axios'

type PaginatedData<T> = {
  data: T[]
  info: Info
  currentPage: number
  error: ErrorType
  isLoading: boolean
  fetchData: (url?: string) => void
  nextPageHandler: () => void
  previousPageHandler: () => void
}

export const usePaginatedData = <T>(
  fetchFunction: (url: string) => Promise<AxiosResponse<BaseResponse<T>>>,
  initialUrl: string,
): PaginatedData<T> => {
  const [data, setData] = useState<T[]>([])
  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorType | null>(null)

  const getPageFromUrl = (url: string | null): number => {
    if (!url) return 1
    try {
      const pageParam = new URL(url).searchParams.get('page')
      return pageParam ? parseInt(pageParam, 10) : 1
    } catch {
      return 1
    }
  }

  const fetchData = useCallback(async (url: string = initialUrl) => {
      if (!url) {
        setError('No URL provided')
        return
      }

      setIsLoading(true)
      try {
        const res = await fetchFunction(url)

        const isFirstPage = !url.includes('page=') || url.includes('page=1')

        if (isFirstPage) {
          setData(res.data.results)
        } else {
          setData(prev => [...prev, ...res.data.results])
        }

        setInfo(res.data.info)
        setError(null)
        setCurrentPage(getPageFromUrl(url))
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error)
        } else {
          setError('Failed to fetch data')
        }
        setData([])
      } finally {
        setIsLoading(false)
      }
    },
    [fetchFunction, initialUrl],
  )

  useEffect(() => {
    void fetchData(initialUrl)
  }, [fetchData, initialUrl])

  const nextPageHandler = async () => {
    if (info.next) {
      await fetchData(info.next)
    }
  }

  const previousPageHandler = async () => {
    if (info.prev) {
      await fetchData(info.prev)
    }
  }

  return {
    data,
    info,
    currentPage,
    error,
    isLoading,
    fetchData,
    nextPageHandler,
    previousPageHandler,
  }
}
