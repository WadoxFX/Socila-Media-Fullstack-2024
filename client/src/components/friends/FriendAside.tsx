'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import loupeIcon from '/public/svg/userLoupe.svg'
import friendsIcon from '/public/svg/friends.svg'
import userAddIcon from '/public/svg/userAdd.svg'

import style from '@/components/friends/friends.module.scss'

const FriendAside: React.FC = () => {
  const friendPages: FriendCategory[] = [
    { title: 'Find', path: '/friends', icon: loupeIcon },
    { title: 'Friend requests', path: '/friends/request', icon: userAddIcon },
    { title: 'My friends', path: '/friends/myList', icon: friendsIcon },
  ]
  return (
    <>
      <div className={style.aside_friends_title}>Friends</div>

      <ul className={style.categories}>
        {friendPages.map((setting: SettingCategory, id: number) => {
          const path = usePathname()
          return (
            <li key={id}>
              <Link
                href={setting.path}
                className={
                  path === setting.path ? style.active_friends_categorie : style.setting_categorie
                }
              >
                <Image src={setting.icon} width={24} height={24} alt={setting.title} />
                <div className={style.categorie_title}>{setting.title}</div>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default FriendAside
