import { mutate } from 'swr'
import { customAxios } from '../customAxios'

export const confirmFriend = async (meId: string, userId: string) => {
  try {
    await customAxios.put(`/user/confirmFriend`, { meId, userId })
    mutate(`/user/request/${meId}`)
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
