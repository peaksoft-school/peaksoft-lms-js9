import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { postFile } from '../group/groupThunk'

export const getCardsStudentLayout = createAsyncThunk(
   'studentLayout/getCardsStudentLayout',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/students/getById/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getVideoLesson = createAsyncThunk(
   'studentLayout/getVideoLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/videos/${id}/lesson`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getTaskLesson = createAsyncThunk(
   'studentLayout/getTaskLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/tasks/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
// task
export const getGetByIdTaskLesson = createAsyncThunk(
   'studentLayout/getGetByIdTaskLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/tasks/getById/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
// task get result
export const getGetResultTaskLesson = createAsyncThunk(
   'studentLayout/getGetResultTaskLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/taskAnswers/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
// post task
export const postTaskLesson = createAsyncThunk(
   'studentLayout/postTaskLesson',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         let response
         if (payload?.data?.file === '') {
            response = await axiosInstance.post(
               `/api/taskAnswers/save/${payload.taskId}?studentId=${payload.studentId}`,
               payload.data
            )
         } else {
            const getFile = await dispatch(postFile(payload.data.file)).unwrap()
            response = await axiosInstance.post(
               `/api/taskAnswers/save/${payload.taskId}?studentId=${payload.studentId}`,
               { ...payload.data, file: getFile }
            )
         }
         payload.showSnackbar('Ваше домашнее задание принято!', 'success')
         dispatch(getGetResultTaskLesson(payload.taskId))
         return response.data
      } catch (error) {
         payload.showSnackbar(
            error.response.data.message
               ? 'Вы отправляете домашнее задание после дедлайна!'
               : error.response.data.message,
            'error'
         )
         return rejectWithValue(error.message)
      }
   }
)

export const getLinkLesson = createAsyncThunk(
   'studentLayout/getLinkLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/links/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getTestNameLesson = createAsyncThunk(
   'studentLayout/getTestNameLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/tests/getAllTests/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getPresentationLesson = createAsyncThunk(
   'studentLayout/getPresentationLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/presentations/getAll/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
// test
export const getTestLesson = createAsyncThunk(
   'studentLayout/getTestLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/tests/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getTestResultLesson = createAsyncThunk(
   'studentLayout/getTestResultLesson',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/tests/getResultTest/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const postTestLesson = createAsyncThunk(
   'studentLayout/postTestLesson',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(
            `/api/tests/saveResultTest/${payload.id}`,
            {
               questionsId: payload.data,
            }
         )
         dispatch(getTestLesson(payload.id))
         dispatch(getTestResultLesson(payload.id))
         payload.showSnackbar('Ваши ответы приняты!', 'success')
         return response.data
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
