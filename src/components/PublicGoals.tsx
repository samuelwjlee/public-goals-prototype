import { FETCH_GOALS_URL } from '../constants/urls'
import { useFetch } from '../hooks/api-hook'
import { GoalData } from '../constants/types'
import GoalDescription from './GoalDescription'
import Loader from './Loader'

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
                  <>
                    {goal?.commentCount} comment
                    {goal?.commentCount > 1 ? 's' : ''}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    </Loader>
  )
}
