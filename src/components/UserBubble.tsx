export default function UserBubble({ userId }: { userId: string }) {
  return (
    <a className="user-bubble-button" href={`/user/${userId}`}>
      👨🏻‍💻 {userId}
    </a>
  )
}
