import { useParams } from 'react-router-dom'
import { CommentData } from '../constants/types'
import { FETCH_GOALS_URL, FETCH_COMMENTS_URL } from '../constants/urls'
import { useFetch } from '../hooks/api-hook'
import Loader from './Loader'

export default function Goal() {
  const goalId = useParams().id
  const [goal, isGoalLoading] = useFetch(`${FETCH_GOALS_URL}/${goalId}`)
  const [comments, isCommentsLoading] = useFetch(
    `${FETCH_COMMENTS_URL}?goalId=${goalId}`
  )
  return (
    <Loader isLoading={isGoalLoading || isCommentsLoading}>
      <>
        <h3>{goal?.description}</h3>
        <div>
          {comments?.map((comment: CommentData) => (
            <>
              {comment.text}
              <br />
              by {comment.userId}
            </>
          ))}
        </div>
      </>
    </Loader>
  )
}
