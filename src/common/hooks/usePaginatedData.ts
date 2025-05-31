import { useEffect, useState } from 'react'
import { type BaseResponse, type ErrorType, type Info } from '@/pages/api'
import type { AxiosResponse } from 'axios'

export const usePaginatedData = <T>(
  fetchFunction: (url?: string) => Promise<AxiosResponse<BaseResponse<T>>>,
  initialUrl: string,
) => {
  const [data, setData] = useState<T[]>([])

  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })

  const [error, setError] = useState<ErrorType>(null)

  const fetchData = (url?: string) => {
    if (!url) return

    fetchFunction(url)
      .then((res) => {
        setData(res.data.results)
        setInfo(res.data.info)
        setError(null)
      })
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  useEffect(() => {
    fetchData(initialUrl)
  }, [initialUrl])

  const nextPageHandler = () => {
    fetchData(info.next ?? undefined)
  }

  const previousPageHandler = () => {
    fetchData(info.prev ?? undefined)
  }

  return {
    data,
    info,
    error,
    fetchData,
    nextPageHandler,
    previousPageHandler,
  }
}
