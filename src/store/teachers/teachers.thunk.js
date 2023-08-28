import { createAsyncThunk } from '@reduxjs/toolkit'
import {
   deleteTeacherLMS,
   editTeacherLMS,
   getTeacherLMS,
   postTeacherLMS,
} from '../../api/teachersResponse/teachers'

export const getTeacher = createAsyncThunk(
   'teacher/getTeacher',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await getTeacherLMS()
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data.message)
      }
   }
)

export const postTeacher = createAsyncThunk(
   'teachers/postTeachers',
   async ({ values, showSnackbar }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await postTeacherLMS(values)
         showSnackbar('Данные успешно отправлены', 'success')
         dispatch(getTeacher())
         return data
      } catch (error) {
         if (error.message === 'Request failed with status code 400') {
            showSnackbar(error.response.data.message, error.response.status)
         }
         showSnackbar('Данные не отправлены', error.message)
         return rejectWithValue(error.message)
      }
   }
)

export const deleteTeacherId = createAsyncThunk(
   'deleteTeacher',
   async ({ idInstructor, showSnackbar }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await deleteTeacherLMS(idInstructor)
         dispatch(getTeacher())
         showSnackbar('Удалено', 'success')
         return data
      } catch (error) {
         showSnackbar('Не удалено', error.message)
         return rejectWithValue(error.message)
      }
   }
)
export const putTeacher = createAsyncThunk(
   'teachers/putTeachers',
   async ({ id, values, showSnackbar }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await editTeacherLMS(id, values)
         dispatch(getTeacher())
         showSnackbar('Данные учителя успешно обновлены', 'success')
         return data
      } catch (error) {
         if (error.message === 'Request failed with status code 400') {
            showSnackbar(error.response.data.message, error.response.status)
         }
         return rejectWithValue(error.message)
      }
   }
)
