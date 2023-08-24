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
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`api/courses/assign/${payload.courseId}`, {
            instructorsId: payload.instructorsId,
         })
         payload.showSnackbar('Учители учпешно добавлены в курс!', 'success')
         return dispatch(getInstructors(payload.courseId))
      } catch (error) {
         payload.showSnackbar(error.response.data.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const deleteTeacherCourse = createAsyncThunk(
   'instructors/deleteTeacherCourse',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(
            `api/courses/instructor/${payload.courseId}/${payload.instructorId}`
         )
         payload.showSnackbar('Учитель учпешно удален с курса!', 'success')
         return dispatch(getInstructors(payload.courseId))
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const deleteAllTeacherCourse = createAsyncThunk(
   'instructors/deleteAllTeacherCourse',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`api/courses/instructors/${payload.id}`)
         payload.showSnackbar('Учители учпешно удалены с курса!', 'success')
         return dispatch(getInstructors(payload.id))
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)