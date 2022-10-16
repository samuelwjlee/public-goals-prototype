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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchData() {
    await fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!isAPICalled.current) {
      setIsLoading(true)
      fetchData()
      isAPICalled.current = true
    }
  }, [url])

  return { data, isLoading, error, fetchData }
}

function getCommonAPIResponseObject(responseObj: ReturnType<typeof useFetch>) {
  return {
    error: responseObj.error,
    isLoading: responseObj.isLoading,
    refetch: responseObj.fetchData,
  }
}

export function useFetchPublicGoals() {
  const publicGoals = useFetch(FETCH_GOALS_URL)
  return {
    data: (publicGoals.data ?? []) as GoalData[],
    ...getCommonAPIResponseObject(publicGoals),
  }
}

export function useFetchGoal(goalId: string) {
  const goal = useFetch(`${FETCH_GOALS_URL}/${goalId}`)
  return {
    data: (goal.data ?? null) as GoalData | null,
    ...getCommonAPIResponseObject(goal),
  }
}

export function useFetchComments(goalId: string) {
  const comments = useFetch(
    `${FETCH_COMMENTS_URL}?goalId=${goalId}&_sort=createdAt&_order=desc`
  )
  return {
    data: (comments.data ?? []) as CommentData[],
    ...getCommonAPIResponseObject(comments),
  }
}

export function useFetchUserGoals(userId: string) {
  const userGoals = useFetch(`${FETCH_GOALS_URL}?userId=${userId}`)
  return {
    data: (userGoals.data ?? []) as GoalData[],
    ...getCommonAPIResponseObject(userGoals),
  }
}

export function postUserComment(
  text: string,
  goalId: string,
  userId: string,
  callback: () => Promise<void>
) {
  fetch(FETCH_COMMENTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      goalId,
      userId,
      createdAt: new Date(),
    }),
  }).then(callback)
}
