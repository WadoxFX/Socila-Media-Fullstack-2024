import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { customAxios } from '../customAxios'

const AuthChecker: React.FC<Children> = async ({ children }) => {
  try {
    const cookie = cookies().get('token')
    await customAxios(`/auth/account?token=${cookie?.value}`)
  } catch (error) {
    redirect('/login')
  }
  return <>{children}</>
}

export default AuthChecker
