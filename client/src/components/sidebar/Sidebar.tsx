import React from 'react'
import Navigation from './Navigation'

import homeIcon from '/public/svg/home.svg'
import chatIcon from '/public/svg/chat.svg'
import friendIcon from '/public/svg/friend.svg'
import settingIcon from '/public/svg/setting.svg'

const Sidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { title: 'Home', path: '/', icon: homeIcon },
    { title: 'Chats', path: '/chats', icon: chatIcon },
    { title: 'Friends', path: '/friends', icon: friendIcon },
    { title: 'Setting', path: '/setting', icon: settingIcon },
  ]
  return <Navigation navItems={navItems} />
}

export default Sidebar
