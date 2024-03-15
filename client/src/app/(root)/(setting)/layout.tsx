import Accordion from '@/components/ui/accordion/Accordion'
import { Metadata } from 'next'

import userIcon from '/public/svg/user.svg'
import bellIcon from '/public/svg/bell.svg'

import style from '@/components/setting/setting.module.scss'

export const metadata: Metadata = {
  title: 'Setting',
  description: 'Change your account details specifically for yourself',
}

export default function RootLayout({ children }: Children) {
  const settingPages: SettingCategory[] = [
    { title: 'Edit profile', path: '/setting', icon: userIcon },
    { title: 'Messages', path: '/setting/messages', icon: bellIcon },
  ]
  return (
    <div className={style.container}>
      <div className={style.setting}>
        <Accordion accordionPages={settingPages} />
        {children}
      </div>
    </div>
  )
}
