import React from 'react'
import ChatAside from '@/components/chats/ChatAside'

import style from '@/components/chats/chat.module.scss'

const page: React.FC = () => {
  return (
    <div className={style.first_basc}>
      <div className={style.alert}>Choose who to write to</div>
      <div className={style.mobile_users_list}>
        <ChatAside />
      </div>
    </div>
  )
}

export default page
