import React from 'react'
import Image from 'next/image'
import { dateHandler } from '../dateHandler'
import { motion } from 'framer-motion'

import Avatar from '/public/avatar.jpeg'

import style from '@/components/chats/chat.module.scss'

const MessageSchema: React.FC<PropsMessage> = ({ message, meData }) => {
  return (
    <motion.li
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={message.creator._id === meData._id ? style.me_message : style.user_message}
    >
      <div className={style.message_container}>
        <Image
          className={style.user_icon}
          src={
            message.creator.avatar ? `${process.env.serverUrl}${message.creator.avatar}` : Avatar
          }
          width={100}
          height={100}
          alt="User avatar"
        />
        <div className={style.message_info}>
          <p>{message.content}</p>
          <time>{dateHandler(message.createAt)}</time>
        </div>
      </div>
    </motion.li>
  )
}

export default MessageSchema
