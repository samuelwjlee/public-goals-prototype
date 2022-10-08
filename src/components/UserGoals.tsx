import { useParams } from 'react-router-dom'

export default function UserGoals() {
  const { username } = useParams()
  return <>{username}'s goals</>
}
