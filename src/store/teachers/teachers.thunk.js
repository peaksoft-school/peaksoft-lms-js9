import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getTeachers = createAsyncThunk(
   'teacher/getTeacher',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/instructors')
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
         const { data } = await axiosInstance.post('/api/instructors', values)
         showSnackbar('Данные успешно отправлены!', 'success')
         dispatch(getTeachers())
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
         const { data } = await axiosInstance.delete(
            `/api/instructors/${idInstructor}`
         )
         dispatch(getTeachers())
         showSnackbar('Учитель успешно удален', 'success')
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
         const { data } = await axiosInstance.put(
            `/api/instructors/${id}`,
            values
         )
         dispatch(getTeachers())
         showSnackbar('Данные учителя успешно обновлены!', 'success')
         return data
      } catch (error) {
         if (error.message === 'Request failed with status code 400') {
            showSnackbar(error.response.data.message, error.response.status)
         }
         return rejectWithValue(error.message)
      }
   }
)
