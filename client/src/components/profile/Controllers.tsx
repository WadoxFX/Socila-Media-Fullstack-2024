'use client'

import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../ui/button/Button'
import SController from '../ui/sceleton/SController'
import { fetcher } from '@/api/fetcher'
import { addFriend } from '@/api/user/addFriend'
import { recallFriend } from '@/api/user/recallFriend'
import { useAppSelector } from '@/store/hooks'
import { subscribe } from '@/api/user/subscribe'
import { unsubscribe } from '@/api/user/unsubscribe'
import { startChat } from '@/api/chat/startChat'

import friendUserIcon from '/public/svg/friendUser.svg'
import addFriendIcon from '/public/svg/addFriend.svg'
import recallFrendIcon from '/public/svg/reqFriend.svg'
import settingIcon from '/public/svg/setting.svg'

import style from '@/components/profile/profile.module.scss'

const Controllers: React.FC<UserId> = ({ userId }) => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const { data, error } = useSWR<UserStatistic>(`/user/statistic/${userId}`, fetcher)

  if (!data) return <SController />
  if (error) return <p>Error</p>

  return (
    <div className={style.controlers}>
      {userId === meId ? (
        <Link href={'/setting'}>
          <Button padding="cube" background="#efefef" borderRadius="8px">
            <Image src={settingIcon} width={24} height={24} alt="Setting" />
          </Button>
        </Link>
      ) : (
        <>
          {data.infos.subs.includes(meId) ? (
            <Button
              data_cy_name="unsubscribe"
              onClick={() => unsubscribe(userId, meId)}
              padding="medium"
              background="#efefef"
              borderRadius="8px"
            >
              Unsubscribe
            </Button>
          ) : (
            <Button
              data_cy_name="subscribe"
              onClick={() => subscribe(userId, meId)}
              padding="medium"
              background="#0088ff"
              color="white"
              borderRadius="8px"
            >
              Subscribe
            </Button>
          )}
          <Button
            onClick={() => startChat(userId, meId)}
            padding="medium"
            background="#efefef"
            borderRadius="8px"
          >
            Chat
          </Button>
          {data.infos.friendsReq.includes(meId) ? (
            <Button
              onClick={() => recallFriend(userId, meId)}
              padding="cube"
              background="#efefef"
              borderRadius="8px"
            >
              <Image src={recallFrendIcon} width={19} height={19} alt="recall friend request" />
            </Button>
          ) : (
            <>
              {data.infos.friends.includes(meId) ? (
                <Button borderRadius="8px" background="#efefef" padding="cube">
                  <Image src={friendUserIcon} width={19} height={19} alt="Check friend" />
                </Button>
              ) : (
                <Button
                  data_cy_name='add_friend'
                  onClick={() => addFriend(userId, meId)}
                  padding="cube"
                  background="#efefef"
                  borderRadius="8px"
                >
                  <Image src={addFriendIcon} width={19} height={19} alt="send friend request" />
                </Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Controllers
