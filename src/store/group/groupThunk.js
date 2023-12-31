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
         payload.modal('')
         payload.setValue('groupName', '')
         payload.setValue('description', '')
         payload.showSnackbar('Группа успешно создан!', 'success')
         return dispatch(getCard())
      } catch (error) {
         payload.showSnackbar(error.response.data.message, 'error')
         return rejectWithValue(error)
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
         const getFile = await dispatch(postFile(payload.data.image))
         await axiosInstance.put(`/api/groups/${payload.data.id}`, {
            ...payload.data,
            image:
               getFile.payload === 'Request failed with status code 403'
                  ? payload.data.image
                  : getFile.payload,
         })
         payload.showSnackbar('Группа успешно редактирован!', 'success')
         payload.setActiveModal2('')
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
         payload.showSnackbar('Группа успешно удален!', 'success')
         return dispatch(getCard())
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
