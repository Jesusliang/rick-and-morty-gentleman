import React, { useCallback, useEffect, useRef, useState } from "react"

export interface AbortableService<T> {
  asyncCall: () => Promise<T>
  controller: AbortController
}

const useUnmountAsync = () => {
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
  const controller = useRef<AbortController>()

  useEffect(() => {
    return () => {
      setIsMounted(false)
      if (controller.current !== undefined) controller.current.abort()
    }
  }, [])

  const callAsync = useCallback(
    async <T extends any>(params: {
      asyncFn: (() => Promise<T>) | AbortableService<T>
    }): Promise<T> => {
      return new Promise<T>(async (resolve, reject) => {
        setLoading(true)
        let response
        if ("controller" in params.asyncFn) {
          controller.current = params.asyncFn.controller
        }
        if ("asyncCall" in params.asyncFn) {
          response = await params.asyncFn.asyncCall()
        } else {
          response = await params.asyncFn()
        }
        setLoading(false)
        if (isMounted) resolve(response)
      })
    },
    [isMounted]
  )

  return {
    loading,
    callAsync
  }
}

export default useUnmountAsync
