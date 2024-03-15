import { mutate } from 'swr'
import { customAxios } from '../customAxios'

export const addComment = async (props: PropsAddComment) => {
  try {
    await customAxios.put('/post/addComment', { ...props })
    mutate(`/post/comments/${props.postId}`)
  } catch (error: any) {
    return console.error('Error', error.response.data.message)
  }
}
