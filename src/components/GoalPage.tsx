import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { postUserComment, useFetchComments, useFetchGoal } from '../api-client'
import GoalDescription from './GoalDescription'
import UserLink from './UserLink'
import Loader from './Loader'
import BackLink from './BackLink'

export default function GoalPage() {
  const goalId = useParams().goalId ?? ''
  const goal = useFetchGoal(goalId)
  const comments = useFetchComments(goalId)
  const [userComment, setUserComment] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <div className="goal-page">
      <BackLink destinationText="home" destinationUrl="/" />
      <Loader isLoading={goal.isLoading}>
        {goal.data && (
          <div className="goal-page-content">
            <GoalDescription goalData={goal.data} />
          </div>
        )}
      </Loader>
      <div className="comment-form">
        <div
          onInput={(e) => {
            setUserComment(e.currentTarget.textContent ?? '')
          }}
          onBlur={() => {
            if (!userComment) {
              setIsInputFocused(false)
            }
          }}
          onFocus={() => {
            if (!isInputFocused) {
              setIsInputFocused(true)
            }
          }}
          className={
            isInputFocused ? 'comment-input' : 'comment-input-placeholder'
          }
          contentEditable
          suppressContentEditableWarning
        >
          {!isInputFocused && 'Add a comment'}
        </div>
        {isInputFocused && userComment && (
          <button
            className="comment-button"
            onClick={() => {
              setUserComment('')
              setIsInputFocused(false)
              postUserComment(
                userComment,
                goalId,
                goal.data?.userId ?? '',
                comments.refetch
              )
            }}
          >
            Comment
          </button>
        )}
      </div>
      <Loader isLoading={comments.isLoading}>
        <div className="goal-page-comments-section">
          {comments.data.map((comment) => (
            <div className="goal-page-comment" key={comment.id}>
              <div className="comment-header">
                <UserLink userId={comment.userId} />
                <p>on {comment.createdAt}</p>
              </div>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </Loader>
    </div>
  )
}
