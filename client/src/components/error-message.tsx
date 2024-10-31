import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ErrorMessage({ children }: Props) {
  if (!children) return null
  return <p className="text-sm text-red-600 font-semibold m-0">{children}</p>
}
