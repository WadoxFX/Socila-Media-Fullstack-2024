import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chats',
  description: 'List of your chats',
  keywords: 'friends, chat, users, people, communication, write a message',
}

export default function RootLayout({ children }: Children) {
  return <>{children}</>
}
