import React from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import Button from '@/components/ui/button/Button'
import SManipulator from '@/components/ui/sceleton/SManipulator'
import { numConverter } from '@/components/numConverter'
import { getPostDate } from '@/components/getPostDate'
import { useAppSelector } from '@/store/hooks'
import { fetcher } from '@/api/fetcher'
import { like } from '@/api/post/like'
import { dislike } from '@/api/post/dislike'
import { save } from '@/api/post/save'
import { lose } from '@/api/post/lose'

import heartIcon from '/public/svg/heart.svg'
import heartRedIcon from '/public/svg/heartRed.svg'
import savedIcon from '/public/svg/bookmark.svg'
import commentIcon from '/public/svg/comment.svg'
import savedActiveIcon from '/public/svg/bookmarkBlack.svg'

import style from '@/components/ui/modal/modules/post.module.scss'

const Manipulator: React.FC<PropsPostId> = ({ postId }) => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const { data, error } = useSWR<Post>(`/post/data/${postId}`, fetcher)

  if (!data) return <SManipulator />
  if (error) return <p>Error</p>

  return (
    <div className={style.manipulation}>
      <div className={style.post_buttons}>
        <div className={style.left_buttons}>
          {data.usersLiked.includes(meId) ? (
            <Button onClick={() => dislike(meId, data._id)}>
              <Image
                data-cy="dislike"
                className={style.heart_button}
                src={heartRedIcon}
                width={24}
                height={24}
                alt="Dislike post"
              />
            </Button>
          ) : (
            <Button onClick={() => like(meId, data._id)}>
              <Image
                data-cy="like"
                className={style.heart_button}
                src={heartIcon}
                width={24}
                height={24}
                alt="Like post"
              />
            </Button>
          )}
          <Button padding="none" background="none">
            <Image
              className={style.comment_button}
              src={commentIcon}
              width={24}
              height={24}
              alt="Show comments"
            />
          </Button>
        </div>
        {data.usersSaved.includes(meId) ? (
          <Button onClick={() => lose(meId, data._id)}>
            <Image
              data-cy="lose"
              className={style.lose_button}
              src={savedActiveIcon}
              width={24}
              height={24}
              alt="Lose post"
            />
          </Button>
        ) : (
          <Button onClick={() => save(meId, data._id)}>
            <Image
              data-cy="save"
              className={style.save_button}
              src={savedIcon}
              width={24}
              height={24}
              alt="Save post"
            />
          </Button>
        )}
      </div>
      <div>
        <div>{numConverter(data.usersLiked.length)} Likes</div>
        <time>{getPostDate(data.createdAt)}</time>
      </div>
    </div>
  )
}

export default Manipulator
