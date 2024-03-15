import React from 'react'
import Image from 'next/image'
import Tabs from '@/components/profile/Tabs'
import Controllers from '@/components/profile/Controllers'
import Statistics from '@/components/profile/Statistics'
import { customAxios } from '@/api/customAxios'
import { Metadata } from 'next'

import Avatar from '/public/avatar.jpeg'

import style from '@/components/profile/profile.module.scss'

export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  const response = await customAxios<UserProfile>(`/user/profile/${id}`)
  const user: UserProfile = response.data

  return {
    title: `${user.username} ${user.surname}`,
    description: user.desc,
  }
}

const page: React.FC<Params> = async ({ params: { id } }) => {
  const response = await customAxios<UserProfile>(`/user/profile/${id}`)
  const user: UserProfile = response.data

  return (
    <div className={style.container}>
      <section className={style.profile}>
        <Image
          className={style.user_icon}
          src={user.avatar ? `${process.env.serverUrl}${user.avatar}` : Avatar}
          width={150}
          height={150}
          quality={100}
          alt="User avatar"
          priority
        />
        <div className={style.user_infos}>
          <header className={style.header}>
            <h1>
              <div data-cy="profile_username">{user.username}</div>
              <div data-cy="profile_surname">{user.surname}</div>
            </h1>
            <Controllers userId={id} />
          </header>
          <Statistics userId={id} />
          <p data-cy="desc" className={style.desc}>
            {user.desc}
          </p>
        </div>
      </section>
      <Tabs userId={id} />
    </div>
  )
}

export default page
