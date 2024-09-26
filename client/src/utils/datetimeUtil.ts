export const getLocalDateTimestamp = (date?: string) => {
  const now = date ? new Date(date) : new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(Number(now) - offset).toISOString().slice(0, 16)
}
