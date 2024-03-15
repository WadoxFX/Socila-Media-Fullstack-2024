export const dateHandler = (date: Date): string => {
  const unixDate = new Date(date)
  const option = Intl.DateTimeFormat('ua', { hour: '2-digit', minute: '2-digit' })
  return option.format(unixDate)
}
