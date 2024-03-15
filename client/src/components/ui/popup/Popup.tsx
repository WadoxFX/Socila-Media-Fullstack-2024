'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { socket } from '@/api/chat/SocketConnect'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

import avatarIcon from '/public/avatar.jpeg'
import closeIcon from '/public/svg/close.svg'

import style from './popup.module.scss'

const Popup: React.FC = () => {
  const [message, setMessage] = useState<Message | null>()

  useEffect(() => {
    socket.on('popup_message', (data: Message) => {
      setMessage(data)
    })
  }, [socket])

  const closePopup = () => setMessage(null)

  const path: string = usePathname()
  if (typeof window !== 'undefined') {
    const showNotices: string | null = localStorage.getItem('showNotices')

    if (showNotices === 'false') {
      return null
    }

    if (message && path === `/chats/${message.room}`) {
      setMessage(null)
    }
  }

  return <Message message={message} path={path} closePopup={closePopup} />
}

export default Popup

const Message: React.FC<UIPopup> = ({ message, path, closePopup }) => {
  if (typeof window === 'undefined') return null
  const [mobile, setMobile] = useState<boolean>(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return createPortal(
    <AnimatePresence>
      {message && path !== `/chats/${message.room}` && (
        <motion.div
          initial={{ y: mobile ? -100 : 200 }}
          animate={{ y: mobile ? 0 : 0 }}
          exit={{ y: mobile ? -200 : 200 }}
          transition={{ times: 2, damping: 10 }}
          className={style.message_container}
        >
          <Link href={`/chats/${message.room}`} className={style.message}>
            <Image
              className={style.user_icon}
              src={
                message.creator.avatar
                  ? `${process.env.serverUrl}${message.creator.avatar}`
                  : avatarIcon
              }
              width={140}
              height={140}
              alt="User avatar"
              priority
            />
            <div className={style.message_info}>
              <div className={style.full_name}>
                {message.creator.username} {message.creator.surname}
              </div>
              <div className={style.text}>{message.content}</div>
            </div>
          </Link>
          <button className={style.close_message} onClick={closePopup}>
            <Image
              className={style.close_icon}
              src={closeIcon}
              width={18}
              height={18}
              alt="Close popup"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
