'use client'

import React from 'react'
import STapePost from '@/components/ui/sceleton/STapePost'
import TapeSchema from '@/components/profile/post/TapeSchema'

import { usePostPagination } from '@/hooks/usePostPagination'
import { useAppSelector } from '@/store/hooks'

import style from '@/styles/tape.module.scss'

const Page: React.FC = () => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const {
    data: posts,
    isLoading,
    status,
    ref,
    likePost,
    dislikePost,
    savePost,
    losePost,
  } = usePostPagination(meId && `/post/tape/${meId}`, 6)

  return (
    <div className={style.tape_container}>
      {!!isLoading ? (
        <STapePost />
      ) : (
        <ul className={style.tape_posts}>
          {posts.map((post: Post) => (
            <TapeSchema
              post={post}
              meId={meId}
              likePost={likePost}
              dislikePost={dislikePost}
              savePost={savePost}
              losePost={losePost}
              key={post._id}
            />
          ))}
          {!!status && (
            <li className={style.worning}>
              <div className={style.worning_title}>No Posts</div>
              <p className={style.worning_desc}>
                There are no more new posts, subscribe to more people or expect new posts from your
                friends.
              </p>
            </li>
          )}
        </ul>
      )}
      <div ref={ref} className={!!isLoading ? style.post_preloader : style.post_loader}></div>
    </div>
  )
}

export default Page
