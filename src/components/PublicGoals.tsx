import { useNavigate } from 'react-router-dom'
import { FETCH_GOALS_URL } from '../constants/urls'
import { useFetch } from '../hooks/api-hook'
import { GoalData } from '../constants/types'
import Loader from './Loader'

export default function PublicGoals() {
  const navigate = useNavigate()
  const [goals, isLoading] = useFetch(FETCH_GOALS_URL)
  return (
    <Loader isLoading={isLoading}>
      <div className="public-goals">
        <h1>Public Goals</h1>
        {goals?.map((goal: GoalData) => (
          <div className="goal-card" onClick={() => navigate(`/${goal?.id}`)}>
            <div className="goal-description">
              <span className="goal-card-author">{goal?.userId}'s</span>{' '}
              bite-sized goal is to{' '}
              <span className="emphasized-goal-attr">{goal?.what}</span> no
              later than {goal?.when}.
            </div>
            <div className="goal-card-footer">
              {goal?.commentCount && (
                <>
                  {goal?.commentCount} comment
                  {goal?.commentCount > 1 ? 's' : ''}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Loader>
  )
}
