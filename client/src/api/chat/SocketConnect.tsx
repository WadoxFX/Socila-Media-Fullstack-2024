'use client'

import React, { useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'

import { io } from 'socket.io-client'
export const socket = io(`${process.env.serverUrl}`)

const SocketConnect: React.FC<Children> = ({ children }) => {
  const userId: string = useAppSelector((state) => state.user.userData._id)

  useEffect(() => {
    if (userId) {
      socket.emit('login', { userId: userId })
    }
  }, [userId])

  return <>{children}</>
}

export default SocketConnect
