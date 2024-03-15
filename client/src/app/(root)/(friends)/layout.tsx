import Accordion from '@/components/ui/accordion/Accordion'
import { Metadata } from 'next'

import loupeIcon from '/public/svg/userLoupe.svg'
import friendsIcon from '/public/svg/friends.svg'
import userAddIcon from '/public/svg/userAdd.svg'

import style from '@/components/friends/friends.module.scss'

export const metadata: Metadata = {
  title: 'Friends',
  description: 'Find new acquaintances or your old friends',
  keywords: 'friends, people, users, find frends, most popular',
}

export default function RootLayout({ children }: Children) {
  const friendPages: FriendCategory[] = [
    { title: 'Find', path: '/friends', icon: loupeIcon },
    { title: 'Friend requests', path: '/friends/request', icon: userAddIcon },
    { title: 'My friends', path: '/friends/myList', icon: friendsIcon },
  ]
  return (
    <div className={style.friends_container}>
      <div className={style.friends}>
        <Accordion accordionPages={friendPages} />
        {children}
      </div>
    </div>
  )
}
