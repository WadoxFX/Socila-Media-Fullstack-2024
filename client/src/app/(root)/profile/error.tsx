'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import notFound from '/public/svg/404.svg'

import style from '@/styles/error.module.scss'

const error: React.FC = () => {
  return (
    <div className={style.error_container}>
      <Image src={notFound} width={400} height={400} priority alt="Page not found" />
      <div className={style.error_content}>
        <h1 className={style.error_title}>Page Not Found</h1>
        <p>
          We`are sorry, the page you requested could not be found
          <br />
          Please go back to the <Link href={'/'}>homepage</Link>
        </p>
      </div>
    </div>
  )
}

export default error
