import { useEffect, useState } from 'react'

export const usePreview = (files: FileList, allowedTypes?: string[]) => {
  const [preview, setPreview] = useState<Preview[]>([])
  const [fileList, setFileList] = useState<File[]>([])

  const clean = (): void => {
    setPreview([])
    setFileList([])
  }

  useEffect(() => {
    if (files) {
      Array.from(files).map((file: File) => {
        if (!allowedTypes || allowedTypes.includes(file.type)) {
          setFileList((fileList: File[]) => [...fileList, file])

          const fr = new FileReader()

          fr.onload = (event) => {
            const result: string = event.target?.result as string
            setPreview((preview: Preview[]) => [...preview, { path: result, type: file.type }])
          }
          fr.readAsDataURL(file)
        }
        return
      })
    }
  }, [files])

  return { preview, fileList, clean }
}
