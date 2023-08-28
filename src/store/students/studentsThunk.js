import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getGroupUsers = createAsyncThunk(
   'students/getGroupUsers',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/groups/getStudents/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getCourseStudents = createAsyncThunk(
   'students/getCourseStudents',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/courses/getStudents/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
