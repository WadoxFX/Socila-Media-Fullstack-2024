'use client'

import { customAxios } from '@/api/customAxios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: ReduxUserData = {
  userData: {
    _id: '',
    avatar: '',
    desc: '',
    username: '',
    surname: '',
    email: '',
  },
}

export const fetchUser = createAsyncThunk('user/fetchUser', async function GetUserData() {
  try {
    const response = await customAxios('/auth/account')
    return response.data
  } catch (error) {
    console.error('Error, failed to retrieve data:', error)
    return (window.location.href = '/login')
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userData._id = action.payload._id
      state.userData.avatar = action.payload.avatar
      state.userData.desc = action.payload.desc
      state.userData.username = action.payload.username
      state.userData.surname = action.payload.surname
      state.userData.email = action.payload.email
    })
  },
})

export const {} = userSlice.actions
export default userSlice.reducer
