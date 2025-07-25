import { useState, useEffect } from 'react'
import type { ErrorType } from '@/pages/api'
import { instance } from '@/common'
import axios from 'axios'

export const useFetchById = <T>(endpoint: string, id?: string) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ErrorType>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!id) return

    const controller = new AbortController()
    setIsLoading(true)

    ;(async () => {
      try {
        const res = await instance.get(`${endpoint}/${id}`, {
          signal: controller.signal,
        })
        setData(res.data)
        setError(null)
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error)
        } else {
          setError('Failed to fetch data')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    })()

    return () => {
      controller.abort()
      setIsLoading(false)
    }
  }, [endpoint, id])

  return { data, error, isLoading }
}
