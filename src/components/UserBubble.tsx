import { Link } from 'react-router-dom'

export default function UserBubble({
  userId,
  withAvatar,
}: {
  userId: string
  withAvatar?: boolean
}) {
  return (
    <Link className="user-bubble-link" to={`/user/${userId}`}>
      {withAvatar && '👨🏻‍💻 '}
      {userId}
    </Link>
  )
}
