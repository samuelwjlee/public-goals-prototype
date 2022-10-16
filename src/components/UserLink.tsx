import { Link } from 'react-router-dom'

export default function UserLink({ userId }: { userId: string }) {
  return (
    <Link className="user-link" to={`/user/${userId}`}>
      {userId}
    </Link>
  )
}
