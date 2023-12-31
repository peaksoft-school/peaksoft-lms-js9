/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { fileAxiosInstanse } from '../../config/fileAxiosInstance'
import { getStudents } from '../students/studentsThunk'

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
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         const getFile = await dispatch(postFile(payload.data.image)).unwrap()
         await axiosInstance.post('/api/courses', {
            ...payload.data,
            image: getFile,
         })
         payload.modal('')
         payload.setValue('groupName', '')
         payload.setValue('description', '')
         payload.showSnackbar('Курс успешно создан!', 'success')
         return dispatch(getCardsCourses())
      } catch (error) {
         switch (error.response?.status) {
            case 409:
               payload.showSnackbar('Все поля должны быть заполнены!', 'error')
               break
            case 400:
               payload.showSnackbar(
                  'С таким названием курс уже существует !',
                  'error'
               )
               break
            default:
               payload.showSnackbar(error, 'error')
         }
         return rejectWithValue(error.message)
      }
   }
)

export const updateCard = createAsyncThunk(
   'courses/putCards',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         const getFile = await dispatch(postFile(payload.data.image))
         await axiosInstance.put(`/api/courses/${payload.data.id}`, {
            ...payload.data,
            image:
               getFile.payload === 'Request failed with status code 403'
                  ? payload.data.image
                  : getFile.payload,
         })
         payload.showSnackbar('Курс успешно редактирован!', 'success')
         payload.setActiveModal2('')
         await dispatch(getCardsCourses())
      } catch (error) {
         payload.showSnackbar(error, 'error')
         rejectWithValue(error.message)
      }
   }
)

export const deleteGroup = createAsyncThunk(
   'courses/deleteGroup',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`/api/courses/${payload.id}`)
         payload.showSnackbar('Курс успешно удален', 'success')
         return dispatch(getCardsCourses())
      } catch (error) {
         payload.showSnackbar(error, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const getByIdInstructor = createAsyncThunk(
   'instructors/getInstructor',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/instructors/getById/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getCoursesById = createAsyncThunk(
   'courses/getCoursesById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/courses/${id}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const addGroupToCourseThunk = createAsyncThunk(
   'courses/addGroupToCourse',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(
            `api/courses/${payload.groupId}/${payload.courseId}`
         )
         payload.showSnackbar('Группа успешно добавлен в курс', 'success')
         dispatch(getByIdInstructor(payload.instructorId))
         dispatch(getStudents({ id: payload.courseId, page: payload.page }))
         dispatch(getCoursesById())
         return dispatch(getCoursesById(payload.courseId))
      } catch (error) {
         payload.showSnackbar(error, 'error')
         return rejectWithValue(error.message)
      }
   }
)
export const deleteGroupToCourseThunk = createAsyncThunk(
   'courses/deleteGroupToCourse',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(
            `/api/courses/${payload.groupId}/${payload.courseId}`
         )
         payload.showSnackbar('Группа успешно удален из курса', 'success')
         dispatch(getByIdInstructor(payload.instructorId))
         dispatch(getStudents({ id: payload.courseId, page: payload.page }))
         return dispatch(getCoursesById(payload.courseId))
      } catch (error) {
         payload.showSnackbar(error, 'error')
         return rejectWithValue(error.message)
      }
   }
)
