export const getLocalDateTimestamp = (date?: string) => {
  const now = date ? new Date(date) : new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(Number(now) - offset).toISOString().slice(0, 16)
}

export function formatLocalDateTime(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses son 0-indexados, por eso se suma 1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}
