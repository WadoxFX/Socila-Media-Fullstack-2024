import React, { useState } from 'react'
import style from './button.module.scss'

const Button: React.FC<UIButtonProps> = ({
  data_cy_name,
  children,
  onClick,
  disabled,
  color,
  padding,
  background,
  borderRadius,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = async () => {
    if (!loading && onClick) {
      setLoading(true)
      try {
        await onClick()
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const getPadding = () => {
    switch (padding) {
      case 'cube':
        return '8px'
      case 'medium':
        return '8px 16px'
      case 'large':
        return '12px 24px'
      default:
        return '0'
    }
  }

  const styles = {
    color: color || 'black',
    padding: getPadding(),
    background: background || 'none',
    borderRadius: borderRadius || 0,
  }
  return (
    <button
      style={styles}
      className={style.button}
      data-cy={data_cy_name}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button
