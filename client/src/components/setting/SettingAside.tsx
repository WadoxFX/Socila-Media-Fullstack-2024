'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import userIcon from '/public/svg/user.svg'
import bellIcon from '/public/svg/bell.svg'

import style from './setting.module.scss'

const SettingAside: React.FC = () => {
  const settings: SettingCategory[] = [
    { title: 'Edit profile', path: '/setting', icon: userIcon },
    { title: 'Messages', path: '/setting/messages', icon: bellIcon },
  ]

  return (
    <>
      <div className={style.aside_setting_title}>Settings</div>

      <ul className={style.categories}>
        {settings.map((setting: SettingCategory, id: number) => {
          const path = usePathname()
          return (
            <li key={id}>
              <Link
                href={setting.path}
                className={
                  path === setting.path ? style.active_setting_categorie : style.setting_categorie
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

export default SettingAside
