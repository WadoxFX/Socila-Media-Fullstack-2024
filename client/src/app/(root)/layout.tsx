import ReduxChecker from '@/api/auth/ReduxChecker'
import AuthChecker from '@/api/auth/AuthChecker'
import Sidebar from '@/components/sidebar/Sidebar'
import Providers from '@/store/Providers'
import SocketConnect from '@/api/chat/SocketConnect'
import Popup from '@/components/ui/popup/Popup'
import { Metadata } from 'next'

import style from '@/styles/root.module.scss'

export const metadata: Metadata = {
  title: 'Home',
  description: 'A feed of posts that you can manage yourself',
  keywords: 'posts, users, friends, news, world, tape news, images, videos, people',
}

export default function RootLayout({ children }: Children) {
  return (
    <AuthChecker>
      <Providers>
        <ReduxChecker>
          <main className={style.container}>
            <SocketConnect>
              <Sidebar />
              {children}
              <Popup />
            </SocketConnect>
          </main>
        </ReduxChecker>
      </Providers>
    </AuthChecker>
  )
}
