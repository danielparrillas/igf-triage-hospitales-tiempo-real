//  urgencia      Int           // 1: Resucitación, 2: Emergencia, 3: Urgencia, 4: Urgencia Menor, 5: Sin Urgencia
export enum UrgenciaEnum {
  Resucitacion = 1,
  Emergencia = 2,
  Urgencia = 3,
  UrgenciaMenor = 4,
  SinUrgencia = 5
}

export const UrgenciaEnumLabels = {
  [UrgenciaEnum.Resucitacion]: 'Resucitación',
  [UrgenciaEnum.Emergencia]: 'Emergencia',
  [UrgenciaEnum.Urgencia]: 'Urgencia',
  [UrgenciaEnum.UrgenciaMenor]: 'Urgencia Menor',
  [UrgenciaEnum.SinUrgencia]: 'Sin Urgencia'
}

export const UrgenciaMinutesWaitingTime = {
  [UrgenciaEnum.Resucitacion]: 0,
  [UrgenciaEnum.Emergencia]: 15,
  [UrgenciaEnum.Urgencia]: 60,
  [UrgenciaEnum.UrgenciaMenor]: 120,
  [UrgenciaEnum.SinUrgencia]: 240
}

export const UrgenciaColor = {
  [UrgenciaEnum.Resucitacion]: '#dc2626',
  [UrgenciaEnum.Emergencia]: '#ea580c',
  [UrgenciaEnum.Urgencia]: '#ca8a04',
  [UrgenciaEnum.UrgenciaMenor]: '#16a34a',
  [UrgenciaEnum.SinUrgencia]: '#2563eb'
}
