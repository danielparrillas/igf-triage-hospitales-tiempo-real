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
      className="text-sm px-2 py-1 text-white rounded-full font-semibold text-center"
    >
      {UrgenciaEnumLabels[urgencia]}
    </span>
  )
}
