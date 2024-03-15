'use client'

import React from 'react'
import Button from '@/components/ui/button/Button'
import Error from '@/components/ui/fromError/Error'
import UserSchema from '@/components/friends/UserSchema'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '@/store/hooks'
import { useFriendManipulator } from '@/hooks/useFriendManipulator'

import style from '@/components/friends/friends.module.scss'

const Page: React.FC = () => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FriendFormValue>({
    defaultValues: {
      fullName: '',
    },
  })

  const {
    data: users,
    isLoading,
    state,
    search,
    QSubscribe,
    QUnsubscribe,
    QFriendReq,
    QRecallFriend,
  } = useFriendManipulator('/user/search', watch('fullName'), 30)

  return (
    <>
      <form onSubmit={handleSubmit((data) => data)}>
        <input
          data-cy="search_user"
          placeholder="Full Name..."
          {...register('fullName', {
            required: 'Required field',
            pattern: {
              value: /^(?=.*[a-zA-Z0-9@.,?!\s])(?!.*[\[\]{}()<>]).*$/,
              message: 'The password must not consist of <>{}()',
            },
          })}
        />
        <Button
          data_cy_name="search_user_button"
          onClick={search}
          disabled={!!isLoading}
          padding="medium"
          background="#efefef"
          borderRadius="8px"
        >
          Search
        </Button>
        <Error>{errors.fullName?.message}</Error>
      </form>

      <ul>
        <>
          {state ? (
            <li>{state}</li>
          ) : (
            <>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {users.map((user: User) => {
                    return user._id !== meId ? (
                      <UserSchema
                        user={user}
                        meId={meId}
                        QSubscribe={QSubscribe}
                        QUnsubscribe={QUnsubscribe}
                        QFriendReq={QFriendReq}
                        QRecallFriend={QRecallFriend}
                        key={user._id}
                      />
                    ) : null
                  })}
                </>
              )}
            </>
          )}
          {!!users.length && (
            <li className={style.preloader_button}>
              <Button padding="medium" borderRadius="8px" background="#efefef" onClick={search}>
                Load more
              </Button>
            </li>
          )}
        </>
      </ul>
    </>
  )
}

export default Page
