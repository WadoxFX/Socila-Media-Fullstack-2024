'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../ui/button/Button'

import avatarIcon from '/public/avatar.jpeg'
import friendUserIcon from '/public/svg/friendUser.svg'
import addFriendIcon from '/public/svg/addFriend.svg'
import reqFriendIcon from '/public/svg/reqFriend.svg'

import style from '@/components/friends/friends.module.scss'

const UserSchema: React.FC<PropsUserSchema> = (props) => {
  return (
    <li className={style.user}>
      <Link href={`/profile/${props.user._id}`} data-cy="user" className={style.user_container}>
        <Image
          className={style.user_icon}
          src={props.user.avatar ? `${process.env.serverUrl}${props.user.avatar}` : avatarIcon}
          width={120}
          height={120}
          alt="User avatar"
        />
        <div className={style.user_info}>
          <div className={style.full_name}>
            {props.user.username} {props.user.surname}
          </div>
          <p className={style.desc}>
            {props.user.desc && props.user.desc === '.' ? 'No description' : props.user.desc}
          </p>
        </div>
      </Link>
      <div className={style.controlers}>
        {props.user.infos.subs.includes(props.meId) ? (
          <Button
            padding="medium"
            background="#efefef"
            borderRadius="8px"
            onClick={() => props.QUnsubscribe(props.user._id, props.meId)}
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            onClick={() => props.QSubscribe(props.user._id, props.meId)}
            padding="medium"
            borderRadius="8px"
            background="#0088ff"
            color="#ffffff"
          >
            Subscribe
          </Button>
        )}

        {props.user.infos.friendsReq.includes(props.meId) ? (
          <Button
            onClick={() => props.QRecallFriend(props.user._id, props.meId)}
            borderRadius="8px"
            background="#efefef"
            padding="cube"
          >
            <Image src={reqFriendIcon} width={19} height={19} alt="Check friend" />
          </Button>
        ) : (
          <>
            {props.user.infos.friends.includes(props.meId) ? (
              <Button borderRadius="8px" background="#efefef" padding="cube">
                <Image src={friendUserIcon} width={19} height={19} alt="Check friend" />
              </Button>
            ) : (
              <Button
                onClick={() => props.QFriendReq(props.user._id, props.meId)}
                borderRadius="8px"
                background="#efefef"
                padding="cube"
              >
                <Image src={addFriendIcon} width={19} height={19} alt="Check friend" />
              </Button>
            )}
          </>
        )}
      </div>
    </li>
  )
}

export default UserSchema
