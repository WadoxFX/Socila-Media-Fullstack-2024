import { customAxios } from '../customAxios'
import { mutate } from 'swr'

export const subscribe = async (userId: string, meId: string) => {
  try {
    await customAxios.put(`/user/subscribe`, { meId, userId })
    mutate(`/user/statistic/${userId}`)
  } catch (error: any) {
    return console.error('Subscription error:', error.response.data.message)
  }
}
