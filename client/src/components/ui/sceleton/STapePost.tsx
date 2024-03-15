import React from 'react'

import style from '@/components/ui/sceleton/sceleton.module.scss'

const STapePost: React.FC = () => {
  const quantity: number[] = [...new Array(3)]
  return (
    <ul className={style.tape_posts}>
      {quantity.map((_, id: number) => (
        <li key={id} className={style.tape_post}>
          <div className={style.header}>
            <div className={style.user}>
              <div className={style.avatar}></div>
              <div className={style.fullname}></div>
            </div>
            <div className={style.time}></div>
          </div>

          <div className={style.slider}></div>

          <div className={style.tape_controllers}>
            <div className={style.tape_controllers_left}>
              <div className={style.button}></div>
              <div className={style.button}></div>
            </div>
            <div className={style.button}></div>
          </div>

          <div className={style.likes}></div>
          <div className={style.desc}></div>
        </li>
      ))}
    </ul>
  )
}

export default STapePost
