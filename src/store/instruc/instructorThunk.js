import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getInstructor = createAsyncThunk(
   'courseIns/getInstructor',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/instructors/getById/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getCourseStudents = createAsyncThunk(
   'courseIns/getCourseStudents',
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
