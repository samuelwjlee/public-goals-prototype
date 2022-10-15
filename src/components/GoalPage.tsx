import { useParams } from 'react-router-dom'
import { useFetchComments, useFetchGoal } from '../hooks/api-client'
import GoalDescription from './GoalDescription'
import UserBubble from './UserBubble'
import Loader from './Loader'
import BackLink from './BackLink'

export default function GoalPage() {
  const goalId = useParams().id as string
  const { goalData, isGoalLoading } = useFetchGoal(goalId)
  const { commentData, isCommentLoading } = useFetchComments(goalId)
  return (
    <Loader isLoading={isGoalLoading || isCommentLoading}>
      <div className="goal-page">
        <BackLink destinationText="home" destinationUrl="/" />
        {goalData && (
          <div className="goal-page-content">
            <GoalDescription goalData={goalData} />
          </div>
        )}
        {commentData && (
          <div className="goal-page-comments-section">
            {commentData?.map((comment) => (
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
