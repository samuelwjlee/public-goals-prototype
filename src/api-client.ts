import { useState, useEffect, useRef } from 'react'

const SERVER_PORT = 3001
const LOCAL_HOST = 'http://localhost:'
const JSON_SERVER_URL = `${LOCAL_HOST}${SERVER_PORT}`

export const FETCH_GOALS_URL = `${JSON_SERVER_URL}/goals`
export const FETCH_COMMENTS_URL = `${JSON_SERVER_URL}/comments`

export type GoalData = {
  id: 1
  completed: boolean
  userId: string
  what: string
  when: string
  commentCount: number
}

type CommentData = {
  id: number
  goalId: number
  userId: string
  text: string
}

function useFetch(url: string) {
  const isDataFetched = useRef(false)
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!isDataFetched.current) {
      ;(async function () {
        await fetch(url)
          .then((res) => res.json())
          .then(setData)
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false))
      })()
      isDataFetched.current = true
    }
  }, [url])

  return [data, isLoading, isError] as [any, boolean, boolean]
}

export function useFetchPublicGoals() {
  const [data, isLoading, isError] = useFetch(FETCH_GOALS_URL)
  return {
    data: isLoading ? null : (data as GoalData[]),
    isLoading,
    isError,
  }
}

export function useFetchGoal(goalId: string) {
  const [data, isLoading, isError] = useFetch(`${FETCH_GOALS_URL}/${goalId}`)
  return {
    data: isLoading ? null : (data as GoalData),
    isLoading,
    isError,
  }
}

export function useFetchComments(goalId: string) {
  const [data, isLoading, isError] = useFetch(
    `${FETCH_COMMENTS_URL}?goalId=${goalId}`
  )
  return {
    data: isLoading ? null : (data as CommentData[]),
    isLoading,
    isError,
  }
}

export function useFetchUserGoals(userId: string) {
  const [data, isLoading, isError] = useFetch(
    `${FETCH_GOALS_URL}?userId=${userId}`
  )
  return {
    data: isLoading ? null : (data as GoalData[]),
    isLoading,
    isError,
  }
}
