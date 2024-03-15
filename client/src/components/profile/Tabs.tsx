'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import PostList from './post/PostList'
import LikedList from './post/LikedList'
import SavedList from './post/SavedList'

import postsIcon from '/public/svg/dashboard.svg'
import savedIcon from '/public/svg/bookmark.svg'
import likedIcon from '/public/svg/like.svg'

import style from '@/components/profile/profile.module.scss'

const Tabs: React.FC<UserId> = ({ userId }) => {
  const [selected, setSelected] = useState<string>('posts')
  const categories: TabsCategorie[] = [
    { title: 'posts', icon: postsIcon },
    { title: 'saved', icon: savedIcon },
    { title: 'liked', icon: likedIcon },
  ]

  return (
    <div className={style.tabs}>
      <hr />
      <div className={style.categories}>
        {categories.map((categorie: TabsCategorie, id: number) => (
          <div
            key={id}
            onClick={() => setSelected(categorie.title)}
            className={selected === categorie.title ? style.active_categorie : style.categorie}
          >
            <Image src={categorie.icon} width={16} height={16} alt="Categorie icon" />
            <div>{categorie.title}</div>
          </div>
        ))}
      </div>
      <div className={style.post_container}>
        {selected === 'posts' && <PostList userId={userId} />}
        {selected === 'saved' && <SavedList userId={userId} />}
        {selected === 'liked' && <LikedList userId={userId} />}
      </div>
    </div>
  )
}

export default Tabs
