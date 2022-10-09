export type GoalData = {
  id: 1
  completed: boolean
  expiration: string
  userId: string
  description: string
  commentCount: number
}

export type CommentData = {
  id: number
  goalId: number
  userId: string
  text: string
}
