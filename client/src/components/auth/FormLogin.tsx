'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../ui/button/Button'
import Error from '../ui/fromError/Error'
import { useForm } from 'react-hook-form'
import { customAxios } from '@/api/customAxios'
import { useToggle } from '@/hooks/useToggle'

import eyesIcon from '/public/svg/eyes.svg'
import closeEyesIcon from '/public/svg/closeEyes.svg'

import style from './auth.module.scss'

const FormLogin: React.FC = () => {
  const [isView, toggle] = useToggle(false)
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginValues>({
    defaultValues: {
      email: '',
      password: '',
      customError: null,
    },
  })

  const onSubmit = async (props: FormLoginValues) => {
    try {
      await customAxios.post(`/auth/login`, { ...props })
      window.location.href = '/'
    } catch (error: any) {
      console.error('Error: ', error.response.data.message)
      setError('customError', {
        type: 'server',
        message: error.response.data.message,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.title}>
        <h1>Log in</h1>
        <p className={style.desc}>
          Not registered yet? <Link href={'/signup'}>Click here</Link>
        </p>
      </div>

      <div className={style.inputs}>
        <div className={style.email}>
          <input
            data-cy="email"
            autoComplete="username"
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: /[a-zA-z0-9]+@[a-z]+\.[a-z]{3,}/,
                message: 'Email does not meet the standard',
              },
              minLength: { value: 12, message: 'Email cannot be less than 12 characters' },
              maxLength: { value: 74, message: 'Please enter a valid address' },
            })}
            placeholder=" "
          />
          <label>Email</label>
          <Error>{errors.email?.message}</Error>
        </div>
        <div className={style.password}>
          <input
            className={style.password_input}
            type={!!isView ? 'text' : 'password'}
            data-cy="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Required field',
              pattern: {
                value: /[a-zA-z0-9]/,
                message: 'The password must not consist of @"=-*&^%$#`!/,.',
              },
              minLength: { value: 6, message: 'The password is too simple' },
              maxLength: { value: 124, message: 'The password is too long' },
            })}
            placeholder=" "
          />
          <label>Password</label>
          <button className={style.view_password} type="button" onClick={toggle}>
            {isView ? (
              <Image src={eyesIcon} width={24} height={24} alt="Close passsword" />
            ) : (
              <Image src={closeEyesIcon} width={24} height={24} alt="View passsword" />
            )}
          </button>
          <Error>{errors.password?.message}</Error>
          <Error>{errors.customError?.message}</Error>
        </div>
      </div>

      <Button
        data_cy_name="log in"
        color="white"
        background="black"
        padding="large"
        borderRadius="50px"
      >
        Log in
      </Button>
    </form>
  )
}

export default FormLogin
