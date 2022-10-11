import { useParams } from 'react-router-dom'
import { GoalData } from '../constants/types'
import { FETCH_GOALS_URL } from '../constants/urls'
import { useFetch } from '../hooks/api-hook'
import BackLink from './BackLink'
import GoalDescription from './GoalDescription'
import Loader from './Loader'

export default function UserGoals() {
  const { username } = useParams()
  const [goals, isLoading] = useFetch(`${FETCH_GOALS_URL}?userId=${username}`)
  return (
    <Loader isLoading={isLoading}>
      <h1 className="header">👨🏻‍💻 {username}'s goals</h1>
      <div className="user-goal-content">
        <BackLink destinationText="home" destinationUrl="/" />
        {goals?.map((goal: GoalData) => (
          <div className="user-goal">
            <GoalDescription goalData={goal} key={goal.id} />
          </div>
        ))}
      </div>
    </Loader>
  )
}
