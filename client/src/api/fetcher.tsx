import { customAxios } from './customAxios'

export const fetcher = async (url: string) => await customAxios(url).then((res) => res.data)
