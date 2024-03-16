'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'

import avatarIcon from '/public/avatar.jpeg'

import style from './sidebar.module.scss'

const Profile: React.FC<NavState> = ({ addition }) => {
  const path: string = usePathname()
  const meData: UserData = useAppSelector((state) => state.user.userData)
  return (
    <li>
      <Link
        data-cy={meData._id && 'profile'}
        href={meData._id ? `/profile/${meData._id}` : '/'}
        className={path === `/profile/${meData._id}` ? style.active_item : style.item}
      >
        <Image
          className={style.user_icon}
          src={meData.avatar ? `https://social-media-server-ashy.vercel.app/${meData.avatar}` : avatarIcon}
          width={100}
          height={100}
          alt="Avatar"
        />
        <div className={addition ? style.none_nav_title : style.nav_title}>
          {meData.username || 'loading...'}
        </div>
      </Link>
    </li>
  )
}

export default Profile
