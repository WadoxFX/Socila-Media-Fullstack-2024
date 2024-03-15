import { Inter } from 'next/font/google'
import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children}: Children) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
