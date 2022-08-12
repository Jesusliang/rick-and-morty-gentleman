import React, { useCallback, useEffect, useState } from 'react'

const useUnmountAsync = () => {
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    return () => {
      setIsMounted(false)
    }
  }, [])

  const callAsync =  useCallback(
    async <T extends any> ({ asyncFn }:{
      asyncFn: () => Promise<T>
    }):Promise<T> => {
      return new Promise<T>(async (resolve, reject) => {
        setLoading(true)
        const response = await asyncFn()
        setLoading(false)
        if(isMounted) resolve(response)
      })
    },
    [isMounted],
  )

  return {
    loading,
    callAsync,
  }
}

export default useUnmountAsync