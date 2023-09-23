import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
// eslint-disable-next-line import/no-cycle
import { getCoursesById } from '../courses/coursesThunk'

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
export const getStudents = createAsyncThunk(
   'students/getStudents',
   async ({ id, page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/students/${id}`, {
            params: {
               currentPage: page,
               pageSize: 10,
            },
         })
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteStudent = createAsyncThunk(
   'students/deleteStudent',
   async (
      { id, showSnackbar, courseId, page },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.delete(`/api/students/${id}`)
         dispatch(getStudents({ id: courseId, page }))
         dispatch(getCoursesById(courseId))
         return showSnackbar('Студент успешно удален', 'success')
      } catch (error) {
         showSnackbar(error, 'error')
         return rejectWithValue(error.message)
      }
   }
)
