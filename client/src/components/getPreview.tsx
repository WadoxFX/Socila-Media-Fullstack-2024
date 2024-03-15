export const getPreview = (files: FileList) => {
  const previewList: string[] = []

  Array.from(files).map((file: File) => {
    const fr: FileReader = new FileReader()

    fr.onload = (event) => {
      const result: string = event.target?.result as string
      previewList.push(result)
    }
    fr.readAsDataURL(file)
  })

  return previewList
}
