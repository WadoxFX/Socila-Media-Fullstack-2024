import { mutate } from 'swr'
import { customAxios } from '../customAxios'

export const recallFriend = async (userId: string, meId: string) => {
  try {
    await customAxios.put(`/user/recallFriend`, { meId, userId })
    mutate(`/user/statistic/${userId}`)
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
