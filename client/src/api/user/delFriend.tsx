import { mutate } from 'swr'
import { customAxios } from '../customAxios'

export const delFriend = async (meId: string, userId: string) => {
  try {
    await customAxios.put('/user/delFriend', { meId, userId })
    mutate(`/user/friends/${meId}`)
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
