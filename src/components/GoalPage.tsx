import { useParams } from 'react-router-dom'
import { CommentData } from '../constants/types'
import { FETCH_GOALS_URL, FETCH_COMMENTS_URL } from '../constants/urls'
import { useFetch } from '../hooks/api-hook'
import Loader from './Loader'

export default function GoalPage() {
  const goalId = useParams().id
  const [goal, isGoalLoading] = useFetch(`${FETCH_GOALS_URL}/${goalId}`)
  const [comments, isCommentsLoading] = useFetch(
    `${FETCH_COMMENTS_URL}?goalId=${goalId}`
  )
  return (
    <Loader isLoading={isGoalLoading || isCommentsLoading}>
      <div className="goal-page">
        <a href="/">👈🏼 Back</a>
        <div className="goal-page-content">
          <h1>{goal?.description}</h1>
          <p>By {goal?.userId}</p>
        </div>
        <div className="goal-page-comments-section">
          {comments?.map((comment: CommentData) => (
            <div className="goal-page-comment">
              <p className="comment-author">👤 {comment.userId}</p>
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    </Loader>
  )
}
