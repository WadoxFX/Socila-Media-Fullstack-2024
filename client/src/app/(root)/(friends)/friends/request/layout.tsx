import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Friends request',
  description: 'Manage friend requests from other users',
  keywords: 'friends request, friend, users, add in friends, reject the request',
}

export default function RootLayout({ children }: Children) {
  return <>{children}</>
}
