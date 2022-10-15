import { GoalData } from '../api-client'
import UserBubble from './UserBubble'

export default function GoalDescription({ goalData }: { goalData: GoalData }) {
  return (
    <div className="goal-description">
      <UserBubble userId={goalData.userId} /> 's goal is to{' '}
      <a className="emphasized-goal-attr" href={`/${goalData?.id}`}>
        {goalData?.what}
      </a>{' '}
      no later than {goalData?.when}.
    </div>
  )
}
