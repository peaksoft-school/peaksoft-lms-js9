/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { fileAxiosInstanse } from '../../config/fileAxiosInstance'

export const getAllStudents = createAsyncThunk(
   'students/getAllStudents',
   async ({ currentPage, pageSize }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            '/api/students/getAllStudent',
            {
               params: {
                  currentPage,
                  pageSize,
               },
            }
         )
         return response.data
      } catch (error) {
         return rejectWithValue('error')
      }
   }
)
export const postNewStudents = createAsyncThunk(
   'students/postStudent',
   async ({ page, data, showSnackbar }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`/api/students/${data.groupId}`, data)
         dispatch(getAllStudents({ currentPage: page, pageSize: 10 }))
         showSnackbar('Студент успешно добавлен!', 'success')
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue('error')
      }
   }
)
export const PutStudent = createAsyncThunk(
   'students/putStudent',
   async (
      { studentId, values, showSnackbar },
      { dispatch, rejectWithValue }
   ) => {
      try {
         await axiosInstance.put(`/api/students/${studentId}`, values)
         dispatch(getAllStudents({ currentPage: 1, pageSize: 10 }))
         showSnackbar('Студент успешно изменен!', 'success')
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue('error')
      }
   }
)

export const DeleteStudent = createAsyncThunk(
   'students/deleteStudent',
   async ({ studentId, showSnackbar }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`/api/students/${studentId}`)
         dispatch(getAllStudents({ currentPage: 1, pageSize: 10 }))
         showSnackbar('Студент успешно удален!', 'success')
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue('error')
      }
   }
)
export const postExcelFile = createAsyncThunk(
   'students/postExcelFile',
   async (
      { formData, id, showSnackbar, setExcelFile },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await fileAxiosInstanse.post(`/api/students/import`, formData, {
            params: {
               groupId: id,
            },
         })
         setExcelFile('')
         showSnackbar('Файл успешно отправлен!', 'success')
         dispatch(getAllStudents({ currentPage: 1, pageSize: 10 }))
      } catch (error) {
         showSnackbar(error.response.data.message, 'error')
         return rejectWithValue('error')
      }
   }
)
