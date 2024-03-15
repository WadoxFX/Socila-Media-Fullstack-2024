import { customAxios } from '@/api/customAxios'
import { Metadata } from 'next'

export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  const chatId = id

  const response = await customAxios<Omit<UserData, 'desc' | 'email'>[]>(`/chat/companion/${chatId}`)
  const user: Omit<UserData, 'desc' | 'email'>[] = response.data

  return {
    title: `Chat ${user[0].username} and ${user[1].username}`,
  }
}

export default function RootLayout({ children }: Children) {
  return <>{children}</>
}
