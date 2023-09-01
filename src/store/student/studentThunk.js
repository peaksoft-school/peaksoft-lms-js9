import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { axiosFileInstance } from '../../config/axiosInctanceExcelFile'

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
         return response.data.studentResponses
      } catch (error) {
         return rejectWithValue('error')
      }
   }
)
export const postNewStudents = createAsyncThunk(
   'students/postStudent',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`/api/students/${data.groupId}`, data)
         dispatch(getAllStudents({ currentPage: 1, pageSize: 10 }))
         return data
      } catch (error) {
         return rejectWithValue('error')
      }
   }
)
export const PutStudent = createAsyncThunk(
   'students/putStudent',
   async ({ studentId, values }, { dispatch, rejectWithValue }) => {
      try {
         await axiosInstance.put(`/api/students/${studentId}`, values)
         dispatch(getAllStudents({ currentPage: 1, pageSize: 10 }))
         return studentId
      } catch (error) {
         return rejectWithValue('error')
      }
   }
)

export const DeleteStudent = createAsyncThunk(
   'students/deleteStudent',
   async (studentId, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`/api/students/${studentId}`)
         dispatch(getAllStudents({ currentPage: 1, pageSize: 50 }))
         return studentId
      } catch (error) {
         return rejectWithValue('error')
      }
   }
)
export const postExcelFile = createAsyncThunk(
   'students/postExcelFile',
   async ({ formData, id }, { rejectWithValue }) => {
      console.log('post')
      try {
         await axiosFileInstance.post(`/api/students/import`, formData, {
            params: {
               groupId: id,
            },
         })
         console.log('daniel')
         return formData
      } catch (error) {
         return rejectWithValue('error')
      }
   }
)
