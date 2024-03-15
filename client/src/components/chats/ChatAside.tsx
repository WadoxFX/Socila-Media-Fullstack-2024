'use client'

import React, { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector } from '@/store/hooks'
import { usePathname } from 'next/navigation'
import { leaveChat } from '@/api/chat/leaveChat'
import { fetcher } from '@/api/fetcher'
import { useForm } from 'react-hook-form'

import avatarIcon from '/public/avatar.jpeg'
import loupeIcon from '/public/svg/userLoupe.svg'
import leaveIcon from '/public/svg/close.svg'

import style from '@/components/chats/chatAside.module.scss'

const ChatAside: React.FC = () => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const { data, error } = useSWR<Chat[]>(meId ? `/chat/list/${meId}` : null, fetcher)
  const { register, handleSubmit } = useForm<ChatFormValues>({
    defaultValues: {
      text: '',
    },
  })

  const [search, setSearch] = useState<string>('')
  const path: string = usePathname()

  if (error) return null
  if (!data) return <p>Loading...</p>

  const chats: Chat[] = data.filter((chat: Chat) => {
    const user: ChatUser = chat.users.find((user: ChatUser) => user._id !== meId)
    return user.username.concat(' ', user.surname).includes(search.toLocaleLowerCase())
  })

  return (
    <div className={style.chat_aside_container}>
      <form onSubmit={handleSubmit((data: ChatFormValues) => setSearch(data.text))}>
        <input placeholder="Username or surname" {...register('text')} />
        <button>
          <Image src={loupeIcon} width={24} height={24} alt="Leave chat" />
        </button>
      </form>
      <ul className={style.users_list}>
        {!chats.length && <p className={style.no_chats}>There are no users</p>}
        {chats.map((chat: Chat) => {
          const user: ChatUser = chat.users.find((user: ChatUser) => user._id !== meId)
          return (
            <li key={chat._id}>
              <Link
                onClick={() => setSearch('')}
                href={`/chats/${chat._id}`}
                className={path === `/chats/${chat._id}` ? style.user_active : style.user}
              >
                <Image
                  className={style.user_icon}
                  src={user.avatar ? `${process.env.serverUrl}${user.avatar}` : avatarIcon}
                  width={100}
                  height={100}
                  quality={100}
                  alt={`${user.username} ${user.surname}`}
                  priority
                />
                <div className={style.user_info}>
                  <div className={style.full_name}>
                    <div>
                      {user.username} {user.surname}
                    </div>
                  </div>
                  <div className={style.last_message}>
                    {chat.messages && chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].content
                      : 'No message'}
                  </div>
                </div>
              </Link>
              <button className={style.leave_chat} onClick={() => leaveChat(chat._id, meId)}>
                <Image src={leaveIcon} width={12} height={12} alt="Leave chat" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChatAside
