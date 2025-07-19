import { useEffect, useState, useCallback } from 'react'
import { type BaseResponse, type ErrorType, type Info } from '@/pages/api'
import type { AxiosResponse } from 'axios'

type PaginatedData<T> = {
  data: T[]
  info: Info
  error: ErrorType | null
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
  const [error, setError] = useState<ErrorType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = useCallback(async (url: string = initialUrl) => {
      if (!url) {
        setError('No URL provided')
        return
      }

      setIsLoading(true)
      try {
        const res = await fetchFunction(url)
        setData(res.data.results || [])
        setInfo(res.data.info)
        setError(null)
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch data')
        setData([])
      } finally {
        setIsLoading(false)
      }
    },
    [fetchFunction, initialUrl],
  )

  useEffect(() => {
    fetchData(initialUrl)
  }, [fetchData, initialUrl])

  const nextPageHandler = () => {
    if (info.next) {
      fetchData(info.next)
    }
  }

  const previousPageHandler = () => {
    if (info.prev) {
      fetchData(info.prev)
    }
  }

  return {
    data,
    info,
    error,
    isLoading,
    fetchData,
    nextPageHandler,
    previousPageHandler,
  }
}
