import { customAxios } from '../customAxios'

export const logout = async () => {
  await customAxios.post('/auth/logout')
  return window.location.reload()
}
