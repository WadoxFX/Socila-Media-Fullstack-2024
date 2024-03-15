'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Categorie from '@/components/setting/Categorie'
import Button from '@/components/ui/button/Button'

import style from '@/components/setting/setting.module.scss'

const Page: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean | null>(null)

  useEffect(() => {
    const storage = localStorage.getItem('showNotices')

    storage ? setIsOn(JSON.parse(storage)) : setIsOn(true)
  }, [])

  const updateMessage = (): void => {
    localStorage.setItem('showNotices', JSON.stringify(isOn))
  }
  return (
    <div className={style.container}>
      <form className={style.settings}>
        <Categorie title="Messages" />

        <div className={style.display_messages}>
          <div className={style.more_information}>
            <div className={style.more_information_title}>Pop-up notifications</div>
            <p className={style.more_information_text}>
              Do you want to see notifications in a pop-up window?
            </p>
          </div>
          {isOn !== null ? (
            <div className={style.switch} data-ison={isOn} onClick={() => setIsOn((prev) => !prev)}>
              <motion.div className={style.handle} layout transition={spring} />
            </div>
          ) : (
            '...'
          )}
        </div>

        <div className={style.update_profile_btn}>
          <Button
            onClick={updateMessage}
            data_cy_name="updateMessages"
            color="white"
            background="black"
            padding="large"
            borderRadius="8px"
          >
            Update messages
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Page

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}
