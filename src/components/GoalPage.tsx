import { useParams } from 'react-router-dom'
import { postUserComment, useFetchComments, useFetchGoal } from '../api-client'
import GoalDescription from './GoalDescription'
import UserBubble from './UserBubble'
import Loader from './Loader'
import BackLink from './BackLink'
import { useRef, useState } from 'react'

export default function GoalPage() {
  const goalId = useParams().id as string
  const goal = useFetchGoal(goalId)
  const newUserComment = useRef('')
  const comments = useFetchComments(goalId)
  const [isInputFilled, setIsInputFilled] = useState(false)

  return (
    <div className="goal-page">
      <Loader isLoading={goal.isLoading}>
        <BackLink destinationText="home" destinationUrl="/" />
        {goal.data && (
          <div className="goal-page-content">
            <GoalDescription goalData={goal.data} />
          </div>
        )}
      </Loader>
      <div className="comment-form">
        <div
          onInput={(e) => {
            newUserComment.current = e.currentTarget.textContent ?? ''
          }}
          onBlur={() => {
            if (!newUserComment.current) {
              setIsInputFilled(false)
            }
          }}
          onFocus={() => {
            if (!isInputFilled) {
              setIsInputFilled(true)
            }
          }}
          className={
            isInputFilled ? 'comment-input' : 'comment-input-placeholder'
          }
          contentEditable
        >
          {!isInputFilled && 'Add a comment'}
        </div>
        {isInputFilled && (
          <button
            className="comment-button"
            onClick={() => {
              postUserComment(newUserComment.current, goalId, 'samuelwjlee')
              setIsInputFilled(false)
              newUserComment.current = ''
            }}
          >
            Comment
          </button>
        )}
      </div>
      <Loader isLoading={comments.isLoading}>
        {comments.data && (
          <div className="goal-page-comments-section">
            {comments.data?.map((comment) => (
              <div className="goal-page-comment" key={comment.id}>
                <div className="comment-header">
                  <UserBubble userId={comment.userId} />
                  <p>on {comment.createdAt}</p>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </Loader>
    </div>
  )
}
