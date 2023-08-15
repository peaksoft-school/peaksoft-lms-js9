import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getLesson = createAsyncThunk(
   'api/lessons',
   async (courseId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`api/lessons/${courseId}`)
         console.log('response:  thunk>>> ', response.data)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const deleteCourse = createAsyncThunk(
   'api/lessons',
   async (courseId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(`api/lessons/${courseId}`)
         console.log('response.data: ', response.data)
         return response.data
      } catch (error) {
         console.log('error.message: ', error.message)
         return rejectWithValue(error.message)
      }
   }
)
