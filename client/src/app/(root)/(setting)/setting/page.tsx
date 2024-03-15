'use client'

import React from 'react'
import Image from 'next/image'
import Categorie from '@/components/setting/Categorie'
import Error from '@/components/ui/fromError/Error'
import Button from '@/components/ui/button/Button'
import { useForm, useWatch } from 'react-hook-form'
import { editProfile } from '@/api/user/editProfile'
import { useAppSelector } from '@/store/hooks'

import avatarIcon from '/public/avatar.jpeg'

import style from '@/components/setting/setting.module.scss'

const Page: React.FC = () => {
  const meData: UserData = useAppSelector((state) => state.user.userData)
  const avatarTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<EditProfile>()
  const avatar: FileList | null = useWatch({ control, name: 'avatar' })

  return (
    <form
      onSubmit={handleSubmit((data: EditProfile) => editProfile({ ...data, meId: meData._id }))}
    >
      <Categorie title="Profile" desc="This is how others will see you on the site." />
      <div className={style.setting_change_avatar}>
        <Image
          className={style.user_icon}
          src={meData.avatar ? `${process.env.serverUrl}${meData.avatar}` : avatarIcon}
          width={156}
          height={156}
          alt="avatar"
        />

        <label data-cy="upload">
          {avatar?.length > 0 ? 'Selected' : 'New photo'}
          <input
            accept="Image/, .png, .jpeg, .jpg, .gif"
            className={style.no_view}
            type="file"
            {...register('avatar', {
              validate: {
                isImage: (value: FileList) => {
                  if (value.length && !avatarTypes.includes(value[0].type)) {
                    return 'Please select a valid image file (png, jpeg, jpg, gif)'
                  }
                  return true
                },
                maxSize: (value: FileList) => {
                  if (value.length && value[0].size > 1024 * 1024) {
                    return 'File size should not exceed 1MB'
                  }

                  return true
                },
              },
            })}
          />
        </label>
      </div>
      <Error>{errors.avatar?.message}</Error>

      <Categorie title="Username" />
      <input
        data-cy="username"
        defaultValue={meData.username}
        placeholder="Username..."
        {...register('username', {
          pattern: {
            value: /^(?=.*[a-zA-Z0-9])(?!.*[@$!%*?&"=^#`!/,.]).*$/,
            message: 'The password must not consist of @"=-*&^%$#`!/,.',
          },
          minLength: { value: 3, message: 'Can`t be shorter than 3 characters' },
          maxLength: { value: 15, message: 'Must not exceed 15 characters' },
        })}
      />
      <Error>{errors.username?.message}</Error>

      <Categorie title="Surname" />
      <input
        data-cy="surname"
        defaultValue={meData.surname}
        placeholder="Surname..."
        {...register('surname', {
          pattern: {
            value: /^(?=.*[a-zA-Z0-9])(?!.*[@$!%*?&"=^#`!/,.]).*$/,
            message: 'The password must not consist of @"=-*&^%$#`!/,.',
          },
          minLength: { value: 3, message: 'Can`t be shorter than 3 characters' },
          maxLength: { value: 15, message: 'Must not exceed 15 characters' },
        })}
      />
      <Error>{errors.surname?.message}</Error>

      <Categorie title="Email" />
      <input
        type="email"
        autoComplete="username"
        defaultValue={meData.email}
        placeholder="user@gmail.com"
        {...register('email', {
          pattern: {
            value: /[a-zA-z0-9]+@[a-z]+\.[a-z]{3,}/,
            message: 'Email does not meet the standard',
          },
          minLength: { value: 12, message: 'Email cannot be less than 12 characters' },
          maxLength: { value: 74, message: 'Please enter a valid address' },
        })}
      />
      <Error>{errors.email?.message}</Error>

      <Categorie title="Password" />
      <input
        type="password"
        placeholder="Password..."
        autoComplete="current-password"
        {...register('password', {
          pattern: {
            value: /^(?=.*[a-zA-Z0-9])(?!.*[@$!%*?&"=^#`!/,.]).*$/,
            message: 'The password must not consist of @"=-*&^%$#`!/,.',
          },
          minLength: { value: 6, message: 'The password is too simple' },
          maxLength: { value: 124, message: 'The password is too long' },
        })}
      />
      <Error>{errors.password?.message}</Error>

      <Categorie title="Description" />
      <div className={style.setting_textarea_box}>
        <textarea
          data-cy="desc"
          defaultValue={meData.desc}
          placeholder="Your content..."
          {...register('desc', {
            pattern: {
              value: /^(?=.*[a-zA-Z0-9@.,?!\s])(?!.*[\[\]{}()<>]).*$/,
              message: 'The password must not consist of <>{}()',
            },
            maxLength: {
              value: 250,
              message: 'Description should not exceed more than 250 characters',
            },
          })}
        />
        <div className={style.desc_length}>{watch('desc') ? watch('desc').length : 0}/250</div>
      </div>
      <Error>{errors.desc?.message}</Error>

      <p className={style.setting_form_desc}>
        The page will be reloaded after successful submission of data
      </p>

      <div>
        <Button
          data_cy_name="updateProfile"
          color="white"
          background="black"
          padding="large"
          borderRadius="8px"
        >
          Update profile
        </Button>
      </div>
    </form>
  )
}

export default Page
