import React from 'react'

import style from '@/components/ui/sceleton/sceleton.module.scss'

const SManipulator: React.FC = () => {
  return (
    <div className={style.manipulation_container}>
      <div className={style.buttons_container}>
        <div className={style.buttons}>
          <div className={style.button}></div>
          <div className={style.button}></div>
        </div>
        <div className={style.button}></div>
      </div>
      <div className={style.likes}></div>
      <div className={style.time}></div>
    </div>
  )
}

export default SManipulator
