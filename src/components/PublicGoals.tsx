import { useFetch } from '../hooks/api-hook'
import { JSON_SERVER_URL } from '../constants/urls'
import Loader from './Loader'

export default function PublicGoals() {
  const [goals, isLoading] = useFetch(`${JSON_SERVER_URL}/goals`)
  return (
    <Loader isLoading={isLoading}>
      <>
        <h1 style={{ padding: 20 }}>Public Goals</h1>
        {goals?.map((goal, idx) => (
          <div
            style={{
              backgroundColor: idx % 2 === 0 ? 'white' : 'lightgray',
              padding: 20,
            }}
          >
            <h3>{goal?.title}</h3>
            <p>{goal?.description}</p>
            <p style={{ textAlign: 'right' }}>by {goal?.userId}</p>
          </div>
        ))}
      </>
    </Loader>
  )
}
