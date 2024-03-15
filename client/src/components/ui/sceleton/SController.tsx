import React from 'react'

import style from '@/components/ui/sceleton/sceleton.module.scss'

const SController: React.FC = () => {
  return (
    <div className={style.controller_sceleton_container}>
      <button>Subscribe</button>
      <button>Chat</button>
      <button className={style.smoll_button}>.</button>
    </div>
  )
}

export default SController
