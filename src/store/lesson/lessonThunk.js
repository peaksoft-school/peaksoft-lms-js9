import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getLesson = createAsyncThunk(
   'api/getLessons',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/lessons/${id}`)
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
         await axiosInstance.delete(`/api/lessons/${payload.id}`)
         payload.showSnackbar('Урок успешно удален!', 'success')
         return dispatch(getLesson(payload.courseId))
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
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
         await axiosInstance.post(`/api/lessons/${courseId}`, {
            lessonName,
         })
         showSnackbar('Урок успешно добален!', 'success')
         return dispatch(getLesson(courseId))
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const updateLesson = createAsyncThunk(
   'api/updateLesson',
   async (
      { id, lessonName, showSnackbar, courseId },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.put(`/api/lessons/${id}`, {
            lessonName,
         })
         showSnackbar('Урок успешно редактирован!', 'success')
         return dispatch(getLesson(courseId))
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
