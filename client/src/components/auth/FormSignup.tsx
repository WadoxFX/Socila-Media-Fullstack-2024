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

const FormSignup: React.FC = () => {
  const [isView, toggle] = useToggle(false)
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignupValues>({
    defaultValues: {
      username: '',
      surname: '',
      email: '',
      password: '',
      customError: null,
    },
  })

  const signup = async (props: FormSignupValues) => {
    try {
      const res = await customAxios.post(`/auth/signup`, { ...props })
      if (res.status === 201) window.location.href = '/login'
    } catch (error: any) {
      console.error('Error: ', error.response.data.message)
      setError('customError', {
        type: 'server',
        message: error.response.data.message,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(signup)}>
      <div className={style.title}>
        <h1>Sign up</h1>
        <p className={style.desc}>
          Already registered? <Link href={'/login'}>Click here</Link>
        </p>
      </div>

      <div className={style.inputs}>
        <div className={style.user_data}>
          <div className={style.username}>
            <input
              data-cy="username"
              {...register('username', {
                required: 'Required field',
                pattern: {
                  value: /^(?=.*[a-zA-Z0-9])(?!.*[@$!%*?&"=^#`!/,.{}<>]).*$/,
                  message: 'The password must not consist of @"=-*&^%$#`!/,.',
                },
                minLength: {
                  value: 3,
                  message: 'Can`t be shorter than 3 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'Must not exceed 15 characters',
                },
              })}
              placeholder=" "
            />
            <label>Username</label>
            <Error>{errors.username?.message}</Error>
          </div>
          <div className={style.surname}>
            <input
              data-cy="surname"
              {...register('surname', {
                required: 'Required field',
                pattern: {
                  value: /^(?=.*[a-zA-Z0-9])(?!.*[@$!*?&"=^#`!,.{}<>]).*$/,
                  message: 'The password must not consist of @"=*&^%$#`!/,.',
                },
                minLength: {
                  value: 3,
                  message: 'Can`t be shorter than 3 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'Must not exceed 15 characters',
                },
              })}
              placeholder=" "
            />
            <label>Surname</label>
            <Error>{errors.surname?.message}</Error>
          </div>
        </div>
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
            data-cy="password"
            className={style.password_input}
            type={!!isView ? 'text' : 'password'}
            autoComplete="current-password"
            {...register('password', {
              required: 'Required field',
              pattern: {
                value: /^(?=.*[a-zA-Z0-9])(?!.*[@$!%*?&"=^#`!/,.]).*$/,
                message: 'The password must not consist of @"=*&^%$#`!/,.',
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
        data_cy_name="sign up"
        color="white"
        background="black"
        padding="large"
        borderRadius="50px"
      >
        Sign up
      </Button>
    </form>
  )
}

export default FormSignup
