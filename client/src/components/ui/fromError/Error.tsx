import React from 'react'

import style from './error.module.scss'

const Error: React.FC<ErrorMessage> = ({ children }) => {
  return (
    children && (
      <p data-cy="error" className={style.error}>
        {children}
      </p>
    )
  )
}

export default Error
