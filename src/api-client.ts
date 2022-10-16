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
  createdAt: string
}

type CommentData = {
  id: string
  goalId: string
  userId: string
  text: string
  createdAt: string
}

function useFetch(url: string) {
  const isAPICalled = useRef(false)
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!isAPICalled.current) {
      ;(async function () {
        await fetch(url)
          .then((res) => res.json())
          .then(setData)
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false))
      })()
      isAPICalled.current = true
    }
  }, [url])

  return [data, isLoading, isError] as [any, boolean, boolean]
}

export function useFetchPublicGoals() {
  const [data, isLoading, isError] = useFetch(FETCH_GOALS_URL)
  return {
    data: isLoading ? [] : (data as GoalData[]),
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
    data: isLoading ? [] : (data as GoalData[]),
    isLoading,
    isError,
  }
}

export function postUserComment(
  userComment: string,
  goalId: string,
  userId: string
) {
  return fetch(FETCH_COMMENTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: userComment,
      createdAt: new Date(),
      goalId,
      userId,
    }),
  })
}
