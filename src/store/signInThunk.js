import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance'
import { STORAGE_KEY } from '../utils/constants/constants'

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
         return rejectWithValue(error.message)
      }
   }
)
