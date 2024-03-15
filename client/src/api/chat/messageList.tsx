import { customAxios } from '../customAxios'

export const messageList = async (chatId: string) => {
  const messages = await customAxios<Message[]>(`/chat/messageList/${chatId}`)
  return messages.data
}
