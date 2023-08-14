import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { STORAGE_KEY } from '../../utils/constants/constants'

export const signInThunk = createAsyncThunk(
   'auth/signIn',
   async (payload, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/auth/signIn`,
            payload.values
         )
         localStorage.setItem(
            STORAGE_KEY.AUTH_KEY,
            JSON.stringify(response.data)
         )
         payload.showSnackbar('Вы успешно зашли!', 'success')
         return response.data
      } catch (error) {
         payload.showSnackbar(`${error.response.data.message}`, 'error')
         return rejectWithValue(error.response.data.message)
      }
   }
)
// forgotPassword

export const forgotPasswordThunk = createAsyncThunk(
   'auth/forgotPassword',
   async (payload, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/auth/sendEmail?emailAddress=${payload.values.email}&link=${payload.values.link}`
         )
         payload.showSnackbar(
            'Вам успешно отправлено ссылка для сброса пароля!',
            'success'
         )
         return response
      } catch (error) {
         payload.showSnackbar(`${error.response.data.message}`, 'error')
         return rejectWithValue(error.response.data)
      }
   }
)

// createPassword

export const createPasswordThunk = createAsyncThunk(
   'auth/createPassword',
   async (payload, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/auth/recover-password/${payload.values.userId}`,
            payload.values
         )
         payload.showSnackbar('Вы успешно изменили пароль!', 'success')
         return response
      } catch (error) {
         payload.showSnackbar(`${error.response.data.message}`, 'error')
         return rejectWithValue(error.response.data)
      }
   }
)

export const logout = () => {
   localStorage.removeItem(STORAGE_KEY.AUTH_KEY)
   return { type: 'auth/logout' }
}
