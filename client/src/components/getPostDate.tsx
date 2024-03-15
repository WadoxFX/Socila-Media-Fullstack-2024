import { intlFormatDistance } from 'date-fns'

export const getPostDate = (commentDate: Date) => {
  const date = intlFormatDistance(new Date(commentDate), new Date(), {
    locale: 'ua',
  })
  return date
}
