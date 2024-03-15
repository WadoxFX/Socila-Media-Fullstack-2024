import React from 'react'
import Image from 'next/image'
import Post from '../../ui/modal/modules/Post'
import Modal from '@/components/ui/modal/Modal'
import { numConverter } from '@/components/numConverter'

import heartIcon from '/public/svg/heartWhite.svg'
import commentIcon from '/public/svg/commentWhite.svg'

import style from '@/components/profile/profile.module.scss'

const Schema: React.FC<PropsPost> = ({ post }) => {
  return (
    <Modal module={<Post post={post} />}>
      <article data-cy="post" className={style.post}>
        {post.files[0].type.startsWith('video/') ? (
          <video className={style.video_icon}>
            <source src={`${process.env.serverUrl}${post.files[0].path}`} type="video/mp4" />
          </video>
        ) : (
          <Image
            className={style.image_icon}
            src={`${process.env.serverUrl}${post.files[0].path}`}
            height={400}
            width={400}
            alt="Post preview"
            priority
          />
        )}
        <div className={style.overlay}>
          <div className={style.statistics}>
            <Image src={heartIcon} width={20} height={20} alt="Number of likes" />
            <div>{numConverter(post.usersLiked.length)}</div>
          </div>
          <div className={style.statistics}>
            <Image src={commentIcon} width={20} height={20} alt="Number of comments" />
            <div>{numConverter(post.comments.length)}</div>
          </div>
        </div>
      </article>
    </Modal>
  )
}

export default Schema
