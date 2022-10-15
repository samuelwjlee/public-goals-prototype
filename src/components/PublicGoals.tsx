import { useFetchPublicGoals } from '../hooks/api-client'
import GoalDescription from './GoalDescription'
import Loader from './Loader'
import { Link } from 'react-router-dom'

export default function PublicGoals() {
  const { publicGoalsData, isPublicGoalsLoading } = useFetchPublicGoals()
  return (
    <Loader isLoading={isPublicGoalsLoading}>
      <>
        <h1 className="header">Public Goals</h1>
        <div className="public-goals">
          {publicGoalsData?.map((goal) => (
            <div className="goal-card" key={goal.id}>
              <GoalDescription goalData={goal} />
              <div className="goal-card-footer">
                {!!goal?.commentCount && (
                  <Link to={`/${goal?.id}`} className="comment-link">
                    {goal?.commentCount} comment
                    {goal?.commentCount > 1 ? 's' : ''}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    </Loader>
  )
}
