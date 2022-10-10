import { useParams } from 'react-router-dom'
import { CommentData } from '../constants/types'
import { FETCH_GOALS_URL, FETCH_COMMENTS_URL } from '../constants/urls'
import { useFetch } from '../hooks/api-hook'
import GoalDescription from './GoalDescription'
import UserBubble from './UserBubble'
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
        {goal && (
          <div className="goal-page-content">
            <GoalDescription goalData={goal} />
          </div>
        )}
        {comments && (
          <div className="goal-page-comments-section">
            {comments?.map((comment: CommentData) => (
              <div className="goal-page-comment" key={comment.id}>
                <UserBubble userId={comment.userId} />
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Loader>
  )
}
