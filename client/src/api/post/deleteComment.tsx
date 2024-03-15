import { mutate } from 'swr'
import { customAxios } from '../customAxios'

export const deleteComment = async (postId: string, commentId: string) => {
  try {
    await customAxios.delete('/post/deleteComment', { data: { postId, commentId } })
    mutate(`/post/comments/${postId}`)
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
