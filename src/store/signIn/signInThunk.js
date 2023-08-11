import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { STORAGE_KEY } from '../../utils/constants/constants'

export const signInThunk = createAsyncThunk(
   'auth/signIn',
   async (values, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(`/auth/signIn`, values)
         console.log(response.data)
         localStorage.setItem(
            STORAGE_KEY.AUTH_KEY,
            JSON.stringify(response.data)
         )
         return response.data
      } catch (error) {
         console.log(error.response.data.message)
         return rejectWithValue(error.response.data.message)
      }
   }
)
// forgotPassword

export const forgotPasswordThunk = createAsyncThunk(
   'auth/forgotPassword',
   async (values, { rejectWithValue }) => {
      console.log('values:', values)
      try {
         const response = await axiosInstance.post(
            `/auth/sendEmail?emailAddress=${values.email}&link=${values.link}`
         )
         console.log('response:', response)
         return response
      } catch (error) {
         console.log(error.response.data)
         return rejectWithValue(error.response.data)
      }
   }
)

// createPassword

export const createPasswordThunk = createAsyncThunk(
   'auth/createPassword',
   async (values, { rejectWithValue }) => {
      console.log('values:', values)
      try {
         const response = await axiosInstance.post(
            `/auth/recover-password/${values.userId}`,
            values
         )
         console.log('response:', response)
         return response
      } catch (error) {
         console.log(error.response.data)
         return rejectWithValue(error.response.data)
      }
   }
)

export const logout = () => {
   localStorage.removeItem(STORAGE_KEY.AUTH_KEY)
   return { type: 'auth/logout' }
}
