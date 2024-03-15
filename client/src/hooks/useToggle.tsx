import { useState } from 'react'

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState<any>(initialValue)

  const toggle = (): void => {
    setValue((prev: boolean) => !prev)
  }

  return [value, toggle]
}
