import axios from 'axios'

export const customAxios = axios.create({
  baseURL: process.env.serverUrl,
  withCredentials: true,
})
