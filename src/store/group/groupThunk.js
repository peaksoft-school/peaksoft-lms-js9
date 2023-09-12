import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { fileAxiosInstanse } from '../../config/fileAxiosInstance'

export const getCard = createAsyncThunk(
   'cards/getCards',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/groups')
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const postFile = createAsyncThunk(
   'cards/postFile',
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
export const postCard = createAsyncThunk(
   'cards/postCards',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         const getFile = await dispatch(postFile(payload.data.image)).unwrap()
         await axiosInstance.post('/api/groups', {
            ...payload.data,
            image: getFile,
         })
         payload.showSnackbar('Группа успешно создано!', 'success')
         return dispatch(getCard())
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.data.message)
      }
   }
)
export const deleteFile = createAsyncThunk(
   'cards/deleteFile',
   async (image, { rejectWithValue, dispatch }) => {
      try {
         await fileAxiosInstanse.delete(`/api/file`)
         return dispatch(getCard())
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const updateCard = createAsyncThunk(
   'cards/putCards',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         const getFile = await dispatch(postFile(payload.data.image)).unwrap()
         await axiosInstance.put(`/api/groups/${payload.data.id}`, {
            ...payload.data,
            image: getFile,
         })
         payload.showSnackbar('Группа успешно редактировано!', 'success')
         return dispatch(getCard())
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const deleteGroup = createAsyncThunk(
   'cards/deleteGroup',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`/api/groups/${payload.getCardId}`)
         payload.showSnackbar('Группа успешно удалено!', 'success')
         return dispatch(getCard())
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
