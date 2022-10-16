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
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  async function fetchData() {
    await fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!isAPICalled.current) {
      setIsLoading(true)
      fetchData()
      isAPICalled.current = true
    }
  }, [url])

  return { data, isLoading, isError, fetchData }
}

export function useFetchPublicGoals() {
  const publicGoals = useFetch(FETCH_GOALS_URL)
  return {
    data: publicGoals.isLoading ? [] : (publicGoals.data as GoalData[]),
    isLoading: publicGoals.isLoading,
    isError: publicGoals.isLoading,
    refetch: publicGoals.fetchData,
  }
}

export function useFetchGoal(goalId: string) {
  const goal = useFetch(`${FETCH_GOALS_URL}/${goalId}`)
  return {
    data: goal.isLoading ? null : (goal.data as GoalData),
    isLoading: goal.isLoading,
    isError: goal.isLoading,
    refetch: goal.fetchData,
  }
}

export function useFetchComments(goalId: string) {
  const comments = useFetch(`${FETCH_COMMENTS_URL}?goalId=${goalId}`)
  return {
    data: comments.isLoading ? [] : (comments.data as CommentData[]),
    isLoading: comments.isLoading,
    isError: comments.isLoading,
    refetch: comments.fetchData,
  }
}

export function useFetchUserGoals(userId: string) {
  const userGoals = useFetch(`${FETCH_GOALS_URL}?userId=${userId}`)
  return {
    data: userGoals.isLoading ? [] : (userGoals.data as GoalData[]),
    isLoading: userGoals.isLoading,
    isError: userGoals.isLoading,
    refetch: userGoals.fetchData,
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
