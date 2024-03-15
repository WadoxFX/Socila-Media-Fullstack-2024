import React from 'react'
import Image from 'next/image'
import FormSignup from '@/components/auth/FormSignup'
import { Metadata } from 'next'

import backIcon from '/public/galaxy.gif'
import backMobileIcon from '/public/galaxy.png'

import style from '@/components/auth/auth.module.scss'

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Register to gain access to the site',
  keywords: 'Sign up, account',
}

const page: React.FC = () => {
  return (
    <div className={style.container}>
      <Image
        className={style.back}
        src={backIcon}
        width={500}
        height={500}
        alt="Signup back"
        priority
      />
      <Image
        className={style.back_mobile}
        src={backMobileIcon}
        width={300}
        height={300}
        alt="Signup back"
        priority
      />
      <FormSignup />
    </div>
  )
}

export default page
