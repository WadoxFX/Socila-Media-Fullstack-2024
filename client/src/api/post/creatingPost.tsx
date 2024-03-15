import { customAxios } from '../customAxios'

export const creatingPost = async (props: CreatingPostProps) => {
  try {
    const fd = new FormData()

    fd.append('id', props.id)
    fd.append('content', props.content)

    for (let i = 0; props.files.length > i; i++) {
      fd.append('file', props.files[i])
    }

    props.setIsLoading(true)
    await customAxios.post('/post/create', fd)
    props.setIsLoading(false)
    props.onClose()
  } catch (error: any) {
    return console.error('Error: ', error.response.data.message)
  }
}
