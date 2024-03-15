import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Slider from '@/components/ui/slider/Slider'
import Button from '@/components/ui/button/Button'
import Modal from '@/components/ui/modal/Modal'
import Post from '@/components/ui/modal/modules/Post'
import { numConverter } from '@/components/numConverter'
import { getPostDate } from '@/components/getPostDate'

import avatarIcon from '/public/avatar.jpeg'
import heartIcon from '/public/svg/heart.svg'
import heartRedIcon from '/public/svg/heartRed.svg'
import savedIcon from '/public/svg/bookmark.svg'
import commentIcon from '/public/svg/comment.svg'
import savedActiveIcon from '/public/svg/bookmarkBlack.svg'

import style from '@/styles/tape.module.scss'

const TapeSchema: React.FC<TapeItem> = (props) => {
  return (
    <li key={props.post._id} className={style.post_container}>
      <hr />
      <Link href={`/profile/${props.post.creator._id}`} className={style.post_header}>
        <div className={style.user_info}>
          <Image
            className={style.user_icon}
            src={
              props.post.creator.avatar
                ? `${process.env.serverUrl}${props.post.creator.avatar}`
                : avatarIcon
            }
            width={86}
            height={86}
            alt="User avatar"
          />

          <div className={style.user_fullname}>
            <div>{props.post.creator.username}</div>
            <div>{props.post.creator.surname}</div>
          </div>
        </div>

        <time>{getPostDate(props.post.createdAt)}</time>
      </Link>
      <Slider graphics={props.post.files} isFromServer={true} />
      <div className={style.post_controllers}>
        <div className={style.post_buttons}>
          <div className={style.left_buttons}>
            {props.post.usersLiked.includes(props.meId) ? (
              <Button onClick={() => props.dislikePost(props.meId, props.post._id)}>
                <Image
                  className={style.heart_button}
                  src={heartRedIcon}
                  width={24}
                  height={24}
                  alt="Dislike post"
                />
              </Button>
            ) : (
              <Button onClick={() => props.likePost(props.meId, props.post._id)}>
                <Image
                  className={style.heart_button}
                  src={heartIcon}
                  width={24}
                  height={24}
                  alt="Like post"
                />
              </Button>
            )}
            <ul>
              <Modal module={<Post post={props.post} />}>
                <Button padding="none" background="none">
                  <Image
                    className={style.comment_button}
                    src={commentIcon}
                    width={24}
                    height={24}
                    alt="Show comments"
                  />
                </Button>
              </Modal>
            </ul>
          </div>
          {props.post.usersSaved.includes(props.meId) ? (
            <Button onClick={() => props.losePost(props.meId, props.post._id)}>
              <Image
                className={style.lose_button}
                src={savedActiveIcon}
                width={24}
                height={24}
                alt="Lose post"
              />
            </Button>
          ) : (
            <Button onClick={() => props.savePost(props.meId, props.post._id)}>
              <Image
                className={style.save_button}
                src={savedIcon}
                width={24}
                height={24}
                alt="Save post"
              />
            </Button>
          )}
        </div>

        <div className={style.likes}>{numConverter(props.post.usersLiked.length)} likes</div>
        <p>{props.post.content || 'No content'}</p>
      </div>
    </li>
  )
}

export default TapeSchema
