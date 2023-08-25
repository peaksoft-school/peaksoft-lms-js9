import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getLesson = createAsyncThunk(
   'api/getLessons',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/lessons/1`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const deleteCourse = createAsyncThunk(
   'api/deleteLessons',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/lessons/${payload.id}`
         )
         dispatch(getLesson())
         payload.showSnackbar('успешно удалено', 'success')

         return response.data
      } catch (error) {
         payload.showSnackbar('error', 'error')
         return rejectWithValue(error.message)
      }
   }
)
export const postLessonThunk = createAsyncThunk(
   'api/postLesson',
   async (
      { courseId, lessonName, showSnackbar },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await axiosInstance.post(`/api/lessons/${courseId}`, {
            lessonName,
         })
         showSnackbar('успешно добалено', 'success')
         dispatch(getLesson())
         return response.data
      } catch (error) {
         showSnackbar('error', 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const updateLesson = createAsyncThunk(
   'api/updateLesson',
   async ({ id, lessonName, showSnackbar }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(`/api/lessons/${id}`, {
            lessonName,
         })
         showSnackbar('успешно изменено', 'success')
         dispatch(getLesson())
         return response.data
      } catch (error) {
         showSnackbar('error', 'error')
         return rejectWithValue(error.message)
      }
   }
)
