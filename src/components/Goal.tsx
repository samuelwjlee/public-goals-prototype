import { useParams } from 'react-router-dom'
import { FETCH_GOALS_URL } from '../constants/urls'
import { useFetch } from '../hooks/api-hook'
import Loader from './Loader'

export default function Goal() {
  const [goal, isLoading] = useFetch(`${FETCH_GOALS_URL}/${useParams().id}`)
  return <Loader isLoading={isLoading}>{goal?.description}</Loader>
}
