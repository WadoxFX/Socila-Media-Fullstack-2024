'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from '@/components/ui/slider/Slider'
import Button from '@/components/ui/button/Button'
import Comments from '@/components/profile/post/Comments'
import Controller from '@/components/profile/post/Controller'
import { useAppSelector } from '@/store/hooks'
import { deletePost } from '@/api/post/deletePost'

import trashIcon from '/public/svg/trash.svg'
import closeIcon from '/public/svg/close.svg'
import avatarIcon from '/public/avatar.jpeg'

import style from '@/components/ui/modal/modules/post.module.scss'

const Post: React.FC<PropsPost> = ({ post, onClose }) => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const [mobile, setMobile] = useState<boolean>(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={style.modal_container}>
      {!!mobile ? null : <Slider graphics={post.files} isFromServer={true} />}

      <div className={style.comments_list}>
        <div className={style.post_header}>
          <Link href={`/profile/${post.creator._id}`} className={style.user_info}>
            <Image
              className={style.user_icon}
              src={
                post.creator.avatar ? `${process.env.serverUrl}${post.creator.avatar}` : avatarIcon
              }
              width={86}
              height={86}
              alt="User avatar"
            />
            <div className={style.user_controller}>
              <div className={style.user_fullname}>
                <div>{post.creator.username}</div>
                <div>{post.creator.surname}</div>
              </div>
            </div>
          </Link>

          <div className={style.post_del_close}>
            {post.creator._id === meId && (
              <Button
                data_cy_name='del_post'
                onClick={() => deletePost(post._id)}
                background="#efefef"
                padding="cube"
                borderRadius="8px"
              >
                <Image src={trashIcon} width={24} height={24} alt="delete post" />
              </Button>
            )}
            {mobile && (
              <Button padding="cube" onClick={onClose}>
                <Image src={closeIcon} width={24} height={24} alt="delete post" />
              </Button>
            )}
          </div>
        </div>
        {mobile && <Slider graphics={post.files} isFromServer={true} />}
        <Comments postId={post._id} content={post.content} />
        <Controller postId={post._id} />
      </div>
    </div>
  )
}

export default Post
