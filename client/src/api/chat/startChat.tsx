'use server'

import { customAxios } from '../customAxios'
import { redirect } from 'next/navigation'

export const startChat = async (userId: string, meId: string) => {
  const response = await customAxios.post(`/chat/start/${userId}`, { meId })
  if (response) {
    redirect(`/chats/${response.data.chatId}`)
  }
}
