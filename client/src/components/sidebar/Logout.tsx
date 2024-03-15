import React from 'react'
import Image from 'next/image'
import { logout } from '@/api/auth/logout'

import logoutIcon from '/public/svg/door.svg'

import style from './sidebar.module.scss'

const Logout: React.FC<NavState> = ({ addition }) => {
  return (
    <div className={style.logout} onClick={logout}>
      <Image src={logoutIcon} width={24} height={24} alt="Log out" />
      <div className={addition ? style.none_nav_title : style.nav_title}>Log out</div>
    </div>
  )
}

export default Logout
