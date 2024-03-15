import { customAxios } from '../customAxios'
import { mutate } from 'swr'

export const unsubscribe = async (userId: string, meId: string) => {
  try {
    await customAxios.put(`/user/unsubscribe`, { meId, userId })
    mutate(`/user/statistic/${userId}`)
  } catch (error: any) {
    return console.error('Subscription cancellation error:', error.response.data.message)
  }
}
