import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getLesson = createAsyncThunk(
   'api/getLessons',
   async (courseId, { rejectWithValue }) => {
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
   async (lessonId, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(`/api/lessons/${lessonId}`)
         dispatch(getLesson())
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const postLessonThunk = createAsyncThunk(
   'api/postLesson',
   async ({ lessonId, lessonName }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(`/api/lessons/${lessonId}`, {
            lessonName,
         })
         dispatch(getLesson())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const updateLesson = createAsyncThunk(
   'api/updateLesson',
   async ({ lessonId, updatedData }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.put(
            `/api/lessons/${lessonId}`,
            updatedData
         )
         dispatch(getLesson())
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
