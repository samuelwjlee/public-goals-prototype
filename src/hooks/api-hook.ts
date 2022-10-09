import { useState, useEffect } from 'react'

export function useFetch(url: string) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    ;(async function () {
      const data = await fetch(url).then((res) => res.json())
      setIsLoading(false)
      setData(data)
    })()
  }, [url])

  return [data, isLoading] as [null | any, boolean]
}
