import React from 'react'
import style from '@/components/ui/sceleton/sceleton.module.scss'

type PropsSceleton = {
  quantity: number[]
}

const SPost: React.FC<PropsSceleton> = ({ quantity }) => {
  return (
    <>
      {quantity.map((_, id: number) => (
        <li className={style.post_sceleton} key={id}></li>
      ))}
    </>
  )
}

export default SPost
