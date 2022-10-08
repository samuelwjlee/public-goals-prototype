import { useFetch } from '../hooks/api-hook'
import { JSON_SERVER_URL } from '../constants/urls'
import Loader from './Loader'

export default function PublicGoals() {
  const [goals, isLoading] = useFetch(`${JSON_SERVER_URL}/goals`)

  return (
    <Loader isLoading={isLoading}>
      <div>
        <h1>Public Goals</h1>
        {goals?.map((goal) => (
          <>
            <p>{goal?.title}</p>
            <p>{goal?.description}</p>
            <p>by {goal?.userId}</p>
          </>
        ))}
      </div>
    </Loader>
  )
}
