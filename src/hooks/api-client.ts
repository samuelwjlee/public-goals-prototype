import { useState, useEffect, useRef } from 'react'
import { CommentData, GoalData } from '../constants/types'
import { FETCH_COMMENTS_URL, FETCH_GOALS_URL } from '../constants/urls'

function useFetch(url: string) {
  const isDataFetched = useRef(false)
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (isDataFetched.current === false) {
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

export function useFetchPublicGoals(): {
  publicGoalsData: GoalData[]
  isPublicGoalsLoading: boolean
  isPublicGoalsError: boolean
} {
  const [data, isLoading, isError] = useFetch(FETCH_GOALS_URL)
  return {
    publicGoalsData: isLoading ? [] : data,
    isPublicGoalsLoading: isLoading,
    isPublicGoalsError: isError,
  }
}

export function useFetchGoal(id: string): {
  goalData: GoalData
  isGoalLoading: boolean
  isGoalError: boolean
} {
  const [data, isLoading, isError] = useFetch(`${FETCH_GOALS_URL}/${id}`)
  return {
    goalData: isLoading ? [] : data,
    isGoalLoading: isLoading,
    isGoalError: isError,
  }
}

export function useFetchComments(goalId: string): {
  commentData: CommentData[]
  isCommentLoading: boolean
  isCommentError: boolean
} {
  const [data, isLoading, isError] = useFetch(
    `${FETCH_COMMENTS_URL}?goalId=${goalId}`
  )
  return {
    commentData: isLoading ? [] : data,
    isCommentLoading: isLoading,
    isCommentError: isError,
  }
}

export function useFetchUserGoals(userId: string): {
  userGoalData: GoalData[]
  isUserGoalLoading: boolean
  isUserGoalError: boolean
} {
  const [data, isLoading, isError] = useFetch(
    `${FETCH_GOALS_URL}?userId=${userId}`
  )
  return {
    userGoalData: isLoading ? [] : data,
    isUserGoalLoading: isLoading,
    isUserGoalError: isError,
  }
}
