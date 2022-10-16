import { Link } from 'react-router-dom'
import { GoalData } from '../api-client'
import UserLink from './UserLink'

export default function GoalDescription({ goalData }: { goalData: GoalData }) {
  return (
    <div className="goal-description">
      <UserLink userId={goalData.userId} />
      's goal is to{' '}
      <Link className="emphasized-goal-attr" to={`/${goalData?.id}`}>
        {goalData?.what}
      </Link>{' '}
      no later than {goalData?.when}.
    </div>
  )
}
