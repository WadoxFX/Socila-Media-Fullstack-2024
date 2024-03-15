import { customAxios } from '../customAxios'

export const userChatValid = async (chatId: string) => {
  try {
    const res = await customAxios<boolean>(`/chat/valid/${chatId}`)
    return res.data
  } catch (error) {
    return false
  }
}
