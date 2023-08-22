import { createAsyncThunk } from '@reduxjs/toolkit'
import {
   deleteTeacherLMS,
   getTeacherLMS,
   postTeacherLMS,
} from '../../api/teachersResponse/teachers'

export const getTeacher = createAsyncThunk(
   'teacher/getTeacher',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await getTeacherLMS()
         // console.log(data)
         return data
      } catch (error) {
         // console.log('No data available')
         return rejectWithValue(error.response?.data.message)
      }
   }
)

export const postTeacher = createAsyncThunk(
   'teachers/postTeachers',
   async (teacherData, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await postTeacherLMS(teacherData)
         console.log(data)
         dispatch(getTeacher())
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteTeacherId = createAsyncThunk(
   'deleteTeacher',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await deleteTeacherLMS(id)
         dispatch(getTeacher())
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
