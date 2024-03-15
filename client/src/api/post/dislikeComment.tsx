import { mutate } from 'swr'
import { customAxios } from '../customAxios'

export const dislikeComment = async (userId: string, postId: string, commentId: string) => {
  try {
    await customAxios.put('/post/dislikeComment', { userId, postId, commentId })
    mutate(`/post/comments/${postId}`)
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
