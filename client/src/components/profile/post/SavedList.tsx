'use client'

import React from 'react'
import Schema from './Schema'
import SPost from '@/components/ui/sceleton/SPost'
import { usePostPagination } from '@/hooks/usePostPagination'
import { useAppSelector } from '@/store/hooks'

import style from '@/components/profile/profile.module.scss'

const SavedList: React.FC<PropsUserId> = ({ userId }) => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const { data: posts, isLoading, ref } = usePostPagination(`/post/savedList/${userId}`, 18)
  const sceleton: number[] = [...new Array(15)]

  return (
    <>
      {userId === meId ? (
        <>
          <ul className={style.posts}>
            {isLoading ? (
              <SPost quantity={sceleton} />
            ) : (
              <>
                {posts.map((post: Post) => (
                  <Schema key={post._id} post={post} />
                ))}
              </>
            )}
          </ul>
          <div className={posts.length ? style.post_loader : style.post_preloader} ref={ref}></div>
        </>
      ) : (
        <div className={style.private_section}>
          <h3>Private section</h3>
          <p>Only the profile author has access to this section</p>
        </div>
      )}
    </>
  )
}

export default SavedList
