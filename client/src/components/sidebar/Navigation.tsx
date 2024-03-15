'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logout from './Logout'
import Profile from './Profile'
import Modal from '../ui/modal/Modal'
import Creating from '../ui/modal/modules/Creating'
import FriendAside from '../friends/FriendAside'
import SettingAside from '../setting/SettingAside'
import ChatAside from '../chats/ChatAside'
import { usePathname } from 'next/navigation'

import plusIcon from '/public/svg/plus.svg'

import style from './sidebar.module.scss'

const Navigation: React.FC<NavItems> = ({ navItems }) => {
  const path: string = usePathname()
  const addition: boolean =
    path.startsWith('/setting') || path.startsWith('/chats') || path.startsWith('/friends')

  return (
    <aside className={style.container}>
      <nav>
        <div className={style.nav_content}>
          <ul className={style.nav_items}>
            {navItems.map((item: NavItem, id: number) => (
              <li key={id}>
                <Link
                  href={item.path}
                  data-cy={item.title}
                  className={path === item.path ? style.active_item : style.item}
                >
                  <Image src={item.icon} width={24} height={24} alt={item.title} />
                  <div className={addition ? style.none_nav_title : style.nav_title}>
                    {item.title}
                  </div>
                </Link>
              </li>
            ))}
            <Modal module={<Creating />}>
              <div className={style.creating_post_button}>
                <Image src={plusIcon} width={24} height={24} alt="Create post" />
                <div className={addition ? style.none_nav_title : style.nav_title}>Create</div>
              </div>
            </Modal>
            <Profile addition={addition} />
          </ul>
          <Logout addition={addition} />
        </div>

        {!!addition && (
          <div className={style.aside_addition}>
            {path.startsWith('/setting') && <SettingAside />}
            {path.startsWith('/friends') && <FriendAside />}
            {path.startsWith('/chat') && <ChatAside />}
          </div>
        )}
      </nav>
    </aside>
  )
}

export default Navigation
