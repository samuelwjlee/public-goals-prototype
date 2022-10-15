import { useParams } from 'react-router-dom'
import { useFetchUserGoals } from '../api-client'
import BackLink from './BackLink'
import GoalDescription from './GoalDescription'
import Loader from './Loader'

export default function UserGoals() {
  const { userId } = useParams()
  const userGoals = useFetchUserGoals(userId as string)
  return (
    <Loader isLoading={userGoals.isLoading}>
      <h1 className="header">👨🏻‍💻 {userId}'s goals</h1>
      <div className="user-goal-content">
        <BackLink destinationText="home" destinationUrl="/" />
        {userGoals.data?.map((goal) => (
          <div className="user-goal">
            <GoalDescription goalData={goal} key={goal.id} />
          </div>
        ))}
      </div>
    </Loader>
  )
}
