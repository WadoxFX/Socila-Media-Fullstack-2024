'use client'

import React from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import SComments from '@/components/ui/sceleton/SComments'
import { fetcher } from '@/api/fetcher'
import { useAppSelector } from '@/store/hooks'
import { getPostDate } from '@/components/getPostDate'
import { numConverter } from '@/components/numConverter'
import { likeComment } from '@/api/post/likeComment'
import { dislikeComment } from '@/api/post/dislikeComment'
import { deleteComment } from '@/api/post/deleteComment'

import avatarIcon from '/public/avatar.jpeg'
import heartRed from '/public/svg/heartRed.svg'
import heart from '/public/svg/heart.svg'
import trashIcon from '/public/svg/trash.svg'

import style from '@/components/ui/modal/modules/post.module.scss'

const Comments: React.FC<PtopsPostComment> = ({ postId, content }) => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const { data: comments, error } = useSWR<PostComment[]>(`/post/comments/${postId}`, fetcher)

  if (!comments) return <SComments />
  if (error) return <p>Error</p>

  return (
    <ul className={style.comments}>
      {content && (
        <li data-cy="content" className={style.content}>
          {content}
        </li>
      )}
      {comments.map((comment: PostComment) => (
        <li key={comment._id}>
          <div className={style.comment_container}>
            <Image
              className={style.user_icon}
              src={
                comment.user.avatar ? `${process.env.serverUrl}${comment.user.avatar}` : avatarIcon
              }
              width={86}
              height={86}
              alt="User avatar"
            />
            <div className={style.comment}>
              <div className={style.user_fullname}>
                <div>{comment.user.username}</div>
                <div>{comment.user.surname}</div>
              </div>
              <div className={style.comment_content}>
                <p>{comment.text}</p>
                <time>{getPostDate(comment.createdAt)}</time>
              </div>
            </div>
          </div>

          <div className={style.comment_controllers}>
            {comment.like.includes(meId) ? (
              <button onClick={() => dislikeComment(meId, postId, comment._id)}>
                <Image src={heartRed} width={16} height={16} alt="DisLike comment" />
                {numConverter(comment.like.length)}
              </button>
            ) : (
              <button data-cy="like_comment" onClick={() => likeComment(meId, postId, comment._id)}>
                <Image src={heart} width={16} height={16} alt="Like comment" />
                {numConverter(comment.like.length)}
              </button>
            )}
            {comment.user._id === meId && (
              <button data-cy="del_comment" onClick={() => deleteComment(postId, comment._id)}>
                <Image src={trashIcon} width={18} height={18} alt="Delete comment" />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Comments
