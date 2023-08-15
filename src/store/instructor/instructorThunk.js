import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getInstructors = createAsyncThunk(
   'instructors/getInstructor',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/courses/getInstructors/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getAllInstructors = createAsyncThunk(
   'instructors/getInstructors',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('api/instructors')
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const assignInstructor = createAsyncThunk(
   'instructors/assignInstructor',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(`api/courses/assign/${id}/2`)
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
