'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import UserMessage from '@/components/chats/UserMessage'
import { socket } from '@/api/chat/SocketConnect'
import { useAppSelector } from '@/store/hooks'
import { getCompanion } from '@/api/chat/getCompanion'
import { messageList } from '@/api/chat/messageList'
import { userChatValid } from '@/api/chat/userChatValid'
import { useRouter } from 'next/navigation'

import avatarIcon from '/public/avatar.jpeg'
import sendIcon from '/public/svg/send.svg'

import style from '@/components/chats/chat.module.scss'

const page: React.FC<Params> = ({ params: { id } }) => {
  const meData: UserData = useAppSelector((state) => state.user.userData)
  const [companion, setCompanion] = useState<Companion | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [areaHeight, setAreaHeight] = useState<number>(20)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    ;(async function () {
      const userValid = await userChatValid(id)
      if (!userValid) router.push('/')
    })()

    socket.emit('join_room', { room: id })
    ;(async function () {
      const messages: Message[] = await messageList(id)
      setMessages((prev: Message[]) => [...prev, ...messages])
    })()
  }, [id])

  const scrollToBottom = (): void => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    ;(async () => {
      await getCompanion(id, meData._id, setCompanion)
    })()
  }, [meData])

  const sendMessage = (): void => {
    const data: Message = {
      room: id,
      content,
      creator: meData,
      userId: companion!._id,
      createAt: Date.now(),
    }

    if (content.length) {
      socket.emit('send_message', data)
      setMessages((prev: Message[]) => [...prev, data])
      setContent('')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value)
    setAreaHeight(e.target.scrollHeight)
    activity()
  }

  const activity = (): void => {
    socket.emit('typing', { room: id })
  }

  const getCompanionStatus = (): void => {
    socket.emit('companion_status', { room: id })
  }

  useEffect(() => {
    let timer: NodeJS.Timeout

    socket.on('is_typing', (data: boolean) => {
      setIsTyping(data)
      clearTimeout(timer)
      timer = setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    })

    socket.on('get_message', (data: Message) => {
      setMessages((prev: Message[]) => [...prev, data])
      setIsTyping(false)
    })

    socket.on('status', (status: boolean) => {
      setStatus(status)
      getCompanionStatus()
    })

    socket.on('update_status', (status: boolean) => {
      setStatus(status)
    })
  }, [socket])

  return (
    <div className={style.basc}>
      <div className={style.container}>
        {companion ? (
          <Link className={style.companion_info} href={`/profile/${companion._id}`}>
            <div className={style.user_status}>
              <Image
                className={style.user_icon}
                src={companion.avatar ? `${process.env.serverUrl}${companion.avatar}` : avatarIcon}
                width={100}
                height={100}
                alt="User avatar"
              />
              {status ? (
                <div className={style.online_status}></div>
              ) : (
                <div className={style.ofline_status}></div>
              )}
            </div>
            <div className={style.user_info}>
              <div className={style.full_name}>
                {companion.username} {companion.surname}
              </div>
              <div className={style.user_status}>
                {isTyping ? 'is typing...' : <>{status ? 'online' : 'ofline'}</>}
              </div>
            </div>
          </Link>
        ) : null}
      </div>
      <div className={style.mobile_header_container}></div>

      <ul className={style.messages}>
        {messages.map((message: Message, id: number) => (
          <UserMessage message={message} meData={meData} key={id} />
        ))}
        <div ref={messagesEndRef}></div>
      </ul>

      <form className={style.controller}>
        <div className={style.data_message}>
          <textarea
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={content}
            style={{ height: `${content ? `${areaHeight}px` : '20px'}` }}
            placeholder="Your message..."
          />
        </div>
        <button onClick={sendMessage} type="button" className={style.send_message}>
          <Image src={sendIcon} width={32} height={32} alt="Send message" />
        </button>
      </form>
    </div>
  )
}

export default page
