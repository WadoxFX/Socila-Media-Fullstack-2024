import React from 'react'

import style from '@/components/ui/sceleton/sceleton.module.scss'

const SComments: React.FC = () => {
  const quantity: number[] = [...new Array(6)]
  return (
    <ul className={style.comments_sceleton_container}>
      {quantity.map((_, id: number) => (
        <li key={id}>
          <div className={style.sceleton_comment_avatar_container}>
            <div className={style.sceleton_comment_avatar}></div>
          </div>
          <div className={style.sceleton_comment}>
            <div className={style.sceleton_comment_fullname}></div>
            <div className={style.sceleton_comment_content}></div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SComments
