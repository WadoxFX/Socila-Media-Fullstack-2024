'use client'

import React from 'react'
import Schema from './Schema'
import SPost from '@/components/ui/sceleton/SPost'
import { usePostPagination } from '@/hooks/usePostPagination'

import style from '@/components/profile/profile.module.scss'

const PostList: React.FC<PropsUserId> = ({ userId }) => {
  const { data: posts, isLoading, ref } = usePostPagination(`/post/postList/${userId}`, 18)
  const sceleton: number[] = [...new Array(15)]

  return (
    <>
      <ul className={style.posts}>
        {!!isLoading ? (
          <SPost quantity={sceleton} />
        ) : (
          <>
            {posts.map((post: Post) => (
              <Schema key={post._id} post={post} />
            ))}
          </>
        )}
      </ul>
      <div className={!isLoading ? style.post_loader : style.post_preloader} ref={ref}></div>
    </>
  )
}

export default PostList
