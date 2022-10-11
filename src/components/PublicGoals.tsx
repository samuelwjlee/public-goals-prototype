import { FETCH_GOALS_URL } from '../constants/urls'
import { useFetch } from '../hooks/api-hook'
import { GoalData } from '../constants/types'
import GoalDescription from './GoalDescription'
import Loader from './Loader'
import { Link } from 'react-router-dom'

export default function PublicGoals() {
  const [goals, isLoading] = useFetch(FETCH_GOALS_URL)
  return (
    <Loader isLoading={isLoading}>
      <>
        <h1 className="header">Public Goals</h1>
        <div className="public-goals">
          {goals?.map((goal: GoalData) => (
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
