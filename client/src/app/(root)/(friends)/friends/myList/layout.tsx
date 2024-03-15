import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My friends',
  description: 'List of your friends',
  keywords: 'my friends, friends, users, friends list',
}

export default function RootLayout({ children }: Children) {
  return <>{children}</>
}
