import { customAxios } from '@/api/customAxios'

export const getCompanion = async (
  chatId: string,
  meId: string,
  setCompanion: (companion: Companion) => void,
) => {
  try {
    if (meId) {
      const companion = await customAxios(`/chat/companion/${chatId}`, { params: { meId } })
      setCompanion(companion.data)
    }
  } catch (error) {
    return console.error('Failed to get user data')
  }
}
