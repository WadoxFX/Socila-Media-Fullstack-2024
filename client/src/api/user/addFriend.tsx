import { mutate } from 'swr'
import { customAxios } from '../customAxios'

export const addFriend = async (userId: string, meId: string) => {
  try {
    await customAxios.put(`/user/addFriend`, { meId, userId })
    mutate(`/user/statistic/${userId}`)
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
