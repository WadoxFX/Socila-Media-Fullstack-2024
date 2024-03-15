export const numConverter = (num: number): string => {
  if (num >= 1000 && num < 1000000) {
    const thousands = (num / 1000).toFixed(1)
    return `${thousands}K`
  } else if (num >= 1000000 && num < 1000000000) {
    const millions = (num / 1000000).toFixed(1)
    return `${millions}M`
  } else if (num >= 1000000000) {
    const billions = (num / 1000000000).toFixed(1)
    return `${billions}B`
  }
  return num.toString()
}
