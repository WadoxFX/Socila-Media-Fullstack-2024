'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/button/Button'
import Manipulator from './Manipulator'
import { useForm } from 'react-hook-form'
import { addComment } from '@/api/post/addComment'
import { useAppSelector } from '@/store/hooks'

import planeIcon from '/public/svg/send.svg'

import style from '@/components/ui/modal/modules/post.module.scss'

const Controller: React.FC<PropsPostId> = ({ postId }) => {
  const meId: string = useAppSelector((state) => state.user.userData._id)
  const [textAreaHeight, setTextAreaHeight] = useState<number>(20)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<ControllerFormValues>({ defaultValues: { content: '' } })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [formState.isSubmitSuccessful, reset])

  return (
    <div className={style.controller_container}>
      <Manipulator postId={postId} />
      <form
        className={style.controller}
        onSubmit={handleSubmit((data) => addComment({ ...data, postId, meId }))}
      >
        <textarea
          data-cy="write_comment"
          style={{ height: `${watch('content').length ? `${textAreaHeight}px` : '20px'}` }}
          placeholder="Add comment..."
          {...register('content', {
            required: 'Required field',
            pattern: {
              value: /^(?=.*[a-zA-Z0-9@.,?*!\s])(?!.*[{}<>]).*$/,
              message: 'The password must not consist of <>{}()',
            },
            maxLength: { value: 250, message: 'No more than 250 characters' },
          })}
          onChange={(e) => setTextAreaHeight(e.target.scrollHeight)}
        />
        <div className={style.button_container}>
          <Button
            data_cy_name="create_comment"
            background="#efefef"
            padding="cube"
            borderRadius="8px"
          >
            <Image src={planeIcon} width={24} height={24} alt="Send comment" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Controller
