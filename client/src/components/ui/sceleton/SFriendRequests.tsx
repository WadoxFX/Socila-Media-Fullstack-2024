import React from 'react'

import style from '@/components/ui/sceleton/sceleton.module.scss'

const SFriendRequests: React.FC = () => {
  const quantity: number[] = [...new Array(6)]
  return (
    <ul className={style.requests_list}>
      {quantity.map((_, id) => (
        <li key={id}>
          <div className={style.avatar}></div>
          <div className={style.user_info}>
            <div className={style.full_name}></div>
            <div className={style.desc}></div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SFriendRequests
