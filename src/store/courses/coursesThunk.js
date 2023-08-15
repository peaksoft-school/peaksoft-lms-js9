import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { fileAxiosInstanse } from '../../config/fileAxiosInstance'

export const getCardsCourses = createAsyncThunk(
   'courses/getCardsCourses',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/courses')
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const postFile = createAsyncThunk(
   'courses/postFile',
   async (data, { rejectWithValue }) => {
      try {
         const response = await fileAxiosInstanse.post('/api/file', {
            file: data,
         })
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const deleteFile = createAsyncThunk(
   'courses/deleteFile',
   async (image, { rejectWithValue, dispatch }) => {
      try {
         await fileAxiosInstanse.delete(`/api/file`, image)
         return dispatch(getCardsCourses())
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const postCard = createAsyncThunk(
   'courses/postCards',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const getFile = await dispatch(postFile(data.image)).unwrap()
         await axiosInstance.post('/api/courses', {
            ...data,
            image: getFile,
         })
         return dispatch(getCardsCourses())
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const updateCard = createAsyncThunk(
   'courses/putCards',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         const getFile = await dispatch(postFile(data.image)).unwrap()
         await axiosInstance.put(`/api/courses/${data.id}`, {
            ...data,
            image: getFile,
         })
         return dispatch(getCardsCourses())
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteGroup = createAsyncThunk(
   'courses/deleteGroup',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`/api/courses/${id}`)
         return dispatch(getCardsCourses())
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
