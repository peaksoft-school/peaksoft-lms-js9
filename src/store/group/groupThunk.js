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
         payload.showSnackbar('Группа успешно создано!', 'success')
         return dispatch(getCard())
      } catch (error) {
         switch (error.response?.status) {
            case 409:
               payload.showSnackbar('Все поля должны быть заполнены!', 'error')
               break
            case 400:
               payload.showSnackbar(
                  'С таким названием группа уже существует!',
                  'error'
               )
               break
            default:
               payload.showSnackbar(error, 'error')
         }
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
         if (payload.status) {
            const getFile = await dispatch(
               postFile(payload.data.image)
            ).unwrap()
            await axiosInstance.put(`/api/groups/${payload.data.id}`, {
               ...payload.data,
               image: getFile,
            })
         } else {
            await axiosInstance.put(
               `/api/groups/${payload.data.id}`,
               payload.data
            )
         }
         payload.showSnackbar('Группа успешно редактировано!', 'success')
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
         payload.showSnackbar('Группа успешно удалено!', 'success')
         return dispatch(getCard())
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
