import { useFetchPublicGoals } from '../api-client'
import GoalDescription from './GoalDescription'
import Loader from './Loader'

export default function PublicGoals() {
  const publicGoals = useFetchPublicGoals()
  return (
    <Loader isLoading={publicGoals?.isLoading}>
      <div className="public-goals">
        {publicGoals?.data?.map((goal) => (
          <div className="goal-card" key={goal.id}>
            <GoalDescription goalData={goal} />
          </div>
        ))}
      </div>
    </Loader>
  )
}
