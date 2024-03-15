'use client'

import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/button/Button'
import SFriendRequests from '@/components/ui/sceleton/SFriendRequests'
import { fetcher } from '@/api/fetcher'
import { useAppSelector } from '@/store/hooks'
import { delRequest } from '@/api/user/delRequest'
import { confirmFriend } from '@/api/user/confirmFriend'

import avatarIcon from '/public/avatar.jpeg'

import style from '@/components/friends/friends.module.scss'

const page: React.FC = () => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<Omit<UserData[], 'email' | 'desc'>>(meId ? `/user/request/${meId}` : null, fetcher)

  if (isLoading) return <SFriendRequests />
  if (error) return <p>Error</p>

  return (
    <ul>
      {users?.length ? (
        <>
          {users.map((user: Omit<UserData, 'email'>) => (
            <li key={user._id} className={style.user}>
              <Link className={style.user_container} href={`/profile/${user._id}`}>
                <Image
                  className={style.user_icon}
                  src={user.avatar ? `${process.env.serverUrl}${user.avatar}` : avatarIcon}
                  width={120}
                  height={120}
                  alt="User avatar"
                />
                <div className={style.user_info}>
                  <div className={style.full_name}>
                    {user.username} {user.surname}
                  </div>
                  <p className={style.desc}>
                    {user.desc && user.desc === '.' ? 'No description' : user.desc}
                  </p>
                </div>
              </Link>

              <div className={style.controlers}>
                <Button
                  onClick={() => confirmFriend(meId, user._id)}
                  background="#efefef"
                  borderRadius="8px"
                  padding="medium"
                >
                  Add
                </Button>
                <Button
                  onClick={() => delRequest(meId, user._id)}
                  background="red"
                  color="white"
                  borderRadius="8px"
                  padding="medium"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </>
      ) : (
        <p>No requests</p>
      )}
    </ul>
  )
}

export default page
