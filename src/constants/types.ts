export type GoalData = {
  id: 1
  completed: boolean
  userId: string
  what: string
  when: string
  commentCount: number
}

export type CommentData = {
  id: number
  goalId: number
  userId: string
  text: string
}
