import { Link } from 'react-router-dom'

type Props = {
  destinationText: string
  destinationUrl: string
}

export default function BackLink({ destinationText, destinationUrl }: Props) {
  return (
    <Link className="back-link" to={destinationUrl}>
      ← Go back {destinationText}
    </Link>
  )
}
