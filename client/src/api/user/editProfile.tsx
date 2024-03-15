import { customAxios } from '../customAxios'

export const editProfile = async (props: EditProfile) => {
  try {
    const fd = new FormData()
    fd.append('avatar', props.avatar[0])
    fd.append('meId', props.meId)
    fd.append('username', props.username)
    fd.append('surname', props.surname)
    fd.append('email', props.email)
    fd.append('password', props.password)
    fd.append('desc', props.desc)

    await customAxios.put('/user/editProfile', fd)
    window.location.reload()
  } catch (error: any) {
    return console.error('Error:', error.response.data.message)
  }
}
