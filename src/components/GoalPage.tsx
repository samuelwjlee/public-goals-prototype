import { useParams } from 'react-router-dom'
import { useFetchComments, useFetchGoal } from '../api-client'
import GoalDescription from './GoalDescription'
import UserBubble from './UserBubble'
import Loader from './Loader'
import BackLink from './BackLink'

export default function GoalPage() {
  const goalId = useParams().id as string
  const goal = useFetchGoal(goalId)
  const comments = useFetchComments(goalId)
  return (
    <Loader isLoading={goal.isLoading || comments.isLoading}>
      <div className="goal-page">
        <BackLink destinationText="home" destinationUrl="/" />
        {goal.data && (
          <div className="goal-page-content">
            <GoalDescription goalData={goal.data} />
          </div>
        )}
        {comments.data && (
          <div className="goal-page-comments-section">
            {comments.data?.map((comment) => (
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
