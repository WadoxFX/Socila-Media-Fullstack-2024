'use client'

import React from 'react'
import { useToggle } from '@/hooks/useToggle'
import { createPortal } from 'react-dom'

import style from './modal.module.scss'

const Modal: React.FC<UIModal> = ({ children, module }) => {
  const [isView, toggle] = useToggle(false)
  return (
    <>
      <li data-cy="creating_post" onClick={toggle} className={style.modal_button}>
        {children}
      </li>
      <ModalSchema isView={isView} onClose={toggle} module={module} />
    </>
  )
}

const ModalSchema: React.FC<ModalSchema> = (props) => {
  if (typeof window === undefined) return null
  return (
    !!props.isView &&
    createPortal(
      <div onClick={props.onClose} className={style.overlay}>
        <div onClick={(e) => e.stopPropagation()} className={style.modal}>
          {React.cloneElement(props.module, { onClose: props.onClose })}
        </div>
      </div>,
      document.body
    )
  )
}

export default Modal
