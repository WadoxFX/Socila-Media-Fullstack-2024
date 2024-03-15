'use client'

import React, { useEffect } from 'react'

import { useAppDispatch } from '@/store/hooks'
import { fetchUser } from '@/store/slices/userSlice'

const ReduxChecker: React.FC<Children> = ({ children }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return <>{children}</>
}

export default ReduxChecker
