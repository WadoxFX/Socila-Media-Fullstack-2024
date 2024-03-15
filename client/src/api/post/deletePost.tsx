import { customAxios } from '../customAxios'

export const deletePost = async (postId: string) => {
  try {
    await customAxios.delete('/post/delete', { data: { postId } })
    return window.location.reload()
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
