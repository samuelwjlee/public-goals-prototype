type Props = {
  children: React.ReactNode
  isLoading: boolean
}

export default function Loader({ children, isLoading }: Props) {
  return isLoading ? <>Loading...</> : <>{children}</>
}
