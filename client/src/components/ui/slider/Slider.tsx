import React from 'react'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Trash from '/public/svg/trash.svg'

import style from './slider.module.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'


const Slider: React.FC<UISlider> = ({ graphics, cleanBtn, isFromServer, onClean }) => {
  const fromServer: string | undefined = process.env.serverUrl
  return (
    <Swiper
      className={style.slider}
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination]}
    >
      {cleanBtn && (
        <button className={style.slider_clean_btn} onClick={onClean}>
          <Image src={Trash} width={24} height={24} alt="Clean preview" />
        </button>
      )}
      {graphics.map((preview, id) => (
        <SwiperSlide key={id}>
          {preview.type === 'video/mp4' ? (
            <video controls>
              <source src={`${isFromServer ? fromServer : ''}${preview.path}`} type="video/mp4" />
              Failed to process file
            </video>
          ) : (
            <Image
              src={`${isFromServer ? fromServer : ''}${preview.path}`}
              width={1000}
              height={1000}
              alt="Preview"
              priority
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
