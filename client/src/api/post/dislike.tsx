import { mutate } from 'swr'
import { customAxios } from '../customAxios'

export const dislike = async (userId: string, postId: string) => {
  try {
    await customAxios.put('/post/dislike', { userId, postId })
    mutate(`/post/data/${postId}`)
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
