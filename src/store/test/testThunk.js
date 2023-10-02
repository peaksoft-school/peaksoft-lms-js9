import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import {
   getTaskLesson,
   getTestNameLesson,
} from '../studentLayout/studentLayoutThunk'

export const postTestThunk = createAsyncThunk(
   'test/postTestThunk',
   async ({ data, id, showSnackbar, cancelHandler }, { rejectWithValue }) => {
      try {
         await axiosInstance.post(`/api/tests?lessonId=${id}`, data)
         showSnackbar('Тест успешно добавлен!', 'success')
         return cancelHandler()
      } catch (error) {
         showSnackbar(
            error.response.status === 400
               ? 'Заполните все поля!'
               : error.message,
            'error'
         )
         return rejectWithValue(error.message)
      }
   }
)

export const getTestResultForInstructor = createAsyncThunk(
   'test/getTestResultForInstructor',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/tests/testResult/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const postIsAcceptedThunk = createAsyncThunk(
   'test/postIsAcceptedThunk',
   async ({ data, id, showSnackbar }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(
            `/api/tests/isAccepted/${id}?isAccepted=${data.accept}&text=${data.text}`
         )
         showSnackbar(
            data.accept ? 'Сообщение отправлено!' : 'Тест активен!',
            'success'
         )

         return dispatch(getTestResultForInstructor(id))
      } catch (error) {
         showSnackbar('В этом курсе нет группы!', 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const deleteTestThunk = createAsyncThunk(
   'test/deleteTestThunk',
   async (
      { testid, lessonid, showSnackbar },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.delete(`/api/tests/${testid}`)
         showSnackbar('Тест успешно удален!', 'success')
         return dispatch(getTestNameLesson(lessonid))
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

// taskkkkk

export const deleteTaskThunk = createAsyncThunk(
   'test/deleteTaskThunk',
   async (
      { taskid, lessonid, showSnackbar },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.delete(`/api/tasks/${taskid}`)
         showSnackbar('Задача успешно удален!', 'success')
         return dispatch(getTaskLesson(lessonid))
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const getTestResultPass = createAsyncThunk(
   'test/getTestResultPass',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/tests/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const updateTestThunk = createAsyncThunk(
   'test/updateTestThunk',
   async (
      { testid, data, showSnackbar, cancelHandler },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.put(`/api/tests/${testid}`, data)
         showSnackbar('Тест успешно редактирован!', 'success')
         dispatch(getTestResultPass(testid))
         return cancelHandler()
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
