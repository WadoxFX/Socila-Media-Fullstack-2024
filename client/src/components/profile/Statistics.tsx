'use client'

import React from 'react'
import useSWR from 'swr'
import SStatistic from '../ui/sceleton/SStatistic'
import { fetcher } from '@/api/fetcher'
import { numConverter } from '../numConverter'

import style from '@/components/profile/profile.module.scss'

const Statistics: React.FC<UserId> = ({ userId }) => {
  const { data, error } = useSWR<UserStatistic>(`/user/statistic/${userId}`, fetcher)

  if (!data) return <SStatistic />
  if (error) return <p>Error</p>

  return (
    <ul className={style.statistics}>
      <li>{numConverter(data.infos.posts.length)} publications</li>
      <li>{numConverter(data.infos.subs.length)} subscribers</li>
      <li>{numConverter(data.infos.friends.length)} friends</li>
    </ul>
  )
}

export default Statistics
