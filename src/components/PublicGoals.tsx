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
      <div className="PublicGoals">
        <h1>Public Goals</h1>
        {goals?.map((goal: GoalData) => (
          <div className="GoalCard" onClick={() => navigate(`/${goal?.id}`)}>
            <h3>{goal?.description}</h3>
            <div className="GoalCardFooter">
              <p>{goal?.completed ? '✅ DONE' : '🔴 LIVE'}</p>
              <p>Posted by {goal?.userId}</p>
            </div>
          </div>
        ))}
      </div>
    </Loader>
  )
}
