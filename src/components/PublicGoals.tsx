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
            <p className="goal-card-status">
              {goal?.completed ? '✅ DONE' : '🔴 LIVE'}
            </p>
            <h3>{goal?.description}</h3>
            <div className="goal-card-footer">
              {goal?.commentCount && <p>{goal?.commentCount} comments</p>}
              <p className="goal-card-author">By {goal?.userId}</p>
            </div>
          </div>
        ))}
      </div>
    </Loader>
  )
}
