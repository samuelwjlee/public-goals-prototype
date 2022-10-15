import { useParams } from 'react-router-dom'
import { useFetchUserGoals } from '../hooks/api-client'
import BackLink from './BackLink'
import GoalDescription from './GoalDescription'
import Loader from './Loader'

export default function UserGoals() {
  const { userId } = useParams()
  const { userGoalData, isUserGoalLoading } = useFetchUserGoals(
    userId as string
  )
  return (
    <Loader isLoading={isUserGoalLoading}>
      <h1 className="header">👨🏻‍💻 {userId}'s goals</h1>
      <div className="user-goal-content">
        <BackLink destinationText="home" destinationUrl="/" />
        {userGoalData?.map((goal) => (
          <div className="user-goal">
            <GoalDescription goalData={goal} key={goal.id} />
          </div>
        ))}
      </div>
    </Loader>
  )
}
