import {
  UrgenciaColor,
  UrgenciaEnum,
  UrgenciaEnumLabels
} from '../types/urgenciaEnum'

interface Props {
  urgencia: UrgenciaEnum
}

export default function UrgenciaBadge({ urgencia }: Props) {
  return (
    <span
      style={{
        backgroundColor: UrgenciaColor[urgencia]
      }}
      className="px-2 py-1 text-white rounded-full font text-xs text-center text-nowrap"
    >
      {UrgenciaEnumLabels[urgencia]}
    </span>
  )
}
