'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Slider from '../../slider/Slider'
import Button from '../../button/Button'
import Error from '../../fromError/Error'
import { useForm } from 'react-hook-form'
import { usePreview } from '@/hooks/usePreview'
import { useAppSelector } from '@/store/hooks'
import { creatingPost } from '@/api/post/creatingPost'

import avatarIcon from '/public/avatar.jpeg'

import style from '../modal.module.scss'

const Creating: React.FC<CreatorPost> = ({ onClose }) => {
  const meData: UserData = useAppSelector((state) => state.user.userData)
  const allowedTypes: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'video/mp4',
  ]
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      files: undefined,
      content: '',
    },
  })
  const { preview, fileList, clean } = usePreview(watch('files'), allowedTypes)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log()

  return (
    <form
      className={style.form_container}
      onSubmit={handleSubmit((data) => {
        if (!isLoading) {
          creatingPost({ ...data, files: fileList, id: meData._id, onClose, setIsLoading })
        }
      })}
    >
      {preview.length ? (
        <Slider graphics={preview} cleanBtn={true} onClean={clean} />
      ) : (
        <div className={style.upload_basc}>
          <label data-cy="uploader">
            Upload
            <input
              accept="Imaga/, .png, .jpeg, .jpg, .gif, .webp, video/mp4"
              multiple
              type="file"
              {...register('files', {
                required: true,
                validate: (value) => {
                  if (value && value.length > 9) {
                    return 'No more than 9 files'
                  }
                  return true
                },
              })}
            />
          </label>
        </div>
      )}

      <div className={style.post_info}>
        <div className={style.user_info}>
          <Image
            className={style.user_icon}
            src={meData.avatar ? `${process.env.serverUrl}${meData.avatar}` : avatarIcon}
            width={86}
            height={86}
            alt="User avatar"
          />
          <div className={style.user_fullname}>
            <div>{meData.username}</div>
            <div>{meData.surname}</div>
          </div>
        </div>
        <textarea
          data-cy="post_content"
          placeholder="Add a comment..."
          {...register('content', {
            pattern: {
              value: /^(?=.*[a-zA-Z0-9@.,?!\s])(?!.*[\[\]{}()<>]).*$/,
              message: 'The password must not consist of <>{}()',
            },
            maxLength: {
              value: 250,
              message: 'The comment should not be more than 250 characters',
            },
          })}
        />
        <div className={style.error_container}>
          <Error>{errors.content?.message}</Error>
          <Error>{errors.files?.message}</Error>
        </div>
        <div className={style.btn_conteiner}>
          <Button onClick={onClose}>Close post</Button>
          <Button
            data_cy_name="createing_post_button"
            background="black"
            color="white"
            padding="large"
            borderRadius="50px"
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Creating
