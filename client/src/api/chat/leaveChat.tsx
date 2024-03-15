import { customAxios } from '../customAxios'
import { mutate } from 'swr'

export const leaveChat = async (chatId: string, meId: string) => {
  await customAxios.put('/chat/leave', { chatId, meId })
  mutate(`/chat/list/${meId}`)
}
